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
  // Physical description and extra-guest pricing. Optional: older API builds
  // don't send them, and every reader treats "missing" as "don't show".
  isEntirePlace?: boolean;
  /** Adults the base price covers; beyond it each adult adds extraAdultPrice. */
  baseOccupancy?: number;
  extraAdultPrice?: number;
  childPrice?: number;
  /** What one guest alone pays a night at the usual price; null when not set. */
  singleOccupancyPrice?: number | null;
  /** Children this age or younger stay free; null when every child pays. */
  freeChildAgeMax?: number | null;
  mealPlan?: MealPlan;
  beds?: { type: BedType; count: number }[];
  bathrooms?: number;
  bathroomShared?: boolean;
  roomSizeSqft?: number | null;
  /** Total guests allowed when LESS than adults + children; null = no extra cap. */
  maxOccupancy?: number | null;
  /** Infants in a cot, on top of the bed capacity. */
  occupancyInfants?: number;
  /** Extra beds the owner allows in one room (0 = none). */
  extraBedsMax?: number;
  extraBedPrice?: number;
  virtualTourUrl?: string | null;
};

/** EP room only · CP breakfast · MAP breakfast + one meal · AP all meals. */
export type MealPlan = "EP" | "CP" | "MAP" | "AP";
export type BedType = "SINGLE" | "DOUBLE" | "QUEEN" | "KING" | "TWIN" | "BUNK" | "SOFA_BED" | "FLOOR_MATTRESS";

export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
  /** Seeded from the property record — the page shows those facts in their
   *  own sections, so it lists only the others. Still sent for FAQ schema. */
  fromPropertyDetails?: boolean;
};

/** Property.guestRules — fixed-choice house rules; every key optional (unset = owner never said). */
export type GuestRules = {
  unmarriedCouples?: "yes" | "no";
  localId?: "yes" | "no";
  foreignNationals?: "yes" | "no";
  alcohol?: "yes" | "bar_only" | "no";
  outsideFood?: "yes" | "no";
  visitors?: "yes" | "day_only" | "no";
  earlyCheckIn?: "free_if_available" | "charged" | "no";
  lateCheckOut?: "free_if_available" | "charged" | "no";
  parties?: "yes" | "no";
  smoking?: "no" | "designated" | "yes";
  idProofs?: ("aadhaar" | "passport" | "driving_licence" | "voter_id")[];
  minCheckInAge?: 18 | 21;
  /** "HH:mm", 24-hour. */
  quietHoursFrom?: string;
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
  /** False until the resort's Cashfree account is active — the server refuses
   *  a checkout until then. Optional: older API builds don't send it. */
  acceptsOnlinePayment?: boolean;
  /** Bookings confirm without the owner approving each one. */
  instantBooking?: boolean;
  // Detail-only fields — optional because older API builds don't send them.
  email?: string | null;
  directions?: string | null;
  childPolicy?: string | null;
  petPolicy?: string | null;
  guestRules?: GuestRules;
  /** Older yes/no column; guestRules.smoking wins when set. */
  smokingAllowed?: boolean;
  childAgeMax?: number;
  infantAgeMax?: number;
  virtualTourUrl?: string | null;
  pricesIncludeTax?: boolean;
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
  /** What the party changes at checkout, for the party sent with the request
   *  (0 without one, or on an approved rate): extra adults and children add,
   *  one guest alone can take off (negative). Not in totalPrice. */
  occupancySurcharge?: number;
  /** False when one room of this type can't hold the party sent with the
   *  request — separate from `available`, which is inventory. */
  fitsParty?: boolean;
  /** Rooms of this type the party needs; 1 when one room holds it. Sized by
   *  the same helper the WhatsApp agent quotes "3 rooms for your party" from. */
  roomsNeeded?: number;
  /** The party can book this type in roomsNeeded rooms: free, enough left. */
  enoughRoomsAvailable?: boolean;
  /** roomsNeeded rooms plus extra guests, before tax. Set only when bookable.
   *  With occupancySurcharge, taken across all roomsNeeded rooms. */
  totalPriceForParty?: number;
  /** One room with extra beds holds the party that needs roomsNeeded rooms:
   *  the beds, and that stay before tax (party-rooms.ts#extraBedsFor). */
  oneRoomWithExtraBeds?: { extraBeds: number; totalPriceForParty: number };
};

// Group sizing lives in party-rooms.ts (plain arithmetic, tested on its own).
// isBookable: free on these dates AND bookable by the party — in one room or
// several — which is what "Book" requires.
export { isBookable, stayTotal, roomsForParty } from "./party-rooms";

/** "2 adults, 1 child" — the party as the guest picked it. */
export function partyLabel(adults: number, children: number): string {
  const a = `${adults} adult${adults !== 1 ? "s" : ""}`;
  return children > 0 ? `${a}, ${children} ${children === 1 ? "child" : "children"}` : a;
}


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

/**
 * The resort's active checkout extras, uncached. The page's copy is up to
 * CATALOGUE_TTL old, so an extra the owner just added was missing from
 * checkout — and one they just switched off still showed, then failed to
 * price. Checkout reads the live list, as it already reads live prices.
 */
export async function getLiveAddons(slug: string, signal?: AbortSignal): Promise<PropertyAddon[]> {
  const res = await fetch(`${BASE}/public/resorts/${slug}`, { cache: "no-store", signal });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const resort = (await res.json()) as Pick<ResortDetail, "addons">;
  return resort.addons ?? [];
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
  // The party, so each room's extra-guest charge comes back with it and the
  // page quotes what checkout will charge — not the base-occupancy rate.
  party?: { adults?: number; children?: number; childAges?: number[] | null },
): Promise<AvailabilityResult[]> {
  const qs = new URLSearchParams({ checkin, checkout });
  if (sessionToken) qs.set("s", sessionToken);
  if (party?.adults != null) qs.set("adults", String(party.adults));
  if (party?.children != null) qs.set("children", String(party.children));
  if (party?.childAges?.length && party.childAges.length === party.children) {
    qs.set("childAges", party.childAges.join(","));
  }
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
