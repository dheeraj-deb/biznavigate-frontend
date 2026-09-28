"use server";

import { revalidatePath } from "next/cache";

const SLUG = /^[a-z0-9-]{1,120}$/;

/**
 * Drops the cached resort pages (the page, its layout and nested routes like
 * /rooms and /book) after a guest changes what they show — today, posting a
 * review. Without it a new review waits out the CATALOGUE_TTL (5 min), and
 * the guest who just wrote one reloads to find it missing.
 *
 * Callable by any visitor, so it only ever purges one resort's own pages and
 * refuses anything that isn't a slug; the worst a caller can do is make the
 * next view of that page fetch fresh data.
 */
export async function revalidateResort(slug: string): Promise<void> {
  if (!SLUG.test(slug)) return;
  revalidatePath(`/resorts/${slug}`, "layout");
}
