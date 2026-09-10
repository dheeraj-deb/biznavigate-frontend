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
  // Creator/referral code the guest arrived carrying (?ref=), with when this
  // device first saw it. Evidence only — the server re-checks the code, clamps
  // the timestamp, and credits nobody on the strength of this alone.
  ref?: string;
  refSeenAt?: string;
  // Booking-link session token, when the guest arrived via a WhatsApp-minted
  // link — see biznavigo-backend/docs/booking-link-flow-plan.md. Ties the
  // booking to the same Contact/Conversation the chat already had.
  sessionToken?: string;
  // Checkout Extras the guest ticked — a repeated id is quantity > 1 (see
  // CheckoutForm.tsx). Price is always re-derived server-side from these ids,
  // never trusted from here.
  addonIds?: string[];
  // Which of the quote's payment options the guest picked. Advisory: the
  // server clamps it to the property's policy — a guest may pay more than it
  // asks, never less.
  paymentChoice?: "FULL" | "DEPOSIT";
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

/** One way the guest may settle — the deposit, or the whole thing. */
export type QuotePaymentOption = {
  kind: "FULL" | "DEPOSIT";
  dueNow: number;
  balance: number;
  balanceDueAt: string | null;
  isDefault: boolean;
};

/**
 * An itemised price for the stay, straight from the server.
 *
 * This exists because the form used to add the extras up itself and show
 * `availability.totalPrice + addonsTotal` as the total — a pre-tax subtotal.
 * On a tax-exclusive property that meant quoting ₹14,500 for a booking created
 * at ₹17,110, on a button that said "Pay ₹14,500" before sending the guest to
 * a Cashfree page asking ₹3,422. Every figure on this screen now comes from
 * the same call the booking itself is priced by.
 */
export type BookingQuote = {
  roomTypeId: string;
  roomName: string;
  nights: number;
  roomCount: number;
  available: boolean;
  availableRooms: number;
  lines: {
    room: {
      subtotal: number;
      perNight: number;
      approvedRate: boolean;
      standardSubtotal: number | null;
    };
    occupancySurcharge: number;
    extras: Array<{
      id: string;
      name: string;
      priceUnit: string;
      unitPrice: number;
      quantity: number;
      subtotal: number;
    }>;
    extrasTotal: number;
  };
  subtotal: number;
  tax: {
    rate: number;
    amount: number;
    taxableAmount: number;
    pricesIncludeTax: boolean;
    note: string | null;
  };
  total: number;
  currency: string;
  paymentMode: "FULL_UPFRONT" | "TOKEN_THEN_BALANCE";
  paymentOptions: QuotePaymentOption[];
};

export type QuoteInput = Pick<
  CreatePublicBookingInput,
  | "roomTypeId"
  | "checkIn"
  | "checkOut"
  | "adults"
  | "children"
  | "roomCount"
  | "sessionToken"
  | "addonIds"
>;

export async function fetchBookingQuote(
  slug: string,
  input: QuoteInput,
  signal?: AbortSignal,
): Promise<BookingQuote> {
  const res = await fetch(`${BASE}/public/resorts/${slug}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal,
  });
  if (!res.ok) {
    const message = await extractMessage(res);
    throw new Error(message ?? `Could not price this stay (${res.status})`);
  }
  return res.json() as Promise<BookingQuote>;
}
