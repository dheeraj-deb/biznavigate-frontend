import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Every host the API can hand back in a photo URL. Anything not listed
    // here is rejected by the optimizer and renders as a broken image, so this
    // list has to track the backend's seed and upload sources: R2 for owner
    // uploads, Unsplash for seeded room photos, YouTube for video posters.
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    // AVIF first, WebP for browsers without it. Owner uploads are full-size
    // originals — a 1024x1024 PNG hero weighed ~1.9MB before this.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

// Lets `next dev` reach the Cloudflare bindings in wrangler.jsonc (R2, D1,
// Images) the same way the deployed Worker does.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// Dev only: during `next build` (here and on Vercel until cutover) it would
// start a local workerd for nothing, since no build step reads a binding.
if (process.env.NODE_ENV === "development") {
  void initOpenNextCloudflareForDev();
}
