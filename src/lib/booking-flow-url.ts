"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

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
  room: string | null; // selected roomTypeId
};

export function readBookingFlowParams(searchParams: URLSearchParams): BookingFlowParams {
  const adultsRaw = searchParams.get("adults");
  const childrenRaw = searchParams.get("children");
  return {
    s: searchParams.get("s"),
    checkin: searchParams.get("checkin"),
    checkout: searchParams.get("checkout"),
    adults: adultsRaw ? parseInt(adultsRaw, 10) : null,
    children: childrenRaw ? parseInt(childrenRaw, 10) : null,
    room: searchParams.get("room"),
  };
}

export function useBookingFlowParams(): BookingFlowParams {
  const searchParams = useSearchParams();
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
      if (merged.room) qs.set("room", merged.room);
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
 */
export function useUpdateBookingFlowParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (
      updates: Partial<Record<keyof BookingFlowParams, string | number | null>>,
      opts: { push?: boolean } = {},
    ) => {
      const qs = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === "") {
          qs.delete(key);
        } else {
          qs.set(key, String(value));
        }
      }
      const url = `${pathname}?${qs.toString()}`;
      if (opts.push) router.push(url);
      else router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams],
  );
}
