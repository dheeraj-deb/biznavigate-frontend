// Custom domains: an owner's www.myresort.com serving their resort page.
// Run with `npm test`. Pins what the middleware does with each path and how
// links drop the /resorts/{slug} prefix on the owner's domain.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  canonicalResortUrl,
  hostOnly,
  isPlatformHost,
  routeOnCustomHost,
  stripResortPrefix,
} from "../src/lib/custom-host.ts";

test("our own hosts are left alone", () => {
  for (const host of [
    "www.biznavigo.com",
    "biznavigo.com",
    "staging.biznavigo.com",
    "biznavigo-site-staging.biznavigate.workers.dev",
    "localhost:3000",
    "127.0.0.1:8787",
    "biznavigate-frontend.vercel.app",
    "",
    null,
  ]) {
    assert.equal(isPlatformHost(host), true, String(host));
  }
});

test("an owner's domain is a custom host, whatever its case or port", () => {
  assert.equal(isPlatformHost("www.myresort.com"), false);
  assert.equal(isPlatformHost("WWW.MyResort.co.in:443"), false);
  assert.equal(isPlatformHost("biznavigo.com.evil.example"), false);
  assert.equal(hostOnly("WWW.MyResort.com:443"), "www.myresort.com");
});

test("short paths on a custom host are rewritten into the resort", () => {
  assert.deepEqual(routeOnCustomHost("/", "mistvale"), { kind: "rewrite", pathname: "/resorts/mistvale" });
  assert.deepEqual(routeOnCustomHost("/book", "mistvale"), { kind: "rewrite", pathname: "/resorts/mistvale/book" });
  assert.deepEqual(routeOnCustomHost("/rooms/rt_1", "mistvale"), {
    kind: "rewrite",
    pathname: "/resorts/mistvale/rooms/rt_1",
  });
});

test("old /resorts/{slug} links still work on the custom host", () => {
  assert.deepEqual(routeOnCustomHost("/resorts/mistvale", "mistvale"), { kind: "next" });
  assert.deepEqual(routeOnCustomHost("/resorts/mistvale/book", "mistvale"), { kind: "next" });
});

test("other resorts and the listing go back to www", () => {
  assert.deepEqual(routeOnCustomHost("/resorts", "mistvale"), { kind: "redirect-platform" });
  assert.deepEqual(routeOnCustomHost("/resorts/other", "mistvale"), { kind: "redirect-platform" });
  assert.deepEqual(routeOnCustomHost("/resorts/mistvale-two", "mistvale"), { kind: "redirect-platform" });
  assert.deepEqual(routeOnCustomHost("/privacy-policy", "mistvale"), { kind: "redirect-platform" });
  assert.deepEqual(routeOnCustomHost("/terms", "mistvale"), { kind: "redirect-platform" });
  assert.deepEqual(routeOnCustomHost("/termsandmore", "mistvale"), {
    kind: "rewrite",
    pathname: "/resorts/mistvale/termsandmore",
  });
});

test("links drop the resort prefix, keeping query and hash", () => {
  assert.equal(stripResortPrefix("/resorts/mistvale"), "/");
  assert.equal(stripResortPrefix("/resorts/mistvale/book?s=t1&adults=2"), "/book?s=t1&adults=2");
  assert.equal(stripResortPrefix("/resorts/mistvale?s=t1"), "/?s=t1");
  assert.equal(stripResortPrefix("/resorts/mistvale#things-to-know"), "/#things-to-know");
  assert.equal(stripResortPrefix("/resorts/intent/kerala-treehouse"), "/resorts/intent/kerala-treehouse");
  assert.equal(stripResortPrefix("/privacy"), "/privacy");
});

test("canonical is the owner's domain once live, else the www path", () => {
  assert.equal(canonicalResortUrl({ slug: "mistvale", customDomain: "www.mistvale.in" }), "https://www.mistvale.in/");
  assert.equal(canonicalResortUrl({ slug: "mistvale", customDomain: null }), "/resorts/mistvale");
  assert.equal(canonicalResortUrl({ slug: "mistvale" }), "/resorts/mistvale");
});
