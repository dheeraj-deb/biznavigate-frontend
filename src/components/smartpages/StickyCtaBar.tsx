import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { sp, formatINR } from "./tokens";

type Props = {
  todayRate: number;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
  intentContext?: string;
};

/** Mobile-only fixed bottom bar with the from-price and booking CTA. */
export function StickyCtaBar({ todayRate, phoneNumber, propertyName, propertyId, intentContext }: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: { xs: "block", sm: "none" },
        borderTop: `1px solid ${sp.divider}`,
        bgcolor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        px: 2,
        py: 1.5,
        pb: "calc(12px + env(safe-area-inset-bottom))",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>Starting from</Typography>
          <Typography sx={{ fontSize: "1.125rem", fontWeight: 700, color: sp.ink }}>
            ₹{formatINR(todayRate)}
            <Box component="span" sx={{ fontSize: "0.875rem", fontWeight: 400, color: sp.muted }}>
              /night
            </Box>
          </Typography>
        </Box>
        <WhatsAppCTA
          phoneNumber={phoneNumber}
          propertyName={propertyName}
          propertyId={propertyId}
          intentContext={intentContext}
          label="Book via WhatsApp"
        />
      </Box>
    </Box>
  );
}
