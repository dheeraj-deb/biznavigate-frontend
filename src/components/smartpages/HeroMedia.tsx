import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import OptimizedImage from "../OptimizedImage";
import { VideoEmbed, isDirectVideo } from "./VideoEmbed";
import { trackListingClick } from "../../lib/attribution";
import { claimPlayback, releasePlayback } from "../../lib/videoPlayback";
import { sp } from "./tokens";

type Props = {
  photos: string[];
  videos?: string[];
  name: string;
  propertyId?: string;
  onClick?: () => void;
};

/**
 * Hovr-style "Fill": the hero photo becomes a muted autoplay video preview
 * once it's actually in view, falls back to a slow Ken Burns pan on the
 * poster when there's no direct-playable video.
 */
export function HeroMedia({ photos, videos, name, propertyId, onClick }: Props) {
  const poster = photos[0];
  const heroVideo = (videos ?? []).find(isDirectVideo);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!heroVideo || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [heroVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      claimPlayback(video);
      video.play().catch(() => {
        // Autoplay blocked (iOS low-power mode etc.) — poster stays visible,
        // no error UI needed for a muted decorative preview.
      });
      if (!trackedRef.current) {
        trackedRef.current = true;
        trackListingClick({ propertyId, action: "video_play" });
      }
    } else {
      video.pause();
      releasePlayback(video);
    }
  }, [inView, propertyId]);

  if (!poster && !heroVideo) {
    return (
      <Box
        sx={{
          aspectRatio: "16/7",
          width: "100%",
          borderRadius: sp.radius,
          bgcolor: sp.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: sp.faint,
        }}
      >
        No photos available
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      onClick={onClick}
      sx={{
        position: "relative",
        aspectRatio: { xs: "4/3", sm: "auto" },
        height: { sm: 420 },
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        borderRadius: sp.radius,
        bgcolor: sp.border,
      }}
    >
      {heroVideo ? (
        <VideoEmbed url={heroVideo} poster={poster} muted loop videoRef={videoRef} />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            animation: "sp-kenburns 18s ease-in-out infinite alternate",
            "@keyframes sp-kenburns": {
              "0%": { transform: "scale(1) translate(0, 0)" },
              "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
            },
          }}
        >
          <OptimizedImage src={poster} alt={name} priority sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      )}
    </Box>
  );
}
