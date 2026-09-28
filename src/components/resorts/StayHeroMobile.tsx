"use client";

import React, { Suspense, lazy, useRef, useState } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import IosShareIcon from "@mui/icons-material/IosShare";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import OptimizedImage from "@/components/OptimizedImage";
import { AmenityIcon } from "@/components/smartpages/AmenitiesGrid";
import { MomentLayer } from "@/components/smartpages/MomentLayer";
import { MomentPopover } from "@/components/smartpages/MomentPopover";
import type { LightboxSlide } from "@/components/smartpages/Lightbox";
import { sp } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import type { ResortDetail } from "@/lib/publicApi";
import { shareResort } from "./shell/share";

const Lightbox = lazy(() => import("@/components/smartpages/Lightbox"));

/** "14:00" → "2:00 PM". Anything unparseable is shown as the owner typed it. */
function formatTime(value: string | null): string | null {
  if (!value) return null;
  const m = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!m) return value;
  const h = Number(m[1]);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m[2]} ${suffix}`;
}

const glass = {
  bgcolor: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
  color: sp.ink,
} as const;

type Props = {
  property: ResortDetail;
  photos: string[];
  photosHref: string;
  phone: string | null;
};

/**
 * Phone-only top of Stay: the photos full-bleed with the name set over them,
 * then a sheet that rises over the photo's bottom edge with the facts a guest
 * decides on (times, who fits, how booking works), what the place offers,
 * and the description. Replaces the web-page stack of title → rounded photo
 * → "See all photos" button → chips → paragraph.
 */
export function StayHeroMobile({ property, photos, photosHref, phone }: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const location = [property.city, property.region].filter(Boolean).join(", ");
  const checkIn = formatTime(property.checkInTime);
  const checkOut = formatTime(property.checkOutTime);
  const maxGuests = Math.max(0, ...property.roomTypes.map((r) => r.capacityAdults + (r.capacityChildren ?? 0)));
  const offers = [...new Set([...(property.highlights ?? []), ...(property.amenities ?? [])])];
  const highlightMoments = new Map(
    (property.moments ?? []).filter((m) => m.type === "HIGHLIGHT").map((m) => [m.label.toLowerCase(), m]),
  );
  const description = property.description ?? "";
  const longDescription = description.length > 180;

  const slides: LightboxSlide[] = [
    ...photos.map((url) => ({ url, kind: "image" as const, alt: property.name })),
    ...(property.videos ?? []).map((url) => ({ url, kind: "video" as const })),
    ...(property.motion?.reelUrl ? [{ url: property.motion.reelUrl, kind: "video" as const }] : []),
  ];
  const totalMedia = slides.length;

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  const facts = [
    checkIn && { icon: <LoginRoundedIcon />, label: "Check-in", value: checkIn },
    checkOut && { icon: <LogoutRoundedIcon />, label: "Check-out", value: checkOut },
    maxGuests > 0 && { icon: <PeopleAltOutlinedIcon />, label: "Sleeps", value: `Up to ${maxGuests}` },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box sx={{ position: "relative", height: "min(66vh, 560px)", minHeight: 380, bgcolor: "#0f172a" }}>
        {photos.length > 0 ? (
          <Box
            ref={scrollerRef}
            onScroll={onScroll}
            sx={{
              // OptimizedImage lifts its <img> to z-index 1; contain that here
              // so the photos stay under the scrims, name and buttons.
              isolation: "isolate",
              display: "flex",
              height: "100%",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {photos.map((url, i) => (
              <Box
                key={url}
                onClick={() => setLightboxIndex(i)}
                sx={{ position: "relative", flex: "0 0 100%", height: "100%", scrollSnapAlign: "start", cursor: "pointer" }}
              >
                <OptimizedImage
                  src={url}
                  alt={`${property.name} ${i + 1}`}
                  priority={i === 0}
                  sizes="100vw"
                  sx={{ width: "100%", height: "100%" }}
                />
                {property.moments && (
                  <MomentLayer
                    photoUrl={url}
                    moments={property.moments}
                    phoneNumber={phone}
                    propertyName={property.name}
                    propertyId={property.id}
                  />
                )}
              </Box>
            ))}
          </Box>
        ) : null}

        {/* Scrims keep white type and glass buttons legible on any photo. */}
        <Box
          sx={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 110,
            background: "linear-gradient(rgba(0,0,0,0.38), transparent)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: "58%",
            background: "linear-gradient(transparent, rgba(8,15,30,0.55) 45%, rgba(8,15,30,0.86))",
            pointerEvents: "none",
          }}
        />

        {totalMedia > 0 && (
          <Box
            component={NextLink}
            href={photosHref}
            replace
            aria-label="See all photos"
            sx={{
              ...glass,
              position: "absolute",
              top: "calc(14px + env(safe-area-inset-top))",
              left: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              height: 36,
              px: 1.5,
              borderRadius: "999px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <GridViewRoundedIcon sx={{ fontSize: 16 }} />
            {Math.min(index + 1, Math.max(photos.length, 1))} / {totalMedia}
            <Box component="span" sx={{ fontWeight: 500, color: sp.muted }}>· All photos</Box>
          </Box>
        )}

        <IconButton
          aria-label="Share"
          onClick={() => void shareResort(property.slug, property.name)}
          sx={{ ...glass, position: "absolute", top: "calc(12px + env(safe-area-inset-top))", right: 16, width: 40, height: 40, "&:hover": glass }}
        >
          <IosShareIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, px: 2.5, pb: 5.5, color: "#fff", pointerEvents: "none" }}>
          {property.propertyType && (
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                mb: 1,
                px: 1.25,
                py: 0.4,
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.35)",
                bgcolor: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {property.propertyType.toLowerCase()}
            </Typography>
          )}
          <Typography
            component="h1"
            sx={{
              fontFamily: guestDisplayFontFamily,
              fontSize: "2.5rem",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            }}
          >
            {property.name}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.25, fontSize: "0.9375rem", opacity: 0.92 }}>
            {location && (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <PlaceIcon sx={{ fontSize: 17 }} />
                {location}
              </Box>
            )}
            {property.reviewCount > 0 && (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <StarIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
                <Box component="span" sx={{ fontWeight: 700 }}>{property.averageRating.toFixed(1)}</Box>
                <Box component="span" sx={{ opacity: 0.8 }}>({property.reviewCount})</Box>
              </Box>
            )}
          </Box>
        </Box>

        {photos.length > 1 && (
          <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 30, display: "flex", justifyContent: "center", gap: 0.5, pointerEvents: "none" }}>
            {photos.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: i === index ? 16 : 5,
                  height: 5,
                  borderRadius: 3,
                  bgcolor: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                  transition: "all 200ms ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* ── Sheet ────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          mt: -2.5,
          borderRadius: "24px 24px 0 0",
          bgcolor: "#fff",
          boxShadow: "0 -8px 24px rgba(15,23,42,0.08)",
          px: 2,
          pt: 2.5,
        }}
      >
        {facts.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${facts.length}, 1fr)`,
              borderRadius: sp.radius,
              border: `1px solid ${sp.border}`,
              bgcolor: sp.bgSoft,
            }}
          >
            {facts.map((f, i) => (
              <Box
                key={f.label}
                sx={{
                  px: 1.5,
                  py: 1.5,
                  borderLeft: i === 0 ? "none" : `1px solid ${sp.border}`,
                  "& svg": { fontSize: 18, color: sp.blue },
                }}
              >
                {f.icon}
                <Typography sx={{ mt: 0.5, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: sp.muted }}>
                  {f.label}
                </Typography>
                <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, color: sp.ink }}>{f.value}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {(property.instantBooking || property.acceptsOnlinePayment) && (
          <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 2, fontSize: "0.8125rem", color: sp.body }}>
            {property.instantBooking && (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <BoltRoundedIcon sx={{ fontSize: 17, color: "#16a34a" }} />
                Instant confirmation
              </Box>
            )}
            {property.acceptsOnlinePayment && (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <LockOutlinedIcon sx={{ fontSize: 16, color: "#16a34a" }} />
                Secure online payment
              </Box>
            )}
          </Box>
        )}

        {offers.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 1.25, fontSize: "1.0625rem", fontWeight: 700, color: sp.ink }}>What this place offers</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mx: -2,
                px: 2,
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {offers.map((name) => {
                const moment = highlightMoments.get(name.toLowerCase());
                const tile = (onClick?: (e: React.MouseEvent<HTMLElement>) => void) => (
                  <Box
                    component={moment ? "button" : "div"}
                    type={moment ? "button" : undefined}
                    onClick={onClick}
                    sx={{
                      flex: "0 0 auto",
                      width: 92,
                      minHeight: 84,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 1,
                      p: 1.25,
                      borderRadius: sp.radiusSm,
                      border: `1px solid ${moment ? sp.blue : sp.border}`,
                      bgcolor: moment ? sp.blueBgTint : "#fff",
                      fontFamily: "inherit",
                      textAlign: "left",
                      cursor: moment ? "pointer" : "default",
                    }}
                  >
                    {moment ? <AutoAwesomeIcon sx={{ fontSize: 20, color: sp.blue }} /> : <AmenityIcon name={name} size={22} />}
                    <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: sp.ink, lineHeight: 1.25 }}>{name}</Typography>
                  </Box>
                );
                return moment ? (
                  <MomentPopover
                    key={name}
                    moment={moment}
                    phoneNumber={phone}
                    propertyName={property.name}
                    propertyId={property.id}
                    trigger={(onClick) => tile(onClick)}
                  />
                ) : (
                  <React.Fragment key={name}>{tile()}</React.Fragment>
                );
              })}
            </Box>
          </Box>
        )}

        {description && (
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 1, fontSize: "1.0625rem", fontWeight: 700, color: sp.ink }}>About the stay</Typography>
            <Typography
              sx={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: sp.body,
                whiteSpace: "pre-line",
                ...(longDescription && !expanded
                  ? { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }
                  : {}),
              }}
            >
              {description}
            </Typography>
            {longDescription && (
              <Box
                component="button"
                type="button"
                onClick={() => setExpanded((e) => !e)}
                sx={{ mt: 0.75, p: 0, border: 0, bgcolor: "transparent", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 700, color: sp.ink, textDecoration: "underline", cursor: "pointer" }}
              >
                {expanded ? "Show less" : "Read more"}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox slides={slides} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />
        </Suspense>
      )}
    </Box>
  );
}
