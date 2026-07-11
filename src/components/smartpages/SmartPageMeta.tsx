import React from "react";

type Props = {
  title: string;
  description?: string;
  images?: string[];
  canonicalPath?: string;
};

function baseUrl(): string {
  return process.env.REACT_APP_PUBLIC_BASE_URL ?? window.location.origin;
}

/**
 * Per-page document metadata. React 19 hoists <title>, <meta> and <link>
 * rendered anywhere in the tree into <head>, so no helmet library is needed.
 *
 * Known limitation of a client-rendered app: social/WhatsApp link-preview
 * bots don't execute JS, so they only ever see the generic OG tags in
 * public/index.html. These per-page tags benefit Googlebot (which renders
 * JS) and the browser tab. Per-resort OG previews would need server-side
 * injection (e.g. an edge worker on /resorts/*) — documented follow-up.
 */
export function SmartPageMeta({ title, description, images, canonicalPath }: Props) {
  const canonical = canonicalPath ? `${baseUrl()}${canonicalPath}` : undefined;
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      {(images ?? []).slice(0, 3).map((img) => (
        <meta key={img} property="og:image" content={img} />
      ))}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
}
