// Public book + pay client for /resorts/:slug/book.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";

async function extractMessage(res: Response): Promise<string | null> {
  try {
    const body = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) return body.message.join(", ");
    return body.message ?? null;
  } catch {
    return null;
  }
}

export type PublicBookingResult = {
  bookingId: string;
  code: string;
  totalAmount: number;
  currency: string;
  requiresPayment: boolean;
  checkout?: {
    checkoutSessionId: string;
    shortUrl: string;
    amount: number;
    currency: string;
    expiresAt: string | null;
  };
  holdExpiresAt: string | null;
};

export type CreatePublicBookingInput = {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  roomCount?: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  src?: string;
  // Booking-link session token, when the guest arrived via a WhatsApp-minted
  // link — see biznavigo-backend/docs/booking-link-flow-plan.md. Ties the
  // booking to the same Contact/Conversation the chat already had.
  sessionToken?: string;
  // Checkout Extras the guest ticked — a repeated id is quantity > 1 (see
  // CheckoutForm.tsx). Price is always re-derived server-side from these ids,
  // never trusted from here.
  addonIds?: string[];
};

export async function createPublicBooking(
  slug: string,
  input: CreatePublicBookingInput,
): Promise<PublicBookingResult> {
  const res = await fetch(`${BASE}/public/resorts/${slug}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const message = await extractMessage(res);
    throw new Error(message ?? `Could not create booking (${res.status})`);
  }
  return res.json() as Promise<PublicBookingResult>;
}
