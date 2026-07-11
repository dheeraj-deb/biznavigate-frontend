import React, { Suspense, lazy, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import { HeroMedia } from "./HeroMedia";
import { MomentLayer } from "./MomentLayer";
import { isDirectVideo } from "./VideoEmbed";
import type { LightboxSlide } from "./Lightbox";
import type { PageMoment } from "../../lib/publicApi";
import { sp } from "./tokens";

const Lightbox = lazy(() => import("./Lightbox"));

type Props = {
  photos: string[];
  videos?: string[];
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
export function MediaGallery({ photos, videos, name, propertyId, moments, phoneNumber }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  if (!photos.length && !videos?.length) {
    return (
      <Box sx={{ aspectRatio: "16/7", width: "100%", borderRadius: sp.radius, bgcolor: sp.border, display: "flex", alignItems: "center", justifyContent: "center", color: sp.faint }}>
        No photos available
      </Box>
    );
  }

  const slides: LightboxSlide[] = [
    ...photos.map((url) => ({ url, kind: "image" as const, alt: name })),
    ...(videos ?? []).map((url) => ({ url, kind: "video" as const })),
  ];

  const thumbs = photos.slice(1, 3);

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
      <Box sx={{ display: { xs: "none", sm: "grid" }, gap: 1, gridTemplateColumns: "2fr 1fr" }}>
        <Box sx={{ position: "relative" }}>
          <HeroMedia photos={photos} videos={videos} name={name} propertyId={propertyId} onClick={() => setLightboxIndex(0)} />
          {moments && photos[0] && (
            <MomentLayer photoUrl={photos[0]} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
          )}
        </Box>

        {thumbs.length > 0 && (
          <Box sx={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 1 }}>
            {thumbs.map((photo, i) => (
              <Box
                key={photo}
                onClick={() => setLightboxIndex(i + 1)}
                sx={{ position: "relative", cursor: "pointer", overflow: "hidden", borderRadius: sp.radius, bgcolor: sp.border, minHeight: 0 }}
              >
                <OptimizedImage src={photo} alt={`${name} ${i + 2}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {i === 1 && photos.length + (videos?.length ?? 0) > 3 && (
                  <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.4)" }}>
                    <Typography sx={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
                      +{photos.length + (videos?.length ?? 0) - 3} more
                    </Typography>
                  </Box>
                )}
                {moments && (
                  <MomentLayer photoUrl={photo} moments={moments} phoneNumber={phoneNumber ?? null} propertyName={name} propertyId={propertyId} />
                )}
              </Box>
            ))}
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
