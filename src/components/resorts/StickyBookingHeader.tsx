"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";

type Props = {
  propertyName: string;
  todayRate: number;
  onBook: () => void;
};

/**
 * The one gap real market leaders agree on that this page didn't have:
 * booking access must stay reachable while scrolling, not just live at the
 * top and disappear. Airbnb keeps a sticky booking card; Aman and Oberoi
 * keep a persistent "Reserve" button in the header. This is our version —
 * always present, stuck directly under the main nav.
 */
export function StickyBookingHeader({ propertyName, todayRate, onBook }: Props) {
  // Measured once against the public nav's real height rather than a
  // hardcoded constant — the nav's content (logo height, padding) is
  // themeable, and a stale guess would leave a gap or an overlap.
  const [navHeight, setNavHeight] = useState(61);

  useEffect(() => {
    const nav = document.querySelector("header");
    if (nav) setNavHeight(nav.getBoundingClientRect().height);
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "block", sm: "none" },
        position: "sticky",
        top: navHeight,
        zIndex: 39,
        bgcolor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${sp.border}`,
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1280,
          px: { xs: 2, sm: 3 },
          py: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: guestDisplayFontFamily,
            fontSize: "1.125rem",
            fontWeight: 400,
            color: sp.ink,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {propertyName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          {todayRate > 0 && (
            <Typography sx={{ display: { xs: "none", sm: "block" }, fontSize: "0.875rem", color: sp.muted }}>
              From <Box component="span" sx={{ fontWeight: 700, color: sp.ink }}>₹{formatINR(todayRate)}</Box>/night
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={onBook}
            sx={{ borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: "#1a4ab8" }, px: 3, whiteSpace: "nowrap" }}
          >
            Check availability
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
