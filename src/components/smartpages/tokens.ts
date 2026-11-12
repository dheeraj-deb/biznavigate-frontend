// Shared visual tokens for SmartPage components — kept close to the original
// Next.js public-page design so resort pages look consistent across surfaces.
export const sp = {
  ink: "#10213f",
  body: "#4a5568",
  muted: "#718096",
  faint: "#a0b4d0",
  // The accent. CSS variables so a resort's brand colour (lib/brand.ts,
  // set on :root by the [slug] layout) recolours every page; the fallbacks
  // are BizNavigo's default blue.
  blue: "var(--sp-accent, #1f57d6)",
  blueHover: "var(--sp-accent-hover, #1a4ab8)",
  blueBgSoft: "var(--sp-accent-soft, #edf3ff)",
  blueBgTint: "var(--sp-accent-tint, #f0f5ff)",
  border: "#e8eef7",
  borderSoft: "#dfe7f3",
  divider: "#edf1f7",
  bgSoft: "#f8fafd",
  chipBg: "#f3f6fb",
  chipText: "#60738f",
  whatsapp: "#25D366",
  whatsappDark: "#1ebe59",
  whatsappText: "#1a9e4e",
  star: "#c98a0c",
  starEmpty: "#d8dfec",
  cardShadow: "0 4px 16px rgba(31,61,115,0.06)",
  cardShadowHover: "0 8px 28px rgba(31,61,115,0.12)",
  radius: "16px",
  radiusSm: "12px",
} as const;

export function formatINR(n: number): string {
  return n.toLocaleString("en-IN");
}
