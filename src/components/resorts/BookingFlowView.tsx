"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useBookingFlowParams, useBookingFlowHref, useUpdateBookingFlowParams, readCurrentBookingFlowParams } from "@/lib/booking-flow-url";
import { getAvailability } from "@/lib/publicApi";
import { getBookingLinkSession, type BookingLinkSessionView } from "@/lib/booking-link-api";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { DateGuestCard } from "./DateGuestCard";
import { StaySummary } from "./StaySummary";
import { RoomAvailabilityCard } from "./RoomAvailabilityCard";
import { CheckoutForm } from "./CheckoutForm";
import { OnlineBookingUnavailable } from "./OnlineBookingUnavailable";
import { AskAssistantDrawer } from "./AskAssistantDrawer";
import { MobileTopBar } from "./shell/MobileTopBar";
import { canGoBackInApp } from "./shell/mobile";
import { sp } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { isBookable, partyLabel, type AvailabilityResult, type ResortDetail } from "@/lib/publicApi";
import { arrangementsFor, checkoutArrangement, compareForList, type Arrangement } from "@/lib/party-rooms";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function BookingFlowView({ property }: { property: ResortDetail }) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  const buildHref = useBookingFlowHref();
  const router = useRouter();

  const checkIn = params.checkin ?? defaultDate(1);
  const checkOut = params.checkout ?? defaultDate(2);
  const adults = params.adults ?? 2;
  const childrenCount = params.children ?? 0;
  const childAgesKey = params.childAges?.join(",") ?? "";

  const [session, setSession] = useState<BookingLinkSessionView | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);

  // Resolve the booking-link session FIRST, then seed the URL from it.
  //
  // The session is everything the guest already told the WhatsApp agent —
  // room, dates, party size — and it has to win over the calendar defaults.
  // It can only win if we wait for it: seeding defaults on mount (as this
  // used to) writes "tomorrow, 2 adults" into the URL before the session
  // lands, which makes "the guest said nothing" indistinguishable from "the
  // guest said tomorrow" and silently discards what the conversation
  // established. Seeding once, after resolution, is what makes the handoff
  // lossless — the guest lands on their room, on their dates, and scrolls
  // straight to payment.
  useEffect(() => {
    let alive = true;
    // Straight from the address bar, not from `params`: this effect runs once,
    // so it would otherwise close over the hydration render's empty snapshot
    // and seed defaults over the dates the guest actually arrived with.
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

      const next: Record<string, string | number | null> = {};
      if (!arrived.checkin) next.checkin = prefill?.checkIn ?? defaultDate(1);
      if (!arrived.checkout) next.checkout = prefill?.checkOut ?? defaultDate(2);
      if (arrived.adults == null) next.adults = prefill?.adults ?? 2;
      if (arrived.children == null) next.children = prefill?.children ?? 0;
      // Ages the chat already collected, so checkout doesn't ask again — only
      // when they are for the party the URL ends up with.
      const seededChildren = arrived.children ?? prefill?.children ?? 0;
      if (!arrived.childAges && prefill?.childAges?.length && prefill.childAges.length === seededChildren) {
        next.childAges = prefill.childAges.join(",");
      }
      // Only when the URL is silent. A card tap already carries `room`, and a
      // guest who closed checkout must not have it pushed back at them — once
      // seeded the URL is the sole source of truth, which is why this effect
      // runs exactly once.
      if (!arrived.room && prefill?.roomTypeId) next.room = prefill.roomTypeId;

      if (Object.keys(next).length > 0) updateParams(next);
      setSeeded(true);
    }

    void seed();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bookingLinkEvents.track("page_view", { step: "book" });
  }, []);

  useEffect(() => {
    // Wait for the seed, or the guest sees a flash of default-date rooms
    // before their real dates land — and we burn an availability call on
    // dates nobody asked about.
    if (!seeded) return;
    let alive = true;
    setLoading(true);
    getAvailability(property.slug, checkIn, checkOut, params.s, {
      adults,
      children: childrenCount,
      childAges: params.childAges,
    })
      .then((rows) => {
        if (alive) setAvailability(rows);
      })
      .catch(() => {
        if (alive) setAvailability([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- childAgesKey stands in for the array
  }, [property.slug, checkIn, checkOut, adults, childrenCount, childAgesKey, seeded]);

  useEffect(() => {
    if (availability) {
      bookingLinkEvents.track("availability_viewed", { checkIn, checkOut });
    }
  }, [availability, checkIn, checkOut]);

  const roomTypeById = useMemo(
    () => new Map(property.roomTypes.map((rt) => [rt.id, rt])),
    [property.roomTypes],
  );

  // Only a room genuinely available for the current dates opens checkout —
  // it can still appear in `availability` (just unavailable) after the
  // guest changes dates on this same page for a room they'd already
  // selected, and that must fall back to the room list, not a ₹0 checkout.
  const selectedAvailability = useMemo(
    () => availability?.find((a) => a.roomTypeId === params.room && isBookable(a)) ?? null,
    [availability, params.room],
  );

  // How the group stays in the chosen room type: separate rooms, or fewer
  // rooms with extra beds. Opens on what the WhatsApp link carried (rooms,
  // beds) when the party can book it, else the cheaper way; the guest can
  // switch at checkout.
  const arrangementOptions = selectedAvailability ? arrangementsFor(selectedAvailability) : [];
  const arrangement = selectedAvailability
    ? checkoutArrangement(selectedAvailability, { rooms: params.rooms, beds: params.beds })
    : null;

  function chooseArrangement(next: Arrangement) {
    updateParams({ rooms: next.rooms > 1 ? next.rooms : null, beds: next.extraBeds });
  }

  const anyAvailable = availability?.some((a) => a.available) ?? true;
  const anyBookable = availability?.some(isBookable) ?? true;
  // Rooms the group can book first; too-small and sold-out ones after, so the
  // first card is always one the guest can actually take.
  // The whole place, sold with the rooms, comes after them (compareForList).
  const orderedAvailability = [...(availability ?? [])].sort(compareForList);

  function handleDateGuestChange(next: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
  }) {
    bookingLinkEvents.track("dates_changed_inline");
    const nextAdults = next.adults ?? adults;
    const nextChildren = next.children ?? childrenCount;
    const partyChanged = nextAdults !== adults || nextChildren !== childrenCount;
    updateParams({
      checkin: next.checkIn ?? checkIn,
      checkout: next.checkOut ?? checkOut,
      adults: nextAdults,
      children: nextChildren,
      // The chat's room count was for the old party; the new one is sized
      // afresh by the availability call.
      ...(partyChanged ? { rooms: null, beds: null } : {}),
    });
  }

  // The Book flow's back arrow: checkout → the room list → wherever they
  // came from. A step we pushed ourselves is popped; one they landed on
  // straight from a link is stepped out of instead of closing the site.
  function back() {
    if (canGoBackInApp()) {
      router.back();
    } else if (selectedAvailability) {
      updateParams({ room: null, rooms: null, beds: null });
    } else {
      router.push(buildHref(`/resorts/${property.slug}`, { room: null, rooms: null, beds: null }));
    }
  }

  function handleBook(roomTypeId: string) {
    bookingLinkEvents.track("room_selected", { roomTypeId });
    bookingLinkEvents.track("checkout_opened", { roomTypeId });
    // A count carried for one room type says nothing about another.
    const same = roomTypeId === params.room;
    updateParams({ room: roomTypeId, rooms: same ? params.rooms : null, beds: same ? params.beds : null }, { push: true });
  }

  const inCheckout = Boolean(selectedAvailability);

  return (
    <Box>
      <MobileTopBar
        title={inCheckout ? "Confirm and pay" : "Choose your room"}
        subtitle={`Step ${inCheckout ? 2 : 1} of 2 · ${property.name}`}
        onBack={back}
        actions={
          <IconButton
            component={NextLink}
            href={buildHref(`/resorts/${property.slug}/chat`)}
            aria-label="Ask a question"
            sx={{ width: 48, height: 48, color: sp.ink }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} />
          </IconButton>
        }
      />

      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          height: { xs: 200, sm: 260 },
          width: "100%",
          bgcolor: sp.border,
          backgroundImage: property.photos[0] ? `url(${property.photos[0]})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <DateGuestCard
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={childrenCount}
          onChange={handleDateGuestChange}
        />
      </Box>
      <StaySummary
        // A new step starts with the stay folded away again.
        key={inCheckout ? "checkout" : "rooms"}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        children={childrenCount}
        onChange={handleDateGuestChange}
      />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 4 } }}>
        {selectedAvailability && property.acceptsOnlinePayment === false ? (
          <OnlineBookingUnavailable
            propertyName={property.name}
            roomName={selectedAvailability.name}
            phone={property.tenant?.gupshupSourceNumber ?? null}
            onClose={() => updateParams({ room: null, rooms: null, beds: null }, { push: true })}
          />
        ) : selectedAvailability ? (
          <CheckoutForm
            slug={property.slug}
            availability={selectedAvailability}
            addons={property.addons}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={childrenCount}
            roomCount={arrangement?.rooms ?? 1}
            extraBeds={arrangement?.extraBeds ?? 0}
            arrangementOptions={arrangementOptions}
            onArrangementChange={chooseArrangement}
            initialChildAges={params.childAges}
            onChildAgesChange={(ages) => updateParams({ childAges: ages ? ages.join(",") : null })}
            sessionToken={params.s}
            initialGuest={session?.guest ?? null}
            onClose={() => updateParams({ room: null, rooms: null, beds: null }, { push: true })}
            room={roomTypeById.get(selectedAvailability.roomTypeId)}
            cancellationPolicy={property.cancellationPolicy}
            checkInTime={property.checkInTime}
            checkOutTime={property.checkOutTime}
          />
        ) : (
          <>
            <Typography
              component="h2"
              sx={{ mb: 2, fontFamily: guestDisplayFontFamily, fontSize: "1.625rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: sp.ink }}
            >
              {loading ? "Checking availability…" : "Available rooms"}
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} />
              </Box>
            ) : !anyAvailable ? (
              <Box sx={{ borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, p: 4, textAlign: "center" }}>
                <Typography sx={{ color: sp.ink, fontWeight: 600 }}>No rooms available for these dates</Typography>
                <Typography sx={{ mt: 0.5, fontSize: "0.875rem", color: sp.muted }}>
                  Try shifting your dates by a few days.
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, borderRadius: 9999 }}
                  onClick={() =>
                    updateParams({
                      checkin: defaultDate(7),
                      checkout: defaultDate(8),
                    })
                  }
                >
                  Try next week instead
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {!anyBookable && (
                  <Box sx={{ borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, p: 2.5 }}>
                    <Typography sx={{ color: sp.ink, fontWeight: 600 }}>
                      Not enough rooms free for {partyLabel(adults, childrenCount)}
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontSize: "0.875rem", lineHeight: 1.6, color: sp.muted }}>
                      Try other dates or fewer guests, or message the resort to split your group across room types.
                    </Typography>
                  </Box>
                )}
                {orderedAvailability.map((a) => (
                  <RoomAvailabilityCard
                    key={a.roomTypeId}
                    availability={a}
                    party={partyLabel(adults, childrenCount)}
                    roomType={roomTypeById.get(a.roomTypeId)}
                    viewHref={buildHref(`/resorts/${property.slug}/rooms/${a.roomTypeId}`)}
                    onBook={() => handleBook(a.roomTypeId)}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      <AskAssistantDrawer
        phoneNumber={property.tenant?.gupshupSourceNumber ?? null}
        propertyName={property.name}
        context={{
          step: selectedAvailability ? "checkout" : "availability",
          checkIn,
          checkOut,
          adults,
          children: childrenCount,
          roomTypeId: selectedAvailability?.roomTypeId,
          roomName: selectedAvailability?.name,
        }}
      />
    </Box>
  );
}
