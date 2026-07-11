const BASE = process.env.REACT_APP_API_URL ?? "http://localhost:3006/api";

export const API_BASE = BASE;

async function publicFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
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

export type ResortDetail = PublicProperty & {
  roomTypes: PublicRoomType[];
  faqs: PublicFaq[];
  todayRate: number;
  reviews: PublicReview[];
  averageRating: number;
  reviewCount: number;
  moments?: PageMoment[];
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

export async function getResort(slug: string): Promise<ResortDetail> {
  return publicFetch<ResortDetail>(`/public/resorts/${slug}`);
}

export async function getIntentBySlug(slug: string): Promise<IntentPageData> {
  return publicFetch<IntentPageData>(`/public/intent/${slug}`);
}

export async function getAvailability(
  slug: string,
  checkin: string,
  checkout: string,
): Promise<AvailabilityResult[]> {
  return publicFetch<AvailabilityResult[]>(
    `/public/resorts/${slug}/availability?checkin=${checkin}&checkout=${checkout}`,
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
