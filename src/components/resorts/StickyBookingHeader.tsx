"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";

type Props = {
  /** Sentinel to watch — the bar appears once this scrolls out of view
   *  (i.e. once the guest has scrolled past the primary booking widget). */
  watchRef: React.RefObject<HTMLElement | null>;
  propertyName: string;
  todayRate: number;
  onBook: () => void;
};

/**
 * The one gap real market leaders agree on that this page didn't have:
 * booking access must stay reachable while scrolling, not just live at the
 * top and disappear. Airbnb keeps a sticky booking card; Aman and Oberoi
 * keep a persistent "Reserve" button in the header. This is our version —
 * appears in the same slot the plain logo header occupies, once the guest
 * has scrolled past the primary widget, so it never fights that widget for
 * attention while it's still on screen.
 */
export function StickyBookingHeader({ watchRef, propertyName, todayRate, onBook }: Props) {
  const [visible, setVisible] = useState(false);

  // A scroll listener re-measuring the sentinel's offset fresh each time,
  // rather than IntersectionObserver — the sentinel's position shifts as
  // the hero image loads in, and an observer set up before that layout
  // settles can latch onto a stale/premature reading.
  useEffect(() => {
    function onScroll() {
      const el = watchRef.current;
      if (!el) return;
      const offsetTop = el.getBoundingClientRect().top + window.scrollY;
      setVisible(window.scrollY > offsetTop);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [watchRef]);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 41,
        bgcolor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${sp.border}`,
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1024,
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
