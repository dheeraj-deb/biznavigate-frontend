'use client';

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import { trackListingClick } from "@/lib/attribution";
import { MediaGallery } from "@/components/smartpages/MediaGallery";
import { RoomCard } from "@/components/smartpages/RoomCard";
import { AmenitiesGrid } from "@/components/smartpages/AmenitiesGrid";
import { LodgingSchema } from "@/components/smartpages/LodgingSchema";
import { ReviewSection } from "@/components/smartpages/ReviewSection";
import { StickyCtaBar } from "@/components/smartpages/StickyCtaBar";
import { AmenityHighlights } from "@/components/smartpages/AmenityHighlights";
import {
  SectionTitle,
  LocationSection,
  PoliciesSection,
  FaqSection,
} from "@/components/smartpages/DetailSections";
import { sp } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { AskAssistantDrawer } from "@/components/resorts/AskAssistantDrawer";
import { DateGuestCard } from "@/components/resorts/DateGuestCard";
import { StickyBookingHeader } from "@/components/resorts/StickyBookingHeader";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { getAvailability } from "@/lib/publicApi";
import type { AvailabilityResult, ResortDetail } from "@/lib/publicApi";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function ResortDetailView({ property }: { property: ResortDetail }) {
  // Google's hotel price card (and free booking links) appends the guest's
  // chosen dates/party size to the landing URL — reading them here lets the
  // page open pre-filled instead of asking the guest to type dates twice.
  const searchParams = useSearchParams();
  const checkin = searchParams.get("checkin") ?? undefined;
  const checkout = searchParams.get("checkout") ?? undefined;
  const adultsParam = searchParams.get("adults");
  const adults = adultsParam ? parseInt(adultsParam, 10) : undefined;

  // This page makes no booking decisions of its own (docs/guest-experience-handoff.md,
  // Phase C: "no booking mechanics" on the experience screen) — picking
  // dates here just hands them off to /book, where availability is real.
  const [pickCheckIn, setPickCheckIn] = useState(checkin ?? defaultDate(1));
  const [pickCheckOut, setPickCheckOut] = useState(checkout ?? defaultDate(2));
  const [pickAdults, setPickAdults] = useState(adults ?? 2);
  const [pickChildren, setPickChildren] = useState(0);

  // Real availability for the room types list below — checked in place, no
  // navigation to /book. That page still exists for the actual checkout,
  // but only ever opens once a specific room is already confirmed available
  // for these exact dates (see checkAvailability below).
  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const roomsRef = useRef<HTMLDivElement>(null);

  // Page-view event so the funnel (view → moment → book) starts at the top.
  useEffect(() => {
    if (property?.id) {
      trackListingClick({ propertyId: property.id, action: "view" });
    }
  }, [property?.id]);

  const phone = property.tenant?.gupshupSourceNumber ?? null;
  const location = [property.city, property.region, property.country].filter(Boolean).join(", ");
  const highlights = [...(property.highlights ?? []), ...(property.amenities ?? [])].slice(0, 4);

  // The hero gallery reads best with at least 4 photos (hero + a split
  // bottom row + "View more"). Listings that haven't uploaded enough of
  // their own property-level photos borrow from their room types instead
  // of showing a sparse 1-2 photo grid — room shots are still real photos
  // of this property, just scoped narrower than the top-level gallery.
  const roomPhotos = (property.roomTypes ?? []).flatMap((r) => r.photos ?? []);
  const galleryPhotos =
    property.photos.length < 4
      ? [...property.photos, ...roomPhotos.filter((p) => !property.photos.includes(p))].slice(0, 8)
      : property.photos;

  async function checkAvailability() {
    bookingLinkEvents.track("dates_selected", { checkIn: pickCheckIn, checkOut: pickCheckOut });
    setCheckingAvailability(true);
    try {
      const rows = await getAvailability(property.slug, pickCheckIn, pickCheckOut);
      setAvailability(rows);
    } catch {
      setAvailability([]);
    } finally {
      setCheckingAvailability(false);
    }
    roomsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <LodgingSchema property={property} todayRate={property.todayRate} />

      {/* Persistent booking access while scrolling — the one gap real
          market leaders (Airbnb's sticky booking card, Aman/Oberoi's
          persistent header "Reserve" button) agreed on that this page
          didn't have. Always present, stuck under the main nav. */}
      <StickyBookingHeader
        propertyName={property.name}
        todayRate={property.todayRate}
        onBook={checkAvailability}
      />

      <Box sx={{ mx: "auto", maxWidth: 1280, px: { xs: 2, sm: 3 }, pt: 4 }}>
        {/* Header */}
        <Box>
          {property.propertyType && (
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                borderRadius: "8px",
                bgcolor: sp.blueBgSoft,
                px: 1.25,
                py: 0.5,
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: sp.blue,
              }}
            >
              {property.propertyType}
            </Typography>
          )}
          <Typography
            component="h1"
            sx={{
              mt: 1,
              fontFamily: guestDisplayFontFamily,
              fontSize: { xs: "2.25rem", sm: "2.75rem" },
              fontWeight: 400,
              lineHeight: 1.1,
              color: sp.ink,
            }}
          >
            {property.name}
          </Typography>
          {(location || property.reviewCount > 0) && (
            <Typography sx={{ mt: 1, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.75, color: sp.muted }}>
              {location && (
                <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
                  <PlaceIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                  {location}
                </Box>
              )}
              {property.reviewCount > 0 && (
                <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                  {location && "·"}
                  <StarIcon sx={{ fontSize: 16, color: sp.star }} />
                  <Box component="span" sx={{ fontWeight: 600, color: sp.ink }}>
                    {property.averageRating.toFixed(1)}
                  </Box>
                  · {property.reviewCount} review{property.reviewCount !== 1 ? "s" : ""}
                </Box>
              )}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <MediaGallery
            photos={galleryPhotos}
            videos={property.videos}
            motion={property.motion}
            name={property.name}
            propertyId={property.id}
            moments={property.moments}
            phoneNumber={phone}
          />
        </Box>
      </Box>

      {/* One check-in/out/guests card, reused verbatim on /book and
          /rooms/[id] — picking dates here just hands off; nothing here is
          re-queried against real availability until /book. */}
      <DateGuestCard
        overlap={false}
        checkIn={pickCheckIn}
        checkOut={pickCheckOut}
        adults={pickAdults}
        children={pickChildren}
        onChange={(next) => {
          if (next.checkIn) setPickCheckIn(next.checkIn);
          if (next.checkOut) setPickCheckOut(next.checkOut);
          if (next.adults != null) setPickAdults(next.adults);
          if (next.children != null) setPickChildren(next.children);
        }}
        footer={
          <Button
            fullWidth
            variant="contained"
            disabled={checkingAvailability}
            onClick={checkAvailability}
            startIcon={checkingAvailability ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : undefined}
            sx={{
              borderRadius: 0,
              bgcolor: sp.blue,
              "&:hover": { bgcolor: "#1a4ab8" },
              "&.Mui-disabled": { bgcolor: sp.blue, color: "#fff", opacity: 0.7 },
              fontWeight: 600,
              height: "100%",
              minHeight: { xs: 48, sm: "auto" },
            }}
          >
            {checkingAvailability ? "Checking…" : "Check availability"}
          </Button>
        }
      />

      <Box sx={{ mx: "auto", maxWidth: 1280, px: { xs: 2, sm: 3 }, pt: 3, pb: { xs: 12, sm: 6 } }}>
        {/* Highlights strip */}
        <AmenityHighlights
          highlights={highlights}
          moments={property.moments ?? []}
          phoneNumber={phone}
          propertyName={property.name}
          propertyId={property.id}
        />

        {/* Description */}
        {property.description && (
          <Typography sx={{ mt: 3, fontSize: "1rem", lineHeight: 1.75, color: sp.body }}>
            {property.description}
          </Typography>
        )}

        {/* Room types — the core decision, given the most visual weight.
            Once dates are checked, only rooms actually available for them
            are shown — each with its real price for those dates instead of
            the generic nightly rate, and a Book now that goes straight to
            /book (already pre-verified) instead of re-checking there. */}
        {property.roomTypes.length > 0 && (
          <Box component="section" ref={roomsRef} sx={{ mt: 6, scrollMarginTop: 16 }}>
            <SectionTitle>Room types</SectionTitle>
            {checkingAvailability ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} sx={{ color: sp.blue }} />
              </Box>
            ) : (
              (() => {
                const visibleRooms = availability
                  ? property.roomTypes.filter(
                      (room) => availability.find((a) => a.roomTypeId === room.id)?.available,
                    )
                  : property.roomTypes;

                if (availability && visibleRooms.length === 0) {
                  return (
                    <Typography sx={{ fontSize: "0.9375rem", color: sp.muted }}>
                      No rooms available for these dates. Try different dates.
                    </Typography>
                  );
                }

                return (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {visibleRooms.map((room) => {
                      const thisAvailability = availability?.find((a) => a.roomTypeId === room.id);
                      return (
                        <RoomCard
                          key={room.id}
                          room={room}
                          phoneNumber={phone}
                          propertyName={property.name}
                          propertyId={property.id}
                          bookingSlug={property.slug}
                          tourUrl={
                            property.motion?.tours.find((t) => t.roomTypeId === room.id)?.tourUrl ?? null
                          }
                          checkIn={pickCheckIn}
                          checkOut={pickCheckOut}
                          adults={pickAdults}
                          availability={
                            thisAvailability
                              ? { totalPrice: thisAvailability.totalPrice, nights: thisAvailability.nights }
                              : null
                          }
                          onBookNow={checkAvailability}
                        />
                      );
                    })}
                  </Box>
                );
              })()
            )}
          </Box>
        )}

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <Box component="section" sx={{ mt: 5 }}>
            <SectionTitle>Amenities</SectionTitle>
            <AmenitiesGrid amenities={property.amenities} />
          </Box>
        )}

        {/* Reviews — social proof, still above the fold-adjacent content */}
        <ReviewSection
          slug={property.slug}
          reviews={property.reviews}
          averageRating={property.averageRating}
          reviewCount={property.reviewCount}
        />

        {/* Location, policies, FAQ — reference material, deliberately last */}
        <LocationSection property={property} />
        <PoliciesSection property={property} />
        <FaqSection faqs={property.faqs} />
      </Box>

      {/* Sticky mobile CTA */}
      <StickyCtaBar
        todayRate={property.todayRate}
        phoneNumber={phone}
        propertyName={property.name}
        propertyId={property.id}
        bookingSlug={property.slug}
      />

      <AskAssistantDrawer
        slug={property.slug}
        phoneNumber={phone}
        propertyName={property.name}
        context={{ step: "experience", checkIn: checkin, checkOut: checkout, adults }}
        mobileBottomOffset={88}
      />
    </>
  );
}
