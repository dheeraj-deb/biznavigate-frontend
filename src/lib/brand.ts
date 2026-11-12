/**
 * A resort's web identity (Property.brand on the API, set on the dashboard's
 * Brand screen): accent colour, logos, favicon, and the page's title and
 * description. Every field is optional — an empty brand renders the page in
 * BizNavigo's default look, exactly as before brands existed.
 */
export type PublicBrand = {
  /** "#rrggbb" */
  color?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type Rgb = [number, number, number];

function parseHex(hex: string | undefined): Rgb | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

/** WCAG relative luminance. */
function luminance([r, g, b]: Rgb): number {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio against white, 1–21. */
function contrastOnWhite(rgb: Rgb): number {
  return 1.05 / (luminance(rgb) + 0.05);
}

/** Move a colour toward black (amount < 0) or white (amount > 0), 0–1. */
function mix(rgb: Rgb, amount: number): Rgb {
  const target = amount < 0 ? 0 : 255;
  const t = Math.abs(amount);
  return rgb.map((v) => v + (target - v) * t) as Rgb;
}

/**
 * The page's accent colours from the owner's colour.
 *
 * Buttons put white text on the accent, so a light brand colour (a pale
 * yellow, say) is darkened until white text on it is readable (WCAG AA,
 * 4.5:1) — the owner's hue, at a shade a guest can read. Returns null when
 * there is no usable colour, and the page keeps its default blue.
 */
export function brandAccent(color: string | undefined) {
  let rgb = parseHex(color);
  if (!rgb) return null;
  for (let i = 0; i < 20 && contrastOnWhite(rgb) < 4.5; i++) rgb = mix(rgb, -0.08);
  return {
    accent: toHex(rgb),
    hover: toHex(mix(rgb, -0.12)),
    soft: toHex(mix(rgb, 0.9)),
    tint: toHex(mix(rgb, 0.94)),
  };
}

/**
 * CSS that points the page's accent tokens (smartpages/tokens.ts `sp.blue`
 * and friends) at the brand colour. Set on :root rather than a wrapper so
 * drawers and dialogs, which MUI renders outside the page tree, match too.
 * Only built from parsed hex values, so nothing the owner typed reaches the
 * stylesheet as text.
 */
export function brandRootCss(color: string | undefined): string | null {
  const a = brandAccent(color);
  if (!a) return null;
  return `:root{--sp-accent:${a.accent};--sp-accent-hover:${a.hover};--sp-accent-soft:${a.soft};--sp-accent-tint:${a.tint}}`;
}
