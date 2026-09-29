'use client';

import React, { useRef, useState } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import OptimizedImage from "../OptimizedImage";
import { AmenityLineIcon } from "./amenityLineIcons";
import { sp, formatINR } from "./tokens";
import { guestDisplayFontFamily } from "../../lib/guestTheme";
import { bedsLabel, mealPlanLabel, sizeLabel } from "../../lib/roomFacts";
import type { PublicRoomType } from "../../lib/publicApi";

/**
 * Shared pieces of the two room cards — RoomCard on the Stay page and
 * RoomAvailabilityCard on /book — so a room looks the same before and after
 * the guest picks dates.
 */

export function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export const bookButtonSx = {
  flexShrink: 0,
  height: 46,
  borderRadius: 999,
  px: 3,
  fontSize: "0.9375rem",
  fontWeight: 600,
  textTransform: "none",
  bgcolor: sp.blue,
  "&:hover": { bgcolor: "#1a4ab8" },
} as const;

const arrowSx = {
  position: "absolute",
  zIndex: 2,
  top: "50%",
  transform: "translateY(-50%)",
  display: { xs: "none", sm: "inline-flex" },
  bgcolor: "rgba(255,255,255,0.9)",
  color: sp.ink,
  p: 0.5,
  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  "&:hover": { bgcolor: "#fff" },
} as const;

/** A small frosted pill laid over the photo (room tour, "Only 2 left"). */
export const photoPillSx = {
  position: "absolute",
  top: 12,
  left: 12,
  zIndex: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.25,
  py: 0.5,
  border: 0,
  borderRadius: 999,
  bgcolor: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  fontFamily: "inherit",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: sp.ink,
} as const;

type CarouselProps = {
  photos: string[];
  alt: string;
  /** Tapping a photo opens the room's own page. */
  href?: string;
  /** Hides the arrows and counter — e.g. while a video plays on top. */
  controlsHidden?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** Extra overlays (tour button, badges, the video itself). */
  children?: React.ReactNode;
};

/**
 * Full-bleed room photos: 4:3 on phones, a fixed-width column beside the
 * details on wider screens. Photos swipe natively (scroll-snap); the arrows
 * on wider screens just scroll the same track.
 */
