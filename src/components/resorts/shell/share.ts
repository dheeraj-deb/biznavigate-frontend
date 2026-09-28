"use client";

/** The system share sheet where there is one; the clipboard where not. */
export async function shareResort(slug: string, name: string): Promise<void> {
  const url = `${window.location.origin}/resorts/${slug}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: name, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  } catch {
    // Share sheet dismissed, or no clipboard — nothing to report.
  }
}
