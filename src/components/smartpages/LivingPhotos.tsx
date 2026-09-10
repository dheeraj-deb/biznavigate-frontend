'use client';

import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

const SLIDE_MS = 6000;
const FADE_MS = 1400;
// Each camera move keeps running through the incoming slide's fade so the
// outgoing photo never freezes mid-crossfade.
const MOVE_MS = SLIDE_MS + FADE_MS + 600;

// Virtual-camera moves over the untouched photo. Minimum scale is 1.06 so a
// translate of up to 2% can never drag an edge into view ((s-1)/2 >= 3%).
const MOVE_COUNT = 4;

type Layer = { src: string; variant: number; key: number };

// next/image only serves these widths (the framework default `deviceSizes`);
// asking for anything else 400s, so the preload has to snap to one.
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function closestDeviceSize(target: number): number {
  return DEVICE_SIZES.find((w) => w >= target) ?? DEVICE_SIZES[DEVICE_SIZES.length - 1];
}

type Props = {
  photos: string[];
  alt: string;
  /**
   * External play gate (e.g. card hover). Omit to autoplay whenever the
   * component is in the viewport.
   */
  playing?: boolean;
  sx?: SxProps<Theme>;
};

/**
 * Hovr-style "Fill" without any generated pixels: the real photo set plays
 * like a filmed clip — each still gets its own slow pan/zoom (a virtual
 * camera move) and crossfades into the next. Motion is gated on viewport
 * visibility and disabled entirely under prefers-reduced-motion.
 */
export function LivingPhotos({ photos, alt, playing, sx }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [layers, setLayers] = useState<Layer[]>(() => [
    { src: photos[0], variant: 0, key: 0 },
  ]);
  const idxRef = useRef(0);
  const tickRef = useRef(1);

  const single = photos.length <= 1;
  const running = inView && (playing ?? true) && !reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload the upcoming photo so a crossfade never lands on unloaded pixels.
  // Warms the optimizer URL, not the source file — priming the original would
  // pull down the owner's full-size upload that nothing ever renders.
  useEffect(() => {
    if (!running || single) return;
    const src = photos[(idxRef.current + 1) % photos.length];
    const width = closestDeviceSize(window.innerWidth * (window.devicePixelRatio || 1));
    const next = new Image();
    next.src = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
  }, [running, single, layers, photos]);

  useEffect(() => {
    if (!running || single) return;
    const id = window.setInterval(() => {
      idxRef.current = (idxRef.current + 1) % photos.length;
      setLayers((prev) => [
        ...prev.slice(-1),
        {
          src: photos[idxRef.current],
          variant: idxRef.current % MOVE_COUNT,
          key: tickRef.current++,
        },
      ]);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [running, single, photos]);

  if (photos.length === 0) return null;

  return (
    <Box
      ref={containerRef}
      role="img"
      aria-label={alt}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "@keyframes sp-lp-fade": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "@keyframes sp-lp-loop": {
          "0%": { transform: "scale(1) translate(0%, 0%)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        "@keyframes sp-lp-0": {
          "0%": { transform: "scale(1.06) translate(0%, 0%)" },
          "100%": { transform: "scale(1.16) translate(-2%, -1%)" },
        },
        "@keyframes sp-lp-1": {
          "0%": { transform: "scale(1.16) translate(-2%, 1%)" },
          "100%": { transform: "scale(1.06) translate(1%, 0%)" },
        },
        "@keyframes sp-lp-2": {
          "0%": { transform: "scale(1.08) translate(1%, 1%)" },
          "100%": { transform: "scale(1.18) translate(-1%, -2%)" },
        },
        "@keyframes sp-lp-3": {
          "0%": { transform: "scale(1.14) translate(0%, -2%)" },
          "100%": { transform: "scale(1.06) translate(0%, 1%)" },
        },
        ...sx,
      }}
    >
      {layers.map((layer) => (
        <Box
          key={layer.key}
          sx={{
            position: "absolute",
            inset: 0,
            animation:
              layer.key === 0
                ? "none"
                : `sp-lp-fade ${FADE_MS}ms ease forwards`,
          }}
        >
          {/* next/image rather than a bare <img>: this is the hero, and the
              LCP element on a property page. It needs to be in the prerendered
              HTML for the preload scanner to find, and resized — owner uploads
              run to ~2MB. The camera move goes through `style` because the
              keyframes above are emitted globally by emotion. */}
          <NextImage
            src={layer.src}
            alt=""
            fill
            sizes="100vw"
            priority={layer.key === 0}
            {...(layer.key === 0 ? {} : { loading: "lazy" as const })}
            draggable={false}
            style={{
              objectFit: "cover",
              willChange: "transform",
              animation: reducedMotion
                ? "none"
                : single
                  ? "sp-lp-loop 18s ease-in-out infinite alternate"
                  : `sp-lp-${layer.variant} ${MOVE_MS}ms ease-out forwards`,
              animationPlayState: running ? "running" : "paused",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
