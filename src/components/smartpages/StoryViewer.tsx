import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import { VideoEmbed, isDirectVideo } from "./VideoEmbed";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { trackListingClick } from "../../lib/attribution";

export type StorySlide = { kind: "image" | "video"; url: string; caption?: string };

type Props = {
  slides: StorySlide[];
  startIndex?: number;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
  onClose: () => void;
};

const PHOTO_DURATION_MS = 5000;

/**
 * Hovr-style "Pathways": full-screen vertical stories with per-slide
 * progress bars. Photos auto-advance after PHOTO_DURATION_MS; video slides
 * advance when playback ends. Tap left/right thirds to navigate, press-hold
 * to pause, swipe down to close. A WhatsApp CTA stays pinned at the bottom.
 */
export function StoryViewer({ slides, startIndex = 0, phoneNumber, propertyName, propertyId, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const slide = slides[index];

  function goTo(next: number) {
    if (next < 0) return;
    if (next >= slides.length) {
      onClose();
      return;
    }
    setIndex(next);
    setProgress(0);
    elapsedRef.current = 0;
  }

  useEffect(() => {
    trackListingClick({ propertyId, action: "story_open" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause when the tab is backgrounded so a story doesn't silently burn
  // through slides while the guest isn't looking.
  useEffect(() => {
    function onVisibility() {
      setPaused(document.visibilityState !== "visible");
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Photo auto-advance timer (rAF-driven progress bar).
  useEffect(() => {
    if (slide.kind !== "image") return;
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    startRef.current = performance.now() - elapsedRef.current;
    function tick(now: number) {
      elapsedRef.current = now - startRef.current;
      const pct = Math.min(1, elapsedRef.current / PHOTO_DURATION_MS);
      setProgress(pct);
      if (pct >= 1) {
        goTo(index + 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, slide.kind]);

  // Video slides: progress from currentTime/duration; advance on 'ended'.
  useEffect(() => {
    if (slide.kind !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {});

    function onTimeUpdate() {
      if (video && video.duration) setProgress(video.currentTime / video.duration);
    }
    function onEnded() {
      goTo(index + 1);
    }
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, slide.kind]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        bgcolor: "#000",
        height: "100dvh",
        width: "100%",
      }}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) onClose();
        }}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        {/* Progress bars */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", gap: 0.5, p: 1.5 }}>
          {slides.map((_, i) => (
            <Box key={i} sx={{ flex: 1, height: 3, borderRadius: 2, bgcolor: "rgba(255,255,255,0.35)", overflow: "hidden" }}>
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "#fff",
                  width: `${i < index ? 100 : i === index ? progress * 100 : 0}%`,
                  transition: i === index ? "none" : "width 0.2s",
                }}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={onClose}
          aria-label="Close story"
          sx={{ position: "absolute", top: 28, right: 8, zIndex: 3, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Media */}
        <Box sx={{ position: "relative", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {slide.kind === "video" ? (
            <VideoEmbed url={slide.url} muted={false} autoPlay videoRef={videoRef} sx={{ objectFit: "contain" }} />
          ) : (
            <OptimizedImage src={slide.url} alt={slide.caption ?? ""} priority sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
          )}
          {slide.caption && (
            <Typography
              sx={{
                position: "absolute",
                bottom: 96,
                left: 16,
                right: 16,
                color: "#fff",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              {slide.caption}
            </Typography>
          )}
        </Box>

        {/* Tap zones: left third = prev, right two-thirds = next, hold = pause */}
        <Box sx={{ position: "absolute", inset: 0, display: "flex", zIndex: 2 }}>
          <Box
            onClick={() => goTo(index - 1)}
            onMouseDown={() => setPaused(true)}
            onMouseUp={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            sx={{ width: "33%", height: "100%", cursor: "pointer" }}
          />
          <Box
            onClick={() => goTo(index + 1)}
            onMouseDown={() => setPaused(true)}
            onMouseUp={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            sx={{ width: "67%", height: "100%", cursor: "pointer" }}
          />
        </Box>

        {/* Persistent CTA */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            p: 2,
            pb: "calc(16px + env(safe-area-inset-bottom))",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          }}
        >
          <WhatsAppCTA
            phoneNumber={phoneNumber}
            propertyName={propertyName}
            propertyId={propertyId}
            source="story"
            analyticsAction="story_cta"
            label="Book via WhatsApp"
            fullWidth
          />
        </Box>
      </motion.div>
    </Box>
  );
}

export { isDirectVideo };
export default StoryViewer;
