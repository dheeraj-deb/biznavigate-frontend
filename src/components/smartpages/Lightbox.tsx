'use client';

import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { VideoEmbed } from "./VideoEmbed";

export type LightboxSlide = { url: string; kind: "image" | "video"; alt?: string };

type Props = {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/** Full-screen gallery viewer with a filmstrip, lazy-loaded on first open. */
export default function Lightbox({ slides, index, onClose, onIndexChange }: Props) {
  const slide = slides[index];

  return (
    <Dialog open fullScreen onClose={onClose} slotProps={{ paper: { sx: { bgcolor: "rgba(0,0,0,0.92)" } } }}>
      <Box
        onClick={onClose}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16, color: "#fff", zIndex: 2 }} aria-label="Close gallery">
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + slides.length) % slides.length);
            }}
            sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#fff", zIndex: 2 }}
            aria-label="Previous"
          >
            <ChevronLeftIcon sx={{ fontSize: 40 }} />
          </IconButton>

          {slide.kind === "video" ? (
            <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} sx={{ width: "100%", maxWidth: 960, aspectRatio: "16/9" }}>
              <VideoEmbed url={slide.url} controls muted={false} />
            </Box>
          ) : (
            <Box
              component="img"
              src={slide.url}
              alt={slide.alt ?? ""}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              sx={{ maxHeight: "80vh", maxWidth: "100%", objectFit: "contain" }}
            />
          )}

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % slides.length);
            }}
            sx={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#fff", zIndex: 2 }}
            aria-label="Next"
          >
            <ChevronRightIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        {slides.length > 1 && (
          <Box
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            sx={{ display: "flex", gap: 1, overflowX: "auto", px: 2, pb: 2 }}
          >
            {slides.map((s, i) => (
              <Box
                key={s.url + i}
                onClick={() => onIndexChange(i)}
                sx={{
                  flexShrink: 0,
                  width: 64,
                  height: 48,
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  outline: i === index ? "2px solid #fff" : "2px solid transparent",
                  opacity: i === index ? 1 : 0.6,
                }}
              >
                {s.kind === "video" ? (
                  <Box sx={{ width: "100%", height: "100%", bgcolor: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.625rem" }}>
                    ▶
                  </Box>
                ) : (
                  <Box component="img" src={s.url} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
