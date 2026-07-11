import React from "react";
import Box from "@mui/material/Box";
import { MomentPopover } from "./MomentPopover";
import type { PageMoment } from "../../lib/publicApi";
import { sp } from "./tokens";

type Props = {
  moment: PageMoment;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
};

/**
 * Hovr-style tappable "Pin": a pulsing dot anchored at (xPct, yPct) on a
 * gallery photo. Opens a popover (desktop) or bottom sheet (mobile) with the
 * moment's media, description, and a WhatsApp CTA scoped to its room.
 */
export function MomentPin({ moment, phoneNumber, propertyName, propertyId }: Props) {
  return (
    <MomentPopover
      moment={moment}
      phoneNumber={phoneNumber}
      propertyName={propertyName}
      propertyId={propertyId}
      trigger={(onClick) => (
        <Box
          component="button"
          type="button"
          onClick={onClick}
          aria-label={moment.label}
          sx={{
            position: "absolute",
            left: `${moment.xPct ?? 50}%`,
            top: `${moment.yPct ?? 50}%`,
            transform: "translate(-50%, -50%)",
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "none",
            bgcolor: "#fff",
            cursor: "pointer",
            p: 0,
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              border: `2px solid ${sp.blue}`,
              animation: "sp-pin-pulse 2s ease-out infinite",
            },
            "@keyframes sp-pin-pulse": {
              "0%": { transform: "scale(0.8)", opacity: 0.9 },
              "70%": { transform: "scale(1.6)", opacity: 0 },
              "100%": { transform: "scale(1.6)", opacity: 0 },
            },
          }}
        >
          <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", bgcolor: sp.blue }} />
        </Box>
      )}
    />
  );
}
