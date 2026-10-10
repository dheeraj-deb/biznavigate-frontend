"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import { parseBeds, parseRooms } from "./party-rooms";

/**
 * The URL is the source of truth across /resorts/[slug], /book, and
 * /rooms/[roomTypeId] (docs/guest-experience-handoff.md, Phase C "State
 * across pages"): back button works, refresh loses nothing, links are
 * shareable, and chat context is derivable directly from the URL. No client
 * store, no sessionStorage for anything load-bearing.
 */
export type BookingFlowParams = {
  s: string | null; // booking-link session token
  checkin: string | null;
  checkout: string | null;
  adults: number | null;
  children: number | null;
  /** "3,9" — one age per child, where young children stay free. */
  childAges: number[] | null;
  room: string | null; // selected roomTypeId
  /**
   * Rooms of `room` the party books — the WhatsApp agent's "3 rooms for your
   * party", minted onto the link only when above 1. Checkout opens at this
   * count when the party can book it (party-rooms.ts#checkoutRoomCount);
   * cleared whenever the party changes, since it was sized for the old one.
   */
  rooms: number | null;
  /**
   * Extra beds in ONE room of `room` — the WhatsApp card that offered
   * "Garden Deluxe Room + 1 extra bed". Cleared with `rooms`, for the same
   * reason: it was chosen for that party and that room.
   */
  beds: number | null;
};


/** "3,9" → [3, 9]; null for anything that isn't a clean list of child ages. */
export function parseChildAges(raw: string | null): number[] | null {
  if (!raw) return null;
  const ages = raw.split(",").map((a) => Number(a.trim()));
  return ages.length > 0 && ages.every((a) => Number.isInteger(a) && a >= 0 && a <= 17) ? ages : null;
}

export function readBookingFlowParams(searchParams: URLSearchParams): BookingFlowParams {
  const adultsRaw = searchParams.get("adults");
  const childrenRaw = searchParams.get("children");
  return {
    s: searchParams.get("s"),
    checkin: searchParams.get("checkin"),
    checkout: searchParams.get("checkout"),
    adults: adultsRaw ? parseInt(adultsRaw, 10) : null,
    children: childrenRaw ? parseInt(childrenRaw, 10) : null,
    childAges: parseChildAges(searchParams.get("childAges")),
    room: searchParams.get("room"),
    rooms: parseRooms(searchParams.get("rooms")),
    beds: parseBeds(searchParams.get("beds")),
  };
}

/**
 * The query string, as a subscribable store.
 *
 * Deliberately not `useSearchParams()`: that hook opts the whole route out of
 * prerendering (Next bails to client-side rendering unless every caller sits
 * behind its own Suspense boundary), which left every /resorts page rendering
 * on demand. Nothing here changes what the page *says* — dates, guests and the
 * session token only prefill the booking controls — so the server renders the
 * page with no params and the real ones apply on hydration.
 */
const SEARCH_CHANGE_EVENT = "bn:booking-flow-search";

// Set when we navigate ourselves, so the new params are readable synchronously
// rather than after the router has finished updating `window.location`.
// `null` means "trust the address bar".
let pendingSearch: string | null = null;

function subscribeToSearch(onChange: () => void) {
  const onPopState = () => {
    pendingSearch = null;
    onChange();
  };
  window.addEventListener("popstate", onPopState);
  window.addEventListener(SEARCH_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onPopState);
    window.removeEventListener(SEARCH_CHANGE_EVENT, onChange);
  };
}

const getSearchSnapshot = () => pendingSearch ?? window.location.search;
const getServerSearchSnapshot = () => "";

function publishSearch(search: string) {
  pendingSearch = search;
  window.dispatchEvent(new Event(SEARCH_CHANGE_EVENT));
}

const noopSubscribe = () => () => {};

/**
 * False on the server and for the hydration render, true afterwards. Lets a
 * prerendered page tell "no query param" apart from "the query string has not
 * been read yet" without setting state inside an effect.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Current query string as `URLSearchParams`. Empty during server render. */
export function useSearchParamsSnapshot(): URLSearchParams {
  const search = useSyncExternalStore(
    subscribeToSearch,
    getSearchSnapshot,
    getServerSearchSnapshot,
  );
  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * The params as they are *right now*, without going through React.
 *
 * Effects that run exactly once on mount (seeding the URL from a WhatsApp
 * session, registering the analytics token) cannot use the hook: the first
 * client render is a hydration render, which by definition matches the
 * server's empty snapshot, so a `[]`-deps effect would close over empty params
 * and overwrite whatever the guest actually arrived with. Reading the address
 * bar directly is both correct and what those effects mean.
 */
export function readCurrentBookingFlowParams(): BookingFlowParams {
  const search = typeof window === "undefined" ? "" : window.location.search;
  return readBookingFlowParams(new URLSearchParams(search));
}

export function useBookingFlowParams(): BookingFlowParams {
  const searchParams = useSearchParamsSnapshot();
  return useMemo(() => readBookingFlowParams(searchParams), [searchParams]);
}

/**
 * Builds a path carrying the current session token + dates/guests forward —
 * used for "View room" / "Book" / back-to-book links that must not lose the
 * guest's in-progress selection.
 */
export function useBookingFlowHref() {
  const params = useBookingFlowParams();
  return useCallback(
    (path: string, overrides: Partial<BookingFlowParams> = {}) => {
      const merged = { ...params, ...overrides };
      const qs = new URLSearchParams();
      if (merged.s) qs.set("s", merged.s);
      if (merged.checkin) qs.set("checkin", merged.checkin);
      if (merged.checkout) qs.set("checkout", merged.checkout);
      if (merged.adults != null) qs.set("adults", String(merged.adults));
      if (merged.children != null) qs.set("children", String(merged.children));
      if (merged.childAges?.length && merged.childAges.length === merged.children) {
        qs.set("childAges", merged.childAges.join(","));
      }
      if (merged.room) qs.set("room", merged.room);
      if (merged.room && merged.rooms != null && merged.rooms > 1) qs.set("rooms", String(merged.rooms));
      if (merged.room && merged.beds != null && merged.beds > 0) qs.set("beds", String(merged.beds));
      const query = qs.toString();
      return query ? `${path}?${query}` : path;
    },
    [params],
  );
}

/**
 * Updates one or more params in place. `replace` (default) for in-page edits
 * like changing dates on the /book card — a new history entry per keystroke
 * would make the back button useless. Pass `push: true` for a real
 * navigation (e.g. selecting a room opens checkout).
 *
 * Merges onto the query string as it is *when called*, not as of the last
 * render: the /book seed effect holds the hydration render's copy of this
 * callback, whose snapshot is the server's empty string, so merging onto that
 * wiped every param the guest arrived with (dates, utm_*) the moment the seed
 * filled in a missing one (adults, say).
 */
export function useUpdateBookingFlowParams() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (
      updates: Partial<Record<keyof BookingFlowParams, string | number | null>>,
      opts: { push?: boolean } = {},
    ) => {
      const qs = new URLSearchParams(getSearchSnapshot());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === "") {
          qs.delete(key);
        } else {
          qs.set(key, String(value));
        }
      }
      const query = qs.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      publishSearch(query ? `?${query}` : "");
      if (opts.push) router.push(url);
      else router.replace(url, { scroll: false });
    },
    [router, pathname],
  );
}