export function RoomPhotoCarousel({ photos, alt, href, controlsHidden, onMouseEnter, onMouseLeave, children }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + photos.length) % photos.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        position: "relative",
        flexShrink: 0,
        width: { xs: "100%", sm: 300 },
        aspectRatio: { xs: "4 / 3", sm: "auto" },
        minHeight: { sm: 240 },
        bgcolor: sp.border,
      }}
    >
      {photos.length > 0 && (
        <Box
          ref={trackRef}
          onScroll={handleScroll}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {photos.map((src, i) => {
            const image = (
              <OptimizedImage src={src} alt={alt} sizes="(max-width: 600px) 100vw, 300px" sx={{ width: "100%", height: "100%" }} />
            );
            return (
              <Box key={src + i} sx={{ flex: "0 0 100%", height: "100%", scrollSnapAlign: "start" }}>
                {href ? (
                  <Box component={NextLink} href={href} aria-label={`${alt} — view details`} sx={{ display: "block", height: "100%" }}>
                    {image}
                  </Box>
                ) : (
                  image
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {children}

      {photos.length > 1 && !controlsHidden && (
        <>
          <IconButton size="small" aria-label="Previous photo" onClick={() => goTo(index - 1)} sx={{ ...arrowSx, left: 10 }}>
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" aria-label="Next photo" onClick={() => goTo(index + 1)} sx={{ ...arrowSx, right: 10 }}>
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              right: 12,
              bottom: 12,
              px: 1,
              py: 0.25,
              borderRadius: 999,
              bgcolor: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              pointerEvents: "none",
            }}
          >
            {Math.min(index, photos.length - 1) + 1} / {photos.length}
          </Box>
        </>
      )}
    </Box>
  );
}

/** "2 adults + 1 child", with the people icon — one item of the spec line under a room name. */
export function RoomCapacity({ adults, childCount }: { adults: number; childCount: number }) {
  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.625 }}>
      <PeopleAltOutlinedIcon sx={{ fontSize: 16 }} />
      {plural(adults, "adult", "adults")}
      {childCount > 0 ? ` + ${plural(childCount, "child", "children")}` : ""}
    </Box>
  );
}

export const specLineSx = {
  mt: 1,
  display: "flex",
  flexWrap: "wrap",
  columnGap: 2,
  rowGap: 0.5,
  fontSize: "0.8125rem",
  color: sp.muted,
} as const;

const AMENITY_PREVIEW = 3;

export function RoomAmenityPreview({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;
  return (
    <Box sx={{ mt: 1.75, display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 1, fontSize: "0.8125rem", color: sp.body }}>
      {amenities.slice(0, AMENITY_PREVIEW).map((a) => (
        <Box key={a} component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
          <AmenityLineIcon name={a} size={17} color={sp.ink} />
          {a}
        </Box>
      ))}
      {amenities.length > AMENITY_PREVIEW && (
        <Box component="span" sx={{ color: sp.muted }}>
          +{amenities.length - AMENITY_PREVIEW} more
        </Box>
      )}
    </Box>
  );
}

export function RoomDescription({ text }: { text: string }) {
  return (
    <Box
      component="p"
      sx={{
        m: 0,
        mt: 1.5,
        fontSize: "0.9375rem",
        lineHeight: 1.6,
        color: sp.body,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {text}
    </Box>
  );
}

export function RoomDetailsLink({ href }: { href: string }) {
  return (
    <Box
      component={NextLink}
      href={href}
      sx={{
        mt: 1.75,
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        fontSize: "0.875rem",
        fontWeight: 600,
        color: sp.ink,
        textDecoration: "underline",
        textUnderlineOffset: 3,
        textDecorationColor: sp.borderSoft,
        "&:hover": { textDecorationColor: sp.ink },
      }}
    >
      View room details
      <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
    </Box>
  );
}

/** The divider-topped price + action row every room card ends on. */
export function RoomCardFooter({ price, action }: { price: React.ReactNode; action: React.ReactNode }) {
  return (
    <Box sx={{ mt: "auto", pt: 2.5 }}>
      <Box
        sx={{
          pt: 2,
          borderTop: `1px solid ${sp.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ minWidth: 0 }}>{price}</Box>
        <Box sx={{ flexShrink: 0 }}>{action}</Box>
      </Box>
    </Box>
  );
}

export const roomCardShellSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  borderRadius: "20px",
  border: `1px solid ${sp.border}`,
  bgcolor: "#fff",
  overflow: "hidden",
  boxShadow: sp.cardShadow,
} as const;

export const roomCardBodySx = {
  display: "flex",
  flex: 1,
  minWidth: 0,
  flexDirection: "column",
  p: { xs: 2.5, sm: 3 },
} as const;

/** The serif room name, linking to the room's page when there is one. */
export function RoomName({ name, href }: { name: string; href?: string }) {
  const title = (
    <Box
      component="h3"
      sx={{ m: 0, fontFamily: guestDisplayFontFamily, fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: sp.ink }}
    >
      {name}
    </Box>
  );
  return href ? (
    <Box component={NextLink} href={href} sx={{ color: "inherit", textDecoration: "none" }}>
      {title}
    </Box>
  ) : (
    title
  );
}

/**
 * The line under a room name: meals (when included), who it sleeps, the bed
 * and the size — the four facts guests compare rooms on. Items the owner
 * never filled in are simply absent.
 */
export function RoomSpecs({ room }: { room: PublicRoomType }) {
  const meal = mealPlanLabel(room.mealPlan);
  const beds = bedsLabel(room.beds);
  const size = sizeLabel(room.roomSizeSqft);
  return (
    <Box sx={specLineSx}>
      {meal && (
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.625, color: sp.whatsappText, fontWeight: 600 }}>
          <FreeBreakfastOutlinedIcon sx={{ fontSize: 16 }} />
          {meal}
        </Box>
      )}
      <RoomCapacity adults={room.capacityAdults} childCount={room.capacityChildren} />
      {beds && (
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.625 }}>
          <BedOutlinedIcon sx={{ fontSize: 16 }} />
          {beds}
        </Box>
      )}
      {size && (
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.625 }}>
          <SquareFootOutlinedIcon sx={{ fontSize: 16 }} />
          {size}
        </Box>
      )}
    </Box>
  );
}

/**
 * The line under a quoted stay total: nights, then either the extra-guest
 * charge it includes or the nightly rate — one or the other, since "₹13,500
 * a night" beside a total that also carries a child charge doesn't add up.
 */
export function stayPriceNote(a: { nights: number; pricePerNight?: number; occupancySurcharge?: number }): string {
  const nights = a.nights > 1 ? `total for ${plural(a.nights, "night", "nights")}` : "for 1 night";
  if (a.occupancySurcharge && a.occupancySurcharge > 0) return `${nights} · incl. ₹${formatINR(a.occupancySurcharge)} for extra guests`;
  if (a.occupancySurcharge && a.occupancySurcharge < 0) return `${nights} · incl. ₹${formatINR(-a.occupancySurcharge)} off for 1 guest`;
  if (a.nights > 1 && a.pricePerNight) return `${nights} · ₹${formatINR(a.pricePerNight)}/night`;
  return nights;
}
