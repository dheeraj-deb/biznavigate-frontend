/**
 * Resort pages on the owner's own address (www.myresort.com), served by this
 * same app (docs/site-brand-custom-domain-plan.md in the backend repo, §4d).
 *
 * On a custom host the address bar shows /book, while the app's routes are
 * /resorts/{slug}/book: src/middleware.ts rewrites one to the other, and the
 * helpers here drop the /resorts/{slug} prefix from links built on the client.
 * Pages stay cached per /resorts/{slug} path, so the server-rendered HTML is
 * the same on every host; links switch after hydration (useCustomHost).
 *
 * No imports: `npm test` loads this file directly.
 */

/** Hosts that are ours, where pages keep their /resorts/{slug} paths. */
const PLATFORM_SUFFIXES = ["biznavigo.com", "workers.dev", "vercel.app", "localhost"];

/** "www.MyResort.com:443" → "www.myresort.com". Empty for nothing usable. */
export function hostOnly(host: string | null | undefined): string {
  return (host ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

/** Ours (or unknown, which is treated as ours): no custom-domain handling. */
export function isPlatformHost(host: string | null | undefined): boolean {
  const h = hostOnly(host);
  if (!h || h === "127.0.0.1" || h === "[::1]") return true;
  return PLATFORM_SUFFIXES.some((s) => h === s || h.endsWith(`.${s}`));
}

const RESORT_PREFIX = /^\/resorts\/(?!intent(?:[/?#]|$))[^/?#]+/;

/**
 * "/resorts/mistvale/book?x=1" → "/book?x=1"; "/resorts/mistvale" → "/".
 * Other paths are returned unchanged.
 */
export function stripResortPrefix(path: string): string {
  const match = RESORT_PREFIX.exec(path);
  if (!match) return path;
  const rest = path.slice(match[0].length);
  if (!rest) return "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/** True in the browser on an owner's domain. Always false on the server. */
export function onCustomHost(): boolean {
  return typeof window !== "undefined" && !isPlatformHost(window.location.host);
}

/**
 * A resort path for navigating right now (router.push, location.href). Not
 * for rendered links: those must match the server's HTML on the first render,
 * so they go through useBookingFlowHref, which switches after hydration.
 */
export function resortPath(path: string): string {
  return onCustomHost() ? stripResortPrefix(path) : path;
}

/** BizNavigo's own pages (the footer links to them): they live on www only. */
const PLATFORM_ONLY_PAGES = ["/privacy-policy", "/terms", "/data-deletion", "/pricing"];

export type CustomHostRoute =
  /** Serve this path of the resort: the address bar keeps the short path. */
  | { kind: "rewrite"; pathname: string }
  /** Already a /resorts/{slug} path of this resort (an old link): serve as is. */
  | { kind: "next" }
  /** Another resort, the listing, or BizNavigo's own pages: those live on www. */
  | { kind: "redirect-platform" };

/** What the middleware does with a path on a custom host that serves `slug`. */
export function routeOnCustomHost(pathname: string, slug: string): CustomHostRoute {
  const own = `/resorts/${slug}`;
  if (pathname === own || pathname.startsWith(`${own}/`)) return { kind: "next" };
  if (pathname === "/resorts" || pathname.startsWith("/resorts/")) {
    return { kind: "redirect-platform" };
  }
  if (PLATFORM_ONLY_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return { kind: "redirect-platform" };
  }
  return { kind: "rewrite", pathname: pathname === "/" ? own : `${own}${pathname}` };
}

/**
 * The address search engines should treat as the page: the owner's domain
 * once it is live, else www.biznavigo.com/resorts/{slug}. `path` is the
 * resort-relative part ("" for the resort's home).
 */
export function canonicalResortUrl(
  property: { slug: string; customDomain?: string | null },
  path = "",
): string {
  if (property.customDomain) return `https://${property.customDomain}${path || "/"}`;
  return `/resorts/${property.slug}${path}`;
}
