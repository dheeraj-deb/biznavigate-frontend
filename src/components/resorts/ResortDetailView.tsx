'use client';

import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import { trackListingClick } from "@/lib/attribution";
import { MediaGallery } from "@/components/smartpages/MediaGallery";
import { RoomCard } from "@/components/smartpages/RoomCard";
import { AmenitiesGrid } from "@/components/smartpages/AmenitiesGrid";
import { LodgingSchema } from "@/components/smartpages/LodgingSchema";
import { ReviewSection } from "@/components/smartpages/ReviewSection";
import { StickyCtaBar } from "@/components/smartpages/StickyCtaBar";
import { AmenityHighlights } from "@/components/smartpages/AmenityHighlights";
import { StickyPin } from "@/components/smartpages/StickyPin";
import { isDirectVideo } from "@/components/smartpages/VideoEmbed";
import { clipForPhoto } from "@/lib/media";
import type { StorySlide } from "@/components/smartpages/StoryViewer";
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
import { useBookingFlowHref } from "@/lib/booking-flow-url";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { ResortDetail } from "@/lib/publicApi";

const StoryViewer = lazy(() => import("@/components/smartpages/StoryViewer"));

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
  const router = useRouter();
  const buildHref = useBookingFlowHref();
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

  const heroRef = useRef<HTMLDivElement>(null);
  const bookingWidgetRef = useRef<HTMLDivElement>(null);
  const [storyOpen, setStoryOpen] = useState(() => searchParams.get("story") === "1");

  // Story slides: every photo/video plus any PIN moment's own media (with its
  // label as a caption) — no separate content model, it's derived from what
  // the gallery and moments editor already produced. Photos that have an AI
  // motion clip play as that clip (StoryViewer advances video slides on
  // `ended`), so the story feels filmed while staying true to the photos.
  const slides: StorySlide[] = useMemo(() => {
    const base: StorySlide[] = [
      ...property.photos.map((url) => {
        const clip = clipForPhoto(property.motion, url);
        return clip ? { kind: "video" as const, url: clip } : { kind: "image" as const, url };
      }),
      ...(property.videos ?? []).filter(isDirectVideo).map((url) => ({ kind: "video" as const, url })),
    ];
    const pinMedia: StorySlide[] = (property.moments ?? [])
      .filter((m) => m.type === "PIN" && m.mediaUrl)
      .map((m) => ({
        kind: (isDirectVideo(m.mediaUrl as string) ? "video" : "image") as "image" | "video",
        url: m.mediaUrl as string,
        caption: m.label,
      }));
    return [...base, ...pinMedia];
  }, [property]);

  // Page-view event so the funnel (view → moment → book) starts at the top.
  useEffect(() => {
    if (property?.id) {
      trackListingClick({ propertyId: property.id, action: "view" });
    }
  }, [property?.id]);

  const phone = property.tenant?.gupshupSourceNumber ?? null;
  const location = [property.city, property.region, property.country].filter(Boolean).join(", ");
  const highlights = [...(property.highlights ?? []), ...(property.amenities ?? [])].slice(0, 4);

  function checkAvailability() {
    bookingLinkEvents.track("dates_selected", { checkIn: pickCheckIn, checkOut: pickCheckOut });
    router.push(
      buildHref(`/resorts/${property.slug}/book`, {
        checkin: pickCheckIn,
        checkout: pickCheckOut,
        adults: pickAdults,
        children: pickChildren,
      }),
    );
  }

  return (
    <>
      <LodgingSchema property={property} todayRate={property.todayRate} />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, pt: 4 }}>
        <Box ref={heroRef}>
          <MediaGallery
            photos={property.photos}
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
            onClick={checkAvailability}
            sx={{ borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: "#1a4ab8" }, py: 1.25, fontWeight: 600 }}
          >
            Check availability
          </Button>
        }
      />
      {/* Invisible sentinel, not a wrapper — DateGuestCard's own negative
          margin confuses a wrapping ref's measured position. */}
      <Box ref={bookingWidgetRef} sx={{ height: "1px" }} />

      {/* Persistent booking access while scrolling — the one gap real
          market leaders (Airbnb's sticky booking card, Aman/Oberoi's
          persistent header "Reserve" button) agreed on that this page
          didn't have. Appears once the primary widget above scrolls out
          of view. */}
      <StickyBookingHeader
        watchRef={bookingWidgetRef}
        propertyName={property.name}
        todayRate={property.todayRate}
        onBook={checkAvailability}
      />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, pt: 3, pb: { xs: 12, sm: 6 } }}>
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
          {location && (
            <Typography sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.75, color: sp.muted }}>
              <PlaceIcon sx={{ fontSize: 18, flexShrink: 0 }} />
              {location}
            </Typography>
          )}
        </Box>

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

        {/* Room types — the core decision, given the most visual weight */}
        {property.roomTypes.length > 0 && (
          <Box component="section" sx={{ mt: 6 }}>
            <SectionTitle>Room types</SectionTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {property.roomTypes.map((room) => (
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
                />
              ))}
            </Box>
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

      {/* Floating story entry point */}
      {slides.length > 0 && !storyOpen && (
        <StickyPin thumbnail={property.photos[0] ?? slides[0].url} anchorRef={heroRef} onOpen={() => setStoryOpen(true)} />
      )}

      {storyOpen && (
        <Suspense fallback={null}>
          <StoryViewer
            slides={slides}
            phoneNumber={phone}
            propertyName={property.name}
            propertyId={property.id}
            onClose={() => setStoryOpen(false)}
          />
        </Suspense>
      )}

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
