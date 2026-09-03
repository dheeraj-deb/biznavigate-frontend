import { Geist, Instrument_Serif } from "next/font/google";

/**
 * Type system for the guest booking experience (docs/guest-experience-handoff.md,
 * Phase C). Scoped to /resorts/* only — the marketing site keeps its own
 * Sora/Inter identity (app/layout.tsx). Geist for all UI/body; Instrument
 * Serif used sparingly for property and room names — contemporary warmth
 * without the classical/editorial feel of the old Cormorant Garamond guest
 * pages this replaces.
 */
export const guestSans = Geist({
  subsets: ["latin"],
  variable: "--font-guest-sans",
  display: "swap",
});

export const guestDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-guest-display",
  display: "swap",
});

export const guestFontClass = `${guestSans.variable} ${guestDisplay.variable}`;
