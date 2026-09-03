// Booking-link guest flow (see biznavigo-backend/docs/booking-link-flow-plan.md).
// The WhatsApp agent hands the guest one link carrying an opaque session
// token — this resolves it to their identity + whatever they already told
// the agent (room/dates/party size), so this page opens with nothing
// retyped. Never resolved on the server: the token is only ever read here,
// client-side, from the URL the guest actually opened.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";

export type BookingLinkSessionView = {
  token: string;
  expiresAt: string;
  property: {
    id: string;
    slug: string;
    name: string;
    currency: string;
    instantBooking: boolean;
  };
  guest: { name: string | null; phone: string | null; email: string | null };
  prefill: {
    checkIn: string | null;
    checkOut: string | null;
    adults: number | null;
    children: number | null;
    roomTypeId: string | null;
  };
};

/**
 * Resolves a booking-link token. Returns null for anything that isn't a
 * clean 200 — unknown token, expired (410), or a network hiccup — so a
 * guest on a stale or malformed link still lands on a working page instead
 * of an error screen; they just start from a blank form like any organic
 * visitor.
 */
export async function getBookingLinkSession(
  token: string,
): Promise<BookingLinkSessionView | null> {
  try {
    const res = await fetch(`${BASE}/public/booking-sessions/${token}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as BookingLinkSessionView;
  } catch {
    return null;
  }
}

/**
 * Mints a chat-only session for a guest with no WhatsApp-minted `?s=` token —
 * organic search, a shared link, direct navigation. Creates a real
 * Contact + Conversation server-side, so call this lazily (when the guest
 * actually opens the chat panel), never on page load.
 */
export async function startWebVisitorSession(slug: string): Promise<string> {
  const res = await fetch(`${BASE}/public/resorts/${slug}/start-chat`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(`Could not start chat (${res.status})`);
  const body = (await res.json()) as { token: string };
  return body.token;
}

/**
 * A pre-booking special request raised via "Ask on WhatsApp" or a note the
 * guest leaves before checkout — see Phase 3B of the plan doc. Best-effort:
 * failures are swallowed so a flaky request never blocks the booking flow.
 */
export async function addBookingLinkRequest(
  token: string,
  input: { text: string; quotedAmount?: number },
): Promise<void> {
  try {
    await fetch(`${BASE}/public/booking-sessions/${token}/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      keepalive: true,
    });
  } catch {
    // best-effort — see module comment
  }
}
