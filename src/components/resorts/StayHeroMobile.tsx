"use client";

import React, { Suspense, lazy, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import IosShareIcon from "@mui/icons-material/IosShare";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import OptimizedImage from "@/components/OptimizedImage";
import { AmenityLineIcon } from "@/components/smartpages/amenityLineIcons";
import { MomentLayer } from "@/components/smartpages/MomentLayer";
import { MomentPopover } from "@/components/smartpages/MomentPopover";
import type { LightboxSlide } from "@/components/smartpages/Lightbox";
import { formatINR, sp } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { useBookingFlowHref, useHydrated } from "@/lib/booking-flow-url";
import { formatTime } from "@/lib/formatTime";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { ResortDetail } from "@/lib/publicApi";
import { shareResort } from "./shell/share";

const Lightbox = lazy(() => import("@/components/smartpages/Lightbox"));


const OFFERS_PREVIEW = 6;

type QuickStay = { label: string; detail: string; checkIn: string; checkOut: string };

/** A date as the booking URL spells it, in the guest's own day. */
function isoDay(d: Date): string {
  return d.toLocaleDateString("en-CA");
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

function shortDay(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

/**
 * The stays most guests mean: tonight, tomorrow, and the next two weekends
 * (Friday to Sunday; from today when it is already Friday or Saturday).
 */
export function quickStayOptions(now: Date): QuickStay[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const night = (label: string, from: Date): QuickStay => ({
    label,
    detail: shortDay(from),
    checkIn: isoDay(from),
    checkOut: isoDay(addDays(from, 1)),
  });
  const dow = today.getDay(); // 0 Sun … 5 Fri, 6 Sat
  const weekendStart = dow === 5 || dow === 6 ? today : addDays(today, (5 - dow + 7) % 7);
  const weekendEnd = addDays(weekendStart, weekendStart.getDay() === 6 ? 1 : 2);
  const weekend = (label: string, from: Date, to: Date): QuickStay => ({
    label,
    detail: `${from.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${to.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`,
    checkIn: isoDay(from),
    checkOut: isoDay(to),
  });
  return [
    night("Tonight", today),
    night("Tomorrow", addDays(today, 1)),
    weekend("This weekend", weekendStart, weekendEnd),
    weekend("Next weekend", addDays(weekendStart, 7), addDays(weekendEnd, 7)),
  ];
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
 * then a sheet that rises over the photo's bottom edge — opening on "when
 * are you visiting?" quick dates (one tap into Book on those dates) with the
 * times and booking guarantees as one quiet line — what the place offers,
 * and the description. Replaces the web-page stack of title → rounded photo
 * → "See all photos" button → chips → paragraph.
 */
export function StayHeroMobile({ property, photos, photosHref, phone }: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const router = useRouter();
  const buildHref = useBookingFlowHref();
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

  const times = [checkIn && `Check-in ${checkIn}`, checkOut && `out ${checkOut}`].filter(Boolean).join(" · ");
  const meta = [
    times && { icon: <ScheduleRoundedIcon />, label: times, tone: sp.muted },
    maxGuests > 0 && { icon: <PeopleAltOutlinedIcon />, label: `Sleeps ${maxGuests}`, tone: sp.muted },
    property.instantBooking && { icon: <BoltRoundedIcon />, label: "Instant confirmation", tone: "#16a34a" },
    property.acceptsOnlinePayment && { icon: <LockOutlinedIcon />, label: "Secure payment", tone: "#16a34a" },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; tone: string }[];

  // The page is prerendered and cached, so dates computed on the server can
  // be a day stale and would disagree with the browser's. Labels render
  // straight away; the dates only once we are on the client.
  const hydrated = useHydrated();
  const quickStays = quickStayOptions(new Date());

  function openBook(stay: QuickStay | null) {
    if (stay) bookingLinkEvents.track("dates_selected", { checkIn: stay.checkIn, checkOut: stay.checkOut, source: "quick_dates" });
    router.push(
      buildHref(`/resorts/${property.slug}/book`, {
        ...(stay ? { checkin: stay.checkIn, checkout: stay.checkOut } : {}),
        room: null,
      }),
    );
  }

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
        {/* The first thing on the sheet is the thing a guest came to do:
            pick when. One tap opens the Book flow on those dates. */}
        <Box
          sx={{
            borderRadius: "20px",
            border: `1px solid ${sp.border}`,
            bgcolor: "#fff",
            boxShadow: sp.cardShadow,
            pt: 1.75,
            pb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1, px: 2 }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: sp.ink }}>When are you visiting?</Typography>
            {property.todayRate > 0 && (
              <Typography sx={{ flexShrink: 0, fontSize: "0.8125rem", color: sp.muted }}>
                from{" "}
                <Box component="span" sx={{ fontWeight: 700, color: sp.ink }}>
                  ₹{formatINR(property.todayRate)}
                </Box>
                /night
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              mt: 1.25,
              display: "flex",
              gap: 1,
              px: 2,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {quickStays.map((q) => (
              <Box
                key={q.label}
                component="button"
                type="button"
                onClick={() => openBook(q)}
                sx={{
                  flex: "0 0 auto",
                  minWidth: 104,
                  px: 1.5,
                  py: 1,
                  borderRadius: sp.radiusSm,
                  border: `1px solid ${sp.borderSoft}`,
                  bgcolor: sp.bgSoft,
                  fontFamily: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "border-color 120ms ease, background-color 120ms ease",
                  "&:active": { borderColor: sp.blue, bgcolor: sp.blueBgTint },
                }}
              >
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: sp.ink, lineHeight: 1.3 }}>{q.label}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: sp.muted, lineHeight: 1.3, whiteSpace: "nowrap" }}>{hydrated ? q.detail : "\u00a0"}</Typography>
              </Box>
            ))}
            <Box
              component="button"
              type="button"
              onClick={() => openBook(null)}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 1,
                borderRadius: sp.radiusSm,
                border: `1px dashed ${sp.blue}`,
                bgcolor: "#fff",
                color: sp.blue,
                fontFamily: "inherit",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
              Pick dates
            </Box>
          </Box>

          {meta.length > 0 && (
            <Box
              sx={{
                mt: 1.25,
                px: 2,
                display: "flex",
                flexWrap: "wrap",
                columnGap: 1.5,
                rowGap: 0.5,
                fontSize: "0.75rem",
                color: sp.muted,
              }}
            >
              {meta.map((m) => (
                <Box
                  key={m.label}
                  component="span"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, "& svg": { fontSize: 14, color: m.tone } }}
                >
                  {m.icon}
                  {m.label}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {offers.length > 0 && (
          <Box sx={{ mt: 4, pt: 3.5, borderTop: `1px solid ${sp.divider}` }}>
            <Typography
              component="h2"
              sx={{ mb: 1.5, fontFamily: guestDisplayFontFamily, fontSize: "1.625rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: sp.ink }}
            >
              What this place offers
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 2.5 }}>
              {(showAllOffers ? offers : offers.slice(0, OFFERS_PREVIEW)).map((name) => {
                const moment = highlightMoments.get(name.toLowerCase());
                const row = (onClick?: (e: React.MouseEvent<HTMLElement>) => void) => (
                  <Box
                    component={moment ? "button" : "div"}
                    type={moment ? "button" : undefined}
                    onClick={onClick}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      minWidth: 0,
                      width: "100%",
                      minHeight: 60,
                      py: 1.5,
                      px: 0,
                      border: 0,
                      borderBottom: `1px solid ${sp.divider}`,
                      bgcolor: "transparent",
                      fontFamily: "inherit",
                      textAlign: "left",
                      cursor: moment ? "pointer" : "default",
                    }}
                  >
                    {moment ? (
                      <AutoAwesomeOutlinedIcon sx={{ flexShrink: 0, fontSize: 22, color: sp.star }} />
                    ) : (
                      <Box sx={{ flexShrink: 0, display: "flex" }}>
                        <AmenityLineIcon name={name} size={22} color={sp.ink} />
                      </Box>
                    )}
                    <Typography
                      sx={{
                        fontSize: "0.9375rem",
                        fontWeight: 400,
                        color: sp.ink,
                        lineHeight: 1.35,
                        textDecoration: moment ? "underline dotted" : "none",
                        textDecorationColor: sp.star,
                        textUnderlineOffset: 4,
                      }}
                    >
                      {name}
                    </Typography>
                  </Box>
                );
                return moment ? (
                  <MomentPopover
                    key={name}
                    moment={moment}
                    phoneNumber={phone}
                    propertyName={property.name}
                    propertyId={property.id}
                    trigger={(onClick) => row(onClick)}
                  />
                ) : (
                  <React.Fragment key={name}>{row()}</React.Fragment>
                );
              })}
            </Box>
            {offers.length > OFFERS_PREVIEW && (
              <Box
                component="button"
                type="button"
                aria-expanded={showAllOffers}
                onClick={() => setShowAllOffers((v) => !v)}
                sx={{
                  mt: 2.5,
                  width: "100%",
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.75,
                  borderRadius: 999,
                  border: `1px solid ${sp.ink}`,
                  bgcolor: "transparent",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: sp.ink,
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                  "&:hover": { bgcolor: sp.bgSoft },
                }}
              >
                {showAllOffers ? "Show fewer" : `Show all ${offers.length} amenities`}
                <KeyboardArrowDownRoundedIcon
                  sx={{ fontSize: 20, transition: "transform 200ms ease", transform: showAllOffers ? "rotate(180deg)" : "none" }}
                />
              </Box>
            )}
          </Box>
        )}

        {description && (
          <Box sx={{ mt: 4 }}>
            <Typography
              component="h2"
              sx={{ mb: 1.25, fontFamily: guestDisplayFontFamily, fontSize: "1.625rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: sp.ink }}
            >
              About the stay
            </Typography>
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
