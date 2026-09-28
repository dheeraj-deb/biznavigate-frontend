"use client";

import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import OptimizedImage from "@/components/OptimizedImage";
import { sp } from "@/components/smartpages/tokens";
import type { LightboxSlide } from "@/components/smartpages/Lightbox";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { readCurrentBookingFlowParams } from "@/lib/booking-flow-url";
import type { ResortDetail } from "@/lib/publicApi";
import { TOP_BAR_HEIGHT } from "./shell/mobile";

const Lightbox = lazy(() => import("@/components/smartpages/Lightbox"));

type Section = { id: string; title: string; start: number; slides: LightboxSlide[] };

/**
 * The Photos tab: every photo and video the property has, grouped — the
 * property itself first, then each room — in one grid. Tapping anything
 * opens the shared full-screen viewer on the whole set, so a guest can swipe
 * from the pool straight on into the cottage.
 */
export function PhotosView({ property }: { property: ResortDetail }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    bookingLinkEvents.setToken(readCurrentBookingFlowParams().s);
    bookingLinkEvents.track("page_view", { step: "photos" });
  }, []);

  const { sections, slides } = useMemo(() => {
    const out: Section[] = [];
    let start = 0;
    const push = (id: string, title: string, items: LightboxSlide[]) => {
      if (!items.length) return;
      out.push({ id, title, start, slides: items });
      start += items.length;
    };
    push("property", property.name, [
      ...property.photos.map((url) => ({ url, kind: "image" as const, alt: property.name })),
      ...(property.videos ?? []).map((url) => ({ url, kind: "video" as const })),
      ...(property.motion?.reelUrl ? [{ url: property.motion.reelUrl, kind: "video" as const }] : []),
    ]);
    for (const room of property.roomTypes) {
      push(`room-${room.id}`, room.name, [
        ...(room.photos ?? []).map((url) => ({ url, kind: "image" as const, alt: room.name })),
        ...(room.videos ?? []).map((url) => ({ url, kind: "video" as const })),
      ]);
    }
    return { sections: out, slides: out.flatMap((s) => s.slides) };
  }, [property]);

  if (!slides.length) {
    return (
      <Box sx={{ px: 2, py: 8, textAlign: "center" }}>
        <Typography sx={{ color: sp.muted }}>No photos yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: "auto", maxWidth: 1024, pb: 3 }}>
      {sections.length > 1 && (
        <Box
          sx={{
            position: "sticky",
            top: { xs: TOP_BAR_HEIGHT, sm: 61 },
            zIndex: 5,
            display: "flex",
            gap: 1,
            overflowX: "auto",
            px: 2,
            py: 1.25,
            bgcolor: "rgba(255,255,255,0.97)",
            borderBottom: `1px solid ${sp.divider}`,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {sections.map((s) => (
            <Box
              key={s.id}
              component="a"
              href={`#${s.id}`}
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                border: `1px solid ${sp.borderSoft}`,
                px: 1.5,
                py: 0.75,
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: sp.ink,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {s.title} · {s.slides.length}
            </Box>
          ))}
        </Box>
      )}

      {sections.map((section) => (
        <Box
          key={section.id}
          component="section"
          id={section.id}
          // Clears the sticky top bar and chip row when a chip jumps here.
          sx={{ scrollMarginTop: { xs: TOP_BAR_HEIGHT + 56, sm: 120 }, px: { xs: 0, sm: 2 }, pt: 2 }}
        >
          <Typography sx={{ px: 2, pb: 1, fontSize: "1rem", fontWeight: 700, color: sp.ink }}>
            {section.title}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: "3px" }}>
            {section.slides.map((slide, i) => {
              const index = section.start + i;
              // The first shot of each group leads full width; the rest tile.
              const lead = i === 0;
              return (
                <Box
                  key={`${slide.url}-${i}`}
                  component="button"
                  type="button"
                  aria-label={`Open ${slide.kind === "video" ? "video" : "photo"} ${i + 1} of ${section.title}`}
                  onClick={() => setLightboxIndex(index)}
                  sx={{
                    position: "relative",
                    gridColumn: lead ? { xs: "1 / -1", sm: "span 2" } : undefined,
                    gridRow: lead ? { sm: "span 2" } : undefined,
                    aspectRatio: lead ? { xs: "16 / 10", sm: "auto" } : "1 / 1",
                    p: 0,
                    border: 0,
                    bgcolor: sp.border,
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  {slide.kind === "image" ? (
                    <OptimizedImage
                      src={slide.url}
                      alt={slide.alt ?? ""}
                      priority={index === 0}
                      sizes={lead ? "(max-width: 600px) 100vw, 66vw" : "(max-width: 600px) 50vw, 33vw"}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "#0f172a",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      <PlayArrowRoundedIcon sx={{ fontSize: 40 }} />
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Video</Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}

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
    </Box>
  );
}
