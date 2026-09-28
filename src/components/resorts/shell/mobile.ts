"use client";

import { useEffect, useState } from "react";

/** Below MUI's `sm` breakpoint — the widths the app shell takes over. */
export const MOBILE_QUERY = "(max-width: 599.95px)";

/** Height of the bottom tab bar, excluding the home-indicator inset. */
export const TAB_BAR_HEIGHT = 64;

/** Height of the mobile top app bar. */
export const TOP_BAR_HEIGHT = 56;

/** How far Stay scrolls before its top bar slides in — about where the name,
 *  printed over the bottom of the photo hero, has gone off the top. */
export const HERO_REVEAL_OFFSET = 360;

/**
 * For event handlers and mount-once effects. A `useMediaQuery` value is still
 * `false` on the hydration render, so an effect that runs once on mount would
 * read the wrong answer from it.
 */
export function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
}

let arrivalConsumed = false;

/**
 * True exactly once per page load: for the screen the guest actually landed
 * on. Later client-side visits to the same screen (a tab tap) return false.
 * A module flag rather than state, because it has to outlive the page
 * component that asks — the Stay page remounts on every tab switch.
 */
export function consumeArrival(): boolean {
  const first = !arrivalConsumed;
  arrivalConsumed = true;
  return first;
}

let pushDepth = 0;
let lastHistoryLength = 0;

/**
 * How many of our own screens sit behind this one in the tab's history, so a
 * back arrow can tell "go back" (the guest came from Stay, or from the room
 * list) from "there is nothing of ours behind you" (they landed here straight
 * from a WhatsApp link, and history.back() would close the site). A push grows
 * history.length; a replace — tab switches, the arrival redirect — does not.
 */
export function noteNavigation(): void {
  if (lastHistoryLength && window.history.length > lastHistoryLength) pushDepth += 1;
  lastHistoryLength = window.history.length;
}

export function notePopState(): void {
  pushDepth = Math.max(0, pushDepth - 1);
}

export function canGoBackInApp(): boolean {
  return pushDepth > 0;
}

/**
 * True while the on-screen keyboard is up. The visual viewport shrinks by the
 * keyboard's height on both iOS and Android; nothing else takes 150px off it.
 * A fixed bottom bar rides up on top of the keyboard otherwise, eating the
 * little room a guest has left to read the reply they are typing under.
 */
export function useKeyboardOpen(): boolean {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setOpen(window.innerHeight - vv.height > 150);
    vv.addEventListener("resize", update);
    return () => vv.removeEventListener("resize", update);
  }, []);
  return open;
}
