import { NextResponse, type NextRequest } from "next/server";
import { hostOnly, isPlatformHost, routeOnCustomHost } from "@/lib/custom-host";

/**
 * Custom domains: a request for www.myresort.com/book is answered with
 * /resorts/{slug}/book (lib/custom-host.ts). Cloudflare for SaaS sends the
 * owner's hostname in Host, unchanged; on our own hosts this does nothing.
 *
 * Host → slug comes from the API (GET /public/domains/resolve), which only
 * answers for domains Cloudflare has verified. Answers are kept per isolate
 * for a minute so a page view's many requests cost one lookup.
 */

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";
const PLATFORM_BASE = process.env.NEXT_PUBLIC_PUBLIC_BASE_URL ?? "https://www.biznavigo.com";
const FOUND_TTL_MS = 60_000;
const MISSING_TTL_MS = 30_000;
const resolved = new Map<string, { slug: string | null; until: number }>();

async function slugFor(host: string): Promise<string | null | "error"> {
  const hit = resolved.get(host);
  if (hit && hit.until > Date.now()) return hit.slug;
  try {
    const res = await fetch(`${API}/public/domains/resolve?host=${encodeURIComponent(host)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });
    if (res.status === 404) {
      remember(host, null, MISSING_TTL_MS);
      return null;
    }
    if (!res.ok) return "error";
    const body = (await res.json()) as { slug?: unknown };
    const slug = typeof body.slug === "string" && body.slug ? body.slug : null;
    remember(host, slug, slug ? FOUND_TTL_MS : MISSING_TTL_MS);
    return slug;
  } catch {
    return "error";
  }
}

function remember(host: string, slug: string | null, ttl: number) {
  if (resolved.size > 1_000) resolved.clear();
  resolved.set(host, { slug, until: Date.now() + ttl });
}

function plain(status: number, text: string) {
  return new NextResponse(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function middleware(request: NextRequest) {
  const host = hostOnly(request.headers.get("host"));
  if (isPlatformHost(host)) return NextResponse.next();

  const slug = await slugFor(host);
  if (slug === "error") return plain(503, "This page is temporarily unavailable. Please try again in a minute.");
  if (!slug) return plain(404, "This web address is not connected to a BizNavigo page.");

  const route = routeOnCustomHost(request.nextUrl.pathname, slug);
  if (route.kind === "next") return NextResponse.next();
  if (route.kind === "redirect-platform") {
    return NextResponse.redirect(new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, PLATFORM_BASE), 307);
  }
  const url = request.nextUrl.clone();
  url.pathname = route.pathname;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not Next's own files, and not files with an extension (the
  // public/ folder, icons). Those are the same on every host.
  matcher: ["/((?!_next/|api/|.*\\.[A-Za-z0-9]+$).*)"],
};
