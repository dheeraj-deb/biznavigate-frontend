"use client";

// Behavioural telemetry for the booking-link flow — see
// biznavigo-backend/docs/booking-link-flow-plan.md, Phase 2. Purely
// observational: nothing here ever creates, prices, holds, or confirms a
// booking, so a dropped or delayed batch can never break the guest's
// booking. Mirrors the sendBeacon-first pattern in attribution.ts, batched
// per Phase 2's spec (flush on a timer, a count cap, or the tab hiding) so
// a chatty page never fires 20 individual requests.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3006/api";
const FLUSH_INTERVAL_MS = 3000;
const FLUSH_AT_COUNT = 10;

export type BookingLinkEventType =
  | "page_view"
  | "dates_selected"
  | "guests_selected"
  | "availability_viewed"
  | "room_viewed"
  | "room_selected"
  | "addon_selected"
  | "guest_details_started"
  | "guest_details_completed"
  | "checkout_started"
  | "checkout_failed"
  | "payment_redirected"
  | "payment_returned"
  | "asked_on_whatsapp"
  | "abandoned"
  // Inline guest-chat assistant — see
  // biznavigo-backend/docs/inline-guest-chat-plan.md.
  | "web_chat_opened"
  | "web_chat_message_sent"
  | "web_chat_closed";

type QueuedEvent = {
  type: BookingLinkEventType;
  at: string;
  payload?: Record<string, unknown>;
};

function send(url: string, body: string): void {
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    return;
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

class BookingLinkEventQueue {
  private queue: QueuedEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private token: string | null = null;

  /** Call once the session token is known (or null if there isn't one — an
   *  organic visitor with no WhatsApp-minted session gets no events at all;
   *  the anonymous sibling endpoint is a deliberately separate follow-up). */
  setToken(token: string | null): void {
    this.token = token;
  }

  track(type: BookingLinkEventType, payload?: Record<string, unknown>): void {
    if (!this.token || typeof window === "undefined") return;
    this.queue.push({ type, at: new Date().toISOString(), payload });
    if (this.queue.length >= FLUSH_AT_COUNT) {
      this.flush();
      return;
    }
    if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), FLUSH_INTERVAL_MS);
    }
  }

  flush(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (!this.token || this.queue.length === 0) return;
    const events = this.queue;
    this.queue = [];
    send(
      `${BASE}/public/booking-sessions/${this.token}/events`,
      JSON.stringify({ events }),
    );
  }
}

export const bookingLinkEvents = new BookingLinkEventQueue();

if (typeof document !== "undefined") {
  // A guest closing the tab or switching apps is the one moment a timer-based
  // flush can't be trusted to run — catch it here so a queued batch isn't
  // silently lost.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") bookingLinkEvents.flush();
  });
}
