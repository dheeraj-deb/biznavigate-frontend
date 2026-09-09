'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureReferralCode, captureUtmParams } from "../lib/attribution";

// Split out from PublicLayout so only this leaf needs a Suspense boundary —
// useSearchParams() forces a CSR bailout during static generation otherwise.
export function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams();
    // Runs on every resort page, not just a landing one: a creator's link can
    // point at /resorts/x, /resorts/x/rooms or a room detail page, and all of
    // them carry ?ref= through to whichever the guest actually opens.
    captureReferralCode();
  }, [pathname, searchParams]);

  return null;
}
