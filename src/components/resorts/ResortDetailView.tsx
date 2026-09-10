'use client';

import { useEffect, useRef, useState } from "react";
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
import { CheckoutForm } from "@/components/resorts/CheckoutForm";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { useBookingFlowParams, readCurrentBookingFlowParams } from "@/lib/booking-flow-url";
import { getBookingLinkSession, type BookingLinkSessionView } from "@/lib/booking-link-api";
import { getAvailability } from "@/lib/publicApi";
import type { AvailabilityResult, ResortDetail } from "@/lib/publicApi";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function ResortDetailView({ property }: { property: ResortDetail }) {
  // The URL is the whole handoff. `s` is the WhatsApp booking-link token;
  // checkin/checkout/adults/children/room are what the guest already told the
  // agent, and Google's hotel price card appends the same date/party params,
  // so an organic visitor arrives prefilled by the same code path.
  const params = useBookingFlowParams();

  // Resolved from `s`. Carries the guest's name/phone/email and the prefill
  // the conversation established — the reason this page never has to ask for
  // anything the chat already knows.
  const [session, setSession] = useState<BookingLinkSessionView | null>(null);
  const [seeded, setSeeded] = useState(false);

  const [pickCheckIn, setPickCheckIn] = useState(params.checkin ?? defaultDate(1));
  const [pickCheckOut, setPickCheckOut] = useState(params.checkout ?? defaultDate(2));
  const [pickAdults, setPickAdults] = useState(params.adults ?? 2);
  const [pickChildren, setPickChildren] = useState(params.children ?? 0);

  // Real availability for the room types list below — checked in place, no
  // navigation to /book. That page still exists for the actual checkout,
  // but only ever opens once a specific room is already confirmed available
  // for these exact dates (see checkAvailability below).
  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const roomsRef = useRef<HTMLDivElement>(null);

  // Booking now completes on this same page — Book now opens this room's
  // checkout right here instead of handing off to /book. Cleared whenever
  // the guest picks different dates, since a room selected under one date
  // range has nothing to say about another.
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const selectedAvailability =
    availability?.find((a) => a.roomTypeId === selectedRoomId && a.available) ?? null;
  const checkoutRef = useRef<HTMLDivElement>(null);

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

  /**
   * Runs availability for explicit dates rather than reading the pick state,
   * so the seed below can call it with dates it has only just resolved —
   * state set moments earlier would still read stale here.
   */
  async function runAvailability(
    checkIn: string,
    checkOut: string,
    opts: { autoSelectRoomId?: string | null; scrollToRooms?: boolean } = {},
  ) {
    bookingLinkEvents.track("dates_selected", { checkIn, checkOut });
    setSelectedRoomId(null);
    setCheckingAvailability(true);
    let rows: AvailabilityResult[] = [];
    try {
      rows = await getAvailability(property.slug, checkIn, checkOut, params.s);
    } catch {
      rows = [];
    }
    setAvailability(rows);
    setCheckingAvailability(false);
    bookingLinkEvents.track("availability_viewed", {
      checkIn,
      checkOut,
      roomsAvailable: rows.filter((r) => r.available).length,
    });

    // A room the guest already picked in chat opens its checkout directly —
    // that decision was made one tap ago and asking again is the whole
    // friction this handoff exists to remove. Only if it is genuinely still
    // available for these dates; otherwise they land on the room list, which
    // is the honest answer rather than a checkout for a room that has gone.
    const auto = opts.autoSelectRoomId
      ? rows.find((r) => r.roomTypeId === opts.autoSelectRoomId && r.available)
      : undefined;
    if (auto) {
      setSelectedRoomId(auto.roomTypeId);
      bookingLinkEvents.track("checkout_opened", { roomTypeId: auto.roomTypeId });
      requestAnimationFrame(() =>
        checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
      return;
    }
    if (opts.scrollToRooms) {
      roomsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function checkAvailability() {
    void runAvailability(pickCheckIn, pickCheckOut, { scrollToRooms: true });
  }

  // Resolve the booking-link session FIRST, then seed from it — the session is
  // everything the guest already told the WhatsApp agent, and it can only beat
  // this page's calendar defaults if we wait for it. Runs exactly once: after
  // the seed the pick state is the sole source of truth, so a guest who closes
  // checkout or changes dates never has the original selection pushed back.
  useEffect(() => {
    let alive = true;
    // Must precede every track() call. The event queue silently drops
    // everything while it holds no token, which is why this page used to
    // record nothing at all despite firing events.
    // Read straight from the address bar: this effect runs once, so `params`
    // here would still hold the hydration render's empty snapshot and lose
    // whatever the guest arrived with.
    const arrived = readCurrentBookingFlowParams();
    bookingLinkEvents.setToken(arrived.s);

    async function seed() {
      let prefill: BookingLinkSessionView["prefill"] | undefined;
      if (arrived.s) {
        const resolved = await getBookingLinkSession(arrived.s);
        if (!alive) return;
        if (resolved) {
          setSession(resolved);
          prefill = resolved.prefill;
        }
      }

      // The URL wins over the session: a room card carries the room and dates
      // it was actually built for, which are newer than the session's prefill
      // whenever the conversation moved on after the link was first minted.
      const checkIn = arrived.checkin ?? prefill?.checkIn ?? null;
      const checkOut = arrived.checkout ?? prefill?.checkOut ?? null;
      const adults = arrived.adults ?? prefill?.adults ?? null;
      const children = arrived.children ?? prefill?.children ?? null;
      // #rooms / #gallery are browse links — the agent sent them so the guest
      // could look around. Reopening the checkout they left would override the
      // thing they just asked for, so only an explicit `room` in the URL (or
      // no anchor at all) resumes a room the session remembers.
      const anchor = typeof window !== "undefined" ? window.location.hash : "";
      const browsing = anchor === "#rooms" || anchor === "#gallery";
      const room =
        arrived.room ?? (browsing ? null : (prefill?.roomTypeId ?? null));

      if (checkIn) setPickCheckIn(checkIn);
      if (checkOut) setPickCheckOut(checkOut);
      if (adults != null) setPickAdults(adults);
      if (children != null) setPickChildren(children);

      bookingLinkEvents.track("page_view", { step: "experience" });
      setSeeded(true);

      // Dates arrived with the guest, so the thing they came to do is already
      // answerable — checking availability for dates they have just given the
      // agent is not a decision worth another tap.
      if (checkIn && checkOut) {
        void runAvailability(checkIn, checkOut, { autoSelectRoomId: room });
      }
    }

    void seed();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sections render only once their data is in, so the browser's own
  // hash-scroll on load lands on nothing. Re-run it after the seed.
  useEffect(() => {
    if (!seeded || typeof window === "undefined") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Checkout has its own scroll once a room resolves — jumping to an empty
    // anchor first would yank the page twice.
    if (id === "checkout") return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [seeded]);

  function selectRoom(roomTypeId: string) {
    bookingLinkEvents.track("room_selected", { roomTypeId });
    bookingLinkEvents.track("checkout_opened", { roomTypeId });
    setSelectedRoomId(roomTypeId);
    requestAnimationFrame(() =>
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <>
      <LodgingSchema property={property} todayRate={property.todayRate} />

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

        <Box id="gallery" sx={{ mt: 3, scrollMarginTop: 16 }}>
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
            disabled={checkingAvailability || !seeded}
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
          <Box component="section" id="rooms" ref={roomsRef} sx={{ mt: 6, scrollMarginTop: 16 }}>
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
                              ? {
                                  totalPrice: thisAvailability.totalPrice,
                                  nights: thisAvailability.nights,
                                  standardTotalPrice: thisAvailability.standardTotalPrice,
                                  approvedRate: thisAvailability.approvedRate,
                                }
                              : null
                          }
                          onBookNow={checkAvailability}
                          onSelectRoom={() => selectRoom(room.id)}
                        />
                      );
                    })}
                  </Box>
                );
              })()
            )}

            {/* Booking completes right here — no /book handoff. Only ever
                rendered once selectRoom's room is confirmed available for
                the current dates. */}
            {selectedAvailability && (
              <Box id="checkout" ref={checkoutRef} sx={{ scrollMarginTop: 16 }}>
                <CheckoutForm
                  slug={property.slug}
                  availability={selectedAvailability}
                  addons={property.addons}
                  checkIn={pickCheckIn}
                  checkOut={pickCheckOut}
                  adults={pickAdults}
                  children={pickChildren}
                  sessionToken={params.s}
                  initialGuest={session?.guest ?? null}
                  onClose={() => setSelectedRoomId(null)}
                />
              </Box>
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
        context={{
          step: selectedAvailability ? "checkout" : "experience",
          checkIn: pickCheckIn,
          checkOut: pickCheckOut,
          adults: pickAdults,
          children: pickChildren,
          roomTypeId: selectedAvailability?.roomTypeId,
          roomName: selectedAvailability?.name,
        }}
        mobileBottomOffset={88}
      />
    </>
  );
}
