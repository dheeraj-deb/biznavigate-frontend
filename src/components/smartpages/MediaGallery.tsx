'use client';

import React, { Suspense, lazy, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OptimizedImage from "../OptimizedImage";
import { HeroMedia } from "./HeroMedia";
import { MomentLayer } from "./MomentLayer";
import { isDirectVideo } from "./VideoEmbed";
import { clipForPhoto } from "../../lib/media";
import type { LightboxSlide } from "./Lightbox";
import type { PageMoment, PropertyMotionMedia } from "../../lib/publicApi";
import { sp } from "./tokens";

const Lightbox = lazy(() => import("./Lightbox"));

// Horizontal travel that commits to the next photo, and the movement above
// which a gesture stops counting as a tap.
const SWIPE_THRESHOLD = 60;
const TAP_SLOP = 6;
const DRAG_ELASTIC = 0.2;
const FADE_MS = 150;

type Props = {
  photos: string[];
  videos?: string[];
  motion?: PropertyMotionMedia;
  name: string;
  propertyId?: string;
  moments?: PageMoment[];
  phoneNumber?: string | null;
};

/**
 * Desktop: hero + 2 thumbnails grid (as before, now hero-video capable).
 * Mobile: swipeable snap carousel across all photos.
 * Either surface opens the shared lazy-loaded lightbox (photos + videos).
 * PIN moments matching a photo's URL render as tappable overlays on it.
 */
export function MediaGallery({ photos, videos, motion: motionMedia, name, propertyId, moments, phoneNumber }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Swipe + crossfade for the mobile carousel, on pointer events and CSS.
  // This was framer-motion, which is a whole animation runtime shipped to
  // every guest for one drag handler and one 150ms fade on a surface only
  // phones ever see.
  const dragStartX = useRef<number | null>(null);
  const draggedRef = useRef(false);
  // The offset lives in a ref as well as state: state drives the transform,
  // but the commit decision on pointer-up must not depend on React having
  // re-rendered between the last move and the release.
  const dragXRef = useRef(0);
  const [dragX, setDragX] = useState(0);

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
    draggedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > TAP_SLOP) draggedRef.current = true;
    // Resist past the first and last photo instead of sliding into nothing —
    // framer's `dragElastic`.
    const overscrolling =
      (mobileIndex === 0 && dx > 0) || (mobileIndex === photos.length - 1 && dx < 0);
    const offset = overscrolling ? dx * DRAG_ELASTIC : dx;
    dragXRef.current = offset;
    setDragX(offset);
  }

  function onPointerUp() {
    if (dragStartX.current === null) return;
    dragStartX.current = null;
    const travelled = dragXRef.current;
    dragXRef.current = 0;
    if (travelled < -SWIPE_THRESHOLD && mobileIndex < photos.length - 1) {
      setMobileIndex((i) => i + 1);
    } else if (travelled > SWIPE_THRESHOLD && mobileIndex > 0) {
      setMobileIndex((i) => i - 1);
    }
    setDragX(0);
  }

  if (!photos.length && !videos?.length) {
    return (
      <Box sx={{ aspectRatio: "16/7", width: "100%", borderRadius: sp.radius, bgcolor: sp.border, display: "flex", alignItems: "center", justifyContent: "center", color: sp.faint }}>
        No photos available
      </Box>
    );
  }

  // The highlight reel rides in the lightbox only — it must never displace an
  // owner-uploaded video as the autoplaying hero.
  const reelUrl = motionMedia?.reelUrl ?? undefined;
  const slides: LightboxSlide[] = [
    ...photos.map((url) => ({ url, kind: "image" as const, alt: name })),
    ...(videos ?? []).map((url) => ({ url, kind: "video" as const })),
    ...(reelUrl ? [{ url: reelUrl, kind: "video" as const }] : []),
  ];
  const reelSlideIndex = reelUrl ? slides.length - 1 : null;

  // Right column: one photo on top, and — since a single stacked thumbnail
  // underused that space — up to two more side by side underneath, so the
  // gallery surfaces 4 photos instead of 3 before the guest has to open the
  // lightbox.
  const topThumb = photos[1];
  const bottomThumbs = photos.slice(2, 4);
  const totalMedia = photos.length + (videos?.length ?? 0);
  const shownMedia = (topThumb ? 2 : 1) + bottomThumbs.length;
  const showViewMore = totalMedia > shownMedia;

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Box sx={{ position: "relative", aspectRatio: "4/3", borderRadius: sp.radius, overflow: "hidden", bgcolor: sp.border }}>
          <Box
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClick={() => {
              // A swipe ends with a click event too; only a real tap opens.
              if (draggedRef.current) return;
              setLightboxIndex(mobileIndex);
            }}
            sx={{
              width: "100%",
              height: "100%",
              // Claim horizontal gestures, leave vertical ones to page scroll.
              touchAction: "pan-y",
              transform: dragX ? `translateX(${dragX}px)` : undefined,
              transition: dragX ? "none" : "transform 200ms ease",
              "@keyframes sp-mg-fade": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {/* Keyed so switching photo remounts and replays the fade. */}
            <Box
              key={mobileIndex}
              sx={{ width: "100%", height: "100%", animation: `sp-mg-fade ${FADE_MS}ms ease` }}
            >
              <OptimizedImage src={photos[mobileIndex]} alt={`${name} ${mobileIndex + 1}`} priority={mobileIndex === 0} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          </Box>
          {moments && photos[mobileIndex] && (
            <MomentLayer photoUrl={photos[mobileIndex]} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
          )}
          {reelSlideIndex !== null && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(reelSlideIndex);
              }}
              sx={{
                position: "absolute",
                left: 10,
                bottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                borderRadius: "999px",
                bgcolor: "rgba(0,0,0,0.55)",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              ▶ Highlights
            </Box>
          )}
        </Box>
        {photos.length > 1 && (
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 0.75 }}>
            {photos.map((_, i) => (
              <Box
                key={i}
                onClick={() => setMobileIndex(i)}
                sx={{
                  width: i === mobileIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: i === mobileIndex ? sp.blue : sp.border,
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Desktop: hero grid */}
      <Box sx={{ display: { xs: "none", sm: "grid" }, gap: 1, gridTemplateColumns: "2fr 1fr", height: 420 }}>
        <Box sx={{ position: "relative", height: "100%", minHeight: 0 }}>
          <HeroMedia
            photos={photos}
            videos={videos}
            motionClip={photos[0] ? clipForPhoto(motionMedia, photos[0]) : undefined}
            name={name}
            propertyId={propertyId}
            onClick={() => setLightboxIndex(0)}
          />
          {reelSlideIndex !== null && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(reelSlideIndex);
              }}
              sx={{
                position: "absolute",
                left: 12,
                bottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                borderRadius: "999px",
                bgcolor: "rgba(0,0,0,0.55)",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              ▶ Highlights
            </Box>
          )}
          {moments && photos[0] && (
            <MomentLayer photoUrl={photos[0]} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
          )}
        </Box>

        {(topThumb || bottomThumbs.length > 0) && (
          <Box sx={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 1, height: "100%", minHeight: 0 }}>
            {topThumb && (
              <Box
                onClick={() => setLightboxIndex(1)}
                sx={{ position: "relative", cursor: "pointer", overflow: "hidden", borderRadius: sp.radius, bgcolor: sp.border, minHeight: 0 }}
              >
                <OptimizedImage src={topThumb} alt={`${name} 2`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {moments && (
                  <MomentLayer photoUrl={topThumb} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
                )}
              </Box>
            )}

            {bottomThumbs.length > 0 && (
              <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${bottomThumbs.length}, 1fr)`, gap: 1, minHeight: 0 }}>
                {bottomThumbs.map((photo, i) => {
                  const isLast = i === bottomThumbs.length - 1;
                  return (
                    <Box
                      key={photo}
                      onClick={() => setLightboxIndex(i + 2)}
                      sx={{ position: "relative", cursor: "pointer", overflow: "hidden", borderRadius: sp.radius, bgcolor: sp.border, minHeight: 0 }}
                    >
                      <OptimizedImage src={photo} alt={`${name} ${i + 3}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {isLast && showViewMore && (
                        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.4)" }}>
                          <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                            View more
                          </Typography>
                        </Box>
                      )}
                      {moments && (
                        <MomentLayer photoUrl={photo} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            slides={slides}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onIndexChange={setLightboxIndex}
          />
        </Suspense>
      )}
    </>
  );
}

export { isDirectVideo };
