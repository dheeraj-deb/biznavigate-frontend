'use client';

import React from "react";
import Box from "@mui/material/Box";
import { MomentPin } from "./MomentPin";
import type { PageMoment } from "../../lib/publicApi";

type Props = {
  photoUrl: string;
  moments: PageMoment[];
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
};

/**
 * Absolutely-positioned overlay matching PIN moments to the gallery photo
 * they were placed on. Wrap this around any `position: relative` photo box
 * (hero, gallery thumb, lightbox slide) so pins track the rendered image.
 */
export function MomentLayer({ photoUrl, moments, phoneNumber, propertyName, propertyId }: Props) {
  const pins = moments.filter((m) => m.type === "PIN" && m.photoUrl === photoUrl);
  if (!pins.length) return null;

  return (
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", "& > *": { pointerEvents: "auto" } }}>
      {pins.map((m) => (
        <MomentPin key={m.id} moment={m} phoneNumber={phoneNumber} propertyName={propertyName} propertyId={propertyId} />
      ))}
    </Box>
  );
}
