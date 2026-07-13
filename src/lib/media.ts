export type MediaKind = "image" | "mp4" | "youtube" | "instagram" | "tiktok";

export type ClassifiedMedia = {
  kind: MediaKind;
  url: string;
  embedUrl?: string;
  thumbnail?: string;
};

function youtubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

/**
 * Classifies a media URL so a single <VideoEmbed> can render whatever an
 * owner pastes in — an R2-hosted mp4 or a link to an existing YouTube/
 * Instagram/TikTok post — without a dedicated upload pipeline for each.
 */
export function classifyMedia(url: string): ClassifiedMedia {
  const yt = youtubeId(url);
  if (yt) {
    return {
      kind: "youtube",
      url,
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    };
  }
  if (/instagram\.com\/(reel|p)\//.test(url)) {
    const clean = url.split("?")[0].replace(/\/$/, "");
    return { kind: "instagram", url, embedUrl: `${clean}/embed` };
  }
  if (/tiktok\.com\//.test(url)) {
    return { kind: "tiktok", url };
  }
  if (/\.(mp4|webm)(\?.*)?$/i.test(url)) {
    return { kind: "mp4", url };
  }
  return { kind: "image", url };
}

export function isVideoUrl(url: string): boolean {
  return classifyMedia(url).kind !== "image";
}

/**
 * The AI motion clip for a photo, if one is published. Clips are keyed by the
 * exact photo URL string (same join the moments layer uses); roomTypeId
 * scopes room-photo clips apart from property-gallery ones.
 */
export function clipForPhoto(
  motion: import("./publicApi").PropertyMotionMedia | undefined,
  photoUrl: string,
  roomTypeId: string | null = null,
): string | undefined {
  return motion?.clips.find(
    (c) => c.photoUrl === photoUrl && (c.roomTypeId ?? null) === roomTypeId,
  )?.clipUrl;
}
