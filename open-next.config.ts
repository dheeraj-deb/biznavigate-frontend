import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

// Caching per https://opennext.js.org/cloudflare/caching ("small site"):
// - R2 holds the cached resort pages (`revalidate = 300` ISR). R2 is strongly
//   consistent, so a rebuilt page is what the next guest anywhere gets. The
//   buckets live in APAC, next to the owner-photo bucket and most guests.
// - a Durable Object queue regenerates a stale page in the background,
// - D1 records `revalidatePath` calls (src/lib/revalidate-resort.ts) so a new
//   review shows up on the next view instead of after the 5 minute window.
// No regional cache: OpenNext notes it gains little on Next 16 unless the tag
// cache is bypassed, and that breaks revalidatePath without cache purging.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  tagCache: d1NextTagCache,
  // Serve cached ISR pages before the Next.js server loads. Measured on the
  // Workers Free plan (10 ms CPU per request); see docs/cloudflare-cutover.md.
  // Not compatible with PPR, which this app does not use.
  enableCacheInterception: true,
});
