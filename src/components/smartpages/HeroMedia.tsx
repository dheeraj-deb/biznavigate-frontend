'use client';

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { LivingPhotos } from "./LivingPhotos";
import { VideoEmbed, isDirectVideo } from "./VideoEmbed";
import { trackListingClick } from "../../lib/attribution";
import { claimPlayback, releasePlayback } from "../../lib/videoPlayback";
import { sp } from "./tokens";

type Props = {
  photos: string[];
  videos?: string[];
  /** AI motion clip generated from the hero photo (direct mp4 URL). */
  motionClip?: string;
  name: string;
  propertyId?: string;
  onClick?: () => void;
};

/**
 * Hovr-style "Fill": the hero photo becomes a muted autoplay video preview
 * once it's actually in view. Precedence: an owner-uploaded video is a
 * deliberate choice and always wins; the auto-generated AI motion clip of the
 * hero photo comes next; LivingPhotos' CSS pan is the no-video fallback.
 */
export function HeroMedia({ photos, videos, motionClip, name, propertyId, onClick }: Props) {
  const poster = photos[0];
  // The AI clip is decorative motion — reduced-motion users get stills.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const heroVideo =
    (videos ?? []).find(isDirectVideo) ?? (reducedMotion ? undefined : motionClip);
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
        <LivingPhotos photos={photos} alt={name} />
      )}
    </Box>
  );
}
