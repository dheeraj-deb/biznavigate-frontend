import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

// Caching per https://opennext.js.org/cloudflare/caching:
// - Workers KV holds the cached resort pages (`revalidate = 300` ISR). OpenNext
//   recommends R2, but R2 needs a payment method on the account; KV does not.
//   KV is eventually consistent, so a regenerated page can take up to ~60 s to
//   reach every region. Moving to R2 later is a swap of this one import plus
//   the binding in wrangler.jsonc.
// - a Durable Object queue regenerates a stale page in the background,
// - D1 records `revalidatePath` calls (src/lib/revalidate-resort.ts) so a new
//   review shows up on the next view instead of after the 5 minute window.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
  tagCache: d1NextTagCache,
  // Serve cached ISR pages before the Next.js server loads. Measured on the
  // Workers Free plan (10 ms CPU per request); see docs/cloudflare-cutover.md.
  // Not compatible with PPR, which this app does not use.
  enableCacheInterception: true,
});
