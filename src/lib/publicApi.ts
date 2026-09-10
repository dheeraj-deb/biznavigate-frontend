const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";

export const API_BASE = BASE;

/** How long cached catalogue responses stay fresh, in seconds. Matches the
 *  `revalidate` on the routes that render them. */
export const CATALOGUE_TTL = 300;

/**
 * Next 16 does not cache `fetch` by default — every server render would hit
 * the API again. Catalogue data (properties, rooms, intent pages) changes
 * rarely, so it is cached and revalidated on a timer; live data (availability)
 * passes `revalidate: 0` to opt out.
 */
async function publicFetch<T>(path: string, revalidate = CATALOGUE_TTL): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export type PublicProperty = {
  id: string;
  slug: string;
  name: string;
  propertyType: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  websiteUrl: string | null;
  amenities: string[];
  highlights: string[];
  photos: string[];
  videos?: string[];
  checkInTime: string | null;
  checkOutTime: string | null;
  cancellationPolicy: string | null;
  houseRules: string | null;
  isActive: boolean;
  isPublicListing: boolean;
  updatedAt: string;
};

export type PublicRoomType = {
  id: string;
  name: string;
  description: string | null;
  capacityAdults: number;
  capacityChildren: number;
  totalRooms: number;
  minimumPrice: number;
  basePrice: number;
  maximumPrice: number;
  amenities: string[];
  photos: string[];
  videos?: string[];
  isActive: boolean;
};

export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ResortListItem = PublicProperty & {
  minimumPrice: number;
};

export type PublicReview = {
  id: string;
  guestName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

export type PageMoment = {
  id: string;
  type: "PIN" | "HIGHLIGHT";
  photoUrl: string | null;
  xPct: number | null;
  yPct: number | null;
  label: string;
  description: string | null;
  mediaUrl: string | null;
  ctaText: string | null;
  roomTypeId: string | null;
  sortOrder: number;
};

// AI-generated motion media: per-photo clips (camera motion over the original
// photo), one stitched highlight reel, and per-room tours. Only READY assets
// are published; older cached payloads simply omit the field.
export type PropertyMotionMedia = {
  reelUrl: string | null;
  clips: { photoUrl: string; clipUrl: string; effect: string; roomTypeId: string | null }[];
  tours: { roomTypeId: string; tourUrl: string }[];
};

export type PropertyAddon = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  priceUnit: "PER_STAY" | "PER_NIGHT" | "PER_GUEST";
  maxQuantity: number;
};

export type ResortDetail = PublicProperty & {
  roomTypes: PublicRoomType[];
  faqs: PublicFaq[];
  addons: PropertyAddon[];
  todayRate: number;
  reviews: PublicReview[];
  averageRating: number;
  reviewCount: number;
  moments?: PageMoment[];
  motion?: PropertyMotionMedia;
  tenant: { gupshupSourceNumber: string | null };
};

export type AvailabilityResult = {
  roomTypeId: string;
  name: string;
  available: boolean;
  availableRooms: number;
  nights: number;
  totalPrice: number;
  pricePerNight: number;
  /** Present only when an owner-approved rate replaced the standard one —
   *  the standard total, to strike through beside the approved price. */
  standardTotalPrice?: number;
  approvedRate?: boolean;
};

export type IntentPageData = {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  occasion: string | null;
  feature: string | null;
  location: string;
  property: ResortDetail & { directions: string | null };
};

export async function getResorts(): Promise<ResortListItem[]> {
  return publicFetch<ResortListItem[]>("/public/resorts");
}

/**
 * Every published slug, for `generateStaticParams`. Failing here would abort
 * the build, so an unreachable API degrades to "prerender nothing" — the
 * routes still render on demand and ISR-cache from the first hit.
 */
export async function getResortSlugs(): Promise<string[]> {
  try {
    return (await getResorts()).map((r) => r.slug);
  } catch {
    return [];
  }
}

export async function getResort(slug: string): Promise<ResortDetail> {
  return publicFetch<ResortDetail>(`/public/resorts/${slug}`);
}

/** Newest-first index of published occasion pages. */
export type IntentSlug = { slug: string; updatedAt: string };

/**
 * Slugs to prerender occasion pages from.
 *
 * Capped rather than unbounded: these pages are generated per property per
 * occasion, so the set grows with the catalogue, and prerendering all of them
 * would stretch the build for pages nobody has asked for yet. The newest are
 * built ahead; anything past the cap still works, rendered on first visit and
 * cached from then on. Failing here would abort the build, so an unreachable
 * API degrades to "prerender nothing".
 */
export async function getIntentSlugs(limit = 200): Promise<string[]> {
  try {
    const rows = await publicFetch<IntentSlug[]>(
      `/public/intent-slugs?take=${limit}`,
    );
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

export async function getIntentBySlug(slug: string): Promise<IntentPageData> {
  return publicFetch<IntentPageData>(`/public/intent/${slug}`);
}

export async function getAvailability(
  slug: string,
  checkin: string,
  checkout: string,
  // The booking-link token. Sent so a guest who negotiated a rate in WhatsApp
  // is quoted that rate here — the server resolves it; the price is never
  // sent from this side.
  sessionToken?: string | null,
): Promise<AvailabilityResult[]> {
  const qs = new URLSearchParams({ checkin, checkout });
  if (sessionToken) qs.set("s", sessionToken);
  return publicFetch<AvailabilityResult[]>(
    `/public/resorts/${slug}/availability?${qs.toString()}`,
    0,
  );
}

export async function submitReview(
  slug: string,
  input: { guestName: string; rating: number; comment?: string },
): Promise<void> {
  const res = await fetch(`${BASE}/public/resorts/${slug}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Could not submit review (${res.status})`);
}
