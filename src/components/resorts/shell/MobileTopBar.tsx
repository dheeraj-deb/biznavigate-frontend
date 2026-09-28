"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { sp } from "@/components/smartpages/tokens";
import { TOP_BAR_HEIGHT } from "./mobile";

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  /** Trailing icon buttons (share, chat…). */
  actions?: React.ReactNode;
  /** Keep the whole bar out of the way until the page has scrolled this far,
   *  then slide it in over the content — for screens whose own big heading
   *  already names them, where a bar at the top would be an empty strip. */
  revealAfter?: number;
};

function useScrolledPast(offset: number | undefined): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (offset === undefined) return;
    const update = () => setPast(window.scrollY > offset);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);
  return offset === undefined || past;
}

/** Phone-only app bar: optional back arrow, a title, trailing actions. */
export function MobileTopBar({ title, subtitle, onBack, actions, revealAfter }: Props) {
  const shown = useScrolledPast(revealAfter);
  // Revealed bars overlay the page (fixed, so they take no room while hidden);
  // the rest sit in the flow and stick.
  const overlay = revealAfter !== undefined;
  return (
    <Box
      component="header"
      aria-hidden={overlay && !shown ? true : undefined}
      sx={{
        position: overlay ? "fixed" : "sticky",
        top: 0,
        left: overlay ? 0 : undefined,
        right: overlay ? 0 : undefined,
        zIndex: 40,
        transform: overlay && !shown ? "translateY(-100%)" : "none",
        // Hidden bars must not catch taps; visibility flips after the slide.
        visibility: overlay && !shown ? "hidden" : "visible",
        transition: overlay
          ? `transform 200ms ease, visibility 0s linear ${shown ? "0s" : "200ms"}`
          : undefined,
        display: { xs: "flex", sm: "none" },
        alignItems: "center",
        gap: 0.5,
        height: TOP_BAR_HEIGHT,
        pl: onBack ? 0.5 : 2,
        pr: 0.5,
        borderBottom: `1px solid ${sp.divider}`,
        bgcolor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(10px)",
      }}
    >
      {onBack && (
        <IconButton onClick={onBack} aria-label="Back" sx={{ width: 48, height: 48, color: sp.ink }}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontSize: "1rem", fontWeight: 700, color: sp.ink, lineHeight: 1.25 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography noWrap sx={{ fontSize: "0.75rem", color: sp.muted, lineHeight: 1.3 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions}
    </Box>
  );
}
