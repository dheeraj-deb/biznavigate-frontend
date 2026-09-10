import { Inter, Sora } from "next/font/google";

/**
 * The marketing site's type (Sora for display, Inter for body). Self-hosted
 * through next/font rather than a <link> to fonts.googleapis.com: that link
 * sat in the root <head>, so it blocked first paint on every route —
 * including /resorts/*, which uses neither family and loads its own type
 * system in guest-fonts.ts.
 */
export const marketingSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-marketing-sans",
  display: "swap",
});

export const marketingDisplay = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-marketing-display",
  display: "swap",
});

export const marketingFontClass = `${marketingSans.variable} ${marketingDisplay.variable}`;
