'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUtmParams } from "../lib/attribution";

// Split out from PublicLayout so only this leaf needs a Suspense boundary —
// useSearchParams() forces a CSR bailout during static generation otherwise.
export function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams();
  }, [pathname, searchParams]);

  return null;
}
