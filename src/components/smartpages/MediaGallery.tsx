'use client';

import React, { Suspense, lazy, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import { HeroMedia } from "./HeroMedia";
import { MomentLayer } from "./MomentLayer";
import { isDirectVideo } from "./VideoEmbed";
import { clipForPhoto } from "../../lib/media";
import type { LightboxSlide } from "./Lightbox";
import type { PageMoment, PropertyMotionMedia } from "../../lib/publicApi";
import { sp } from "./tokens";

const Lightbox = lazy(() => import("./Lightbox"));

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
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={mobileIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 && mobileIndex < photos.length - 1) setMobileIndex((i) => i + 1);
                else if (info.offset.x > 60 && mobileIndex > 0) setMobileIndex((i) => i - 1);
              }}
              onClick={() => setLightboxIndex(mobileIndex)}
              style={{ width: "100%", height: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <OptimizedImage src={photos[mobileIndex]} alt={`${name} ${mobileIndex + 1}`} priority={mobileIndex === 0} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
          </AnimatePresence>
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
