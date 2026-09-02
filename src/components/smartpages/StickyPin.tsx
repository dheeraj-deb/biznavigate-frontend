'use client';

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import OptimizedImage from "../OptimizedImage";
import { sp } from "./tokens";

type Props = {
  thumbnail: string;
  anchorRef: React.RefObject<HTMLElement | null>;
  onOpen: () => void;
};

/**
 * Visiting Media / Hovr-style floating entry point into the story viewer.
 * Appears once the hero has scrolled out of view, stays pinned to a corner,
 * and can be dismissed for the rest of the session.
 */
export function StickyPin({ thumbnail, anchorRef, onOpen }: Props) {
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [anchorRef]);

  if (!pastHero || dismissed) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        right: 16,
        bottom: { xs: 88, sm: 24 },
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        onClick={onOpen}
        role="button"
        aria-label="View story"
        sx={{
          position: "relative",
          width: 64,
          height: 64,
          borderRadius: "50%",
          cursor: "pointer",
          border: `3px solid ${sp.blue}`,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `2px solid ${sp.blue}`,
            animation: "sp-stickypin-pulse 2.2s ease-out infinite",
          },
          "@keyframes sp-stickypin-pulse": {
            "0%": { transform: "scale(0.9)", opacity: 0.8 },
            "70%": { transform: "scale(1.3)", opacity: 0 },
            "100%": { transform: "scale(1.3)", opacity: 0 },
          },
        }}
      >
        <OptimizedImage src={thumbnail} alt="View story" priority sx={{ width: "100%", height: "100%" }} />
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: "0.5625rem",
            fontWeight: 700,
            textAlign: "center",
            py: 0.25,
          }}
        >
          TOUR
        </Typography>
      </Box>
      <IconButton
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        size="small"
        sx={{ bgcolor: "rgba(0,0,0,0.4)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,0.6)" } }}
      >
        <CloseIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}
