'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureReferralCode, captureUtmParams } from "../lib/attribution";
import { useSearchParamsSnapshot } from "../lib/booking-flow-url";

// Reads the query string through the prerender-safe store rather than
// useSearchParams(), so wrapping this in Suspense is no longer what keeps the
// surrounding route static.
export function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParamsSnapshot();

  useEffect(() => {
    captureUtmParams();
    // Runs on every resort page, not just a landing one: a creator's link can
    // point at /resorts/x, /resorts/x/rooms or a room detail page, and all of
    // them carry ?ref= through to whichever the guest actually opens.
    captureReferralCode();
  }, [pathname, searchParams]);

  return null;
}
