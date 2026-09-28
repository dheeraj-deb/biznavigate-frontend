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
  /** Hide the title until the page has scrolled this far — for screens whose
   *  own big heading already says it, so the name isn't printed twice. */
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
  const showTitle = useScrolledPast(revealAfter);
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 40,
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
      <Box sx={{ flex: 1, minWidth: 0, opacity: showTitle ? 1 : 0, transition: "opacity 150ms ease" }}>
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
