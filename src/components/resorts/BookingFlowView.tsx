"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useBookingFlowParams, useBookingFlowHref, useUpdateBookingFlowParams } from "@/lib/booking-flow-url";
import { getAvailability } from "@/lib/publicApi";
import { getBookingLinkSession, type BookingLinkSessionView } from "@/lib/booking-link-api";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { DateGuestCard } from "./DateGuestCard";
import { RoomAvailabilityCard } from "./RoomAvailabilityCard";
import { CheckoutForm } from "./CheckoutForm";
import { AskAssistantDrawer } from "./AskAssistantDrawer";
import { sp } from "@/components/smartpages/tokens";
import type { AvailabilityResult, ResortDetail } from "@/lib/publicApi";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function BookingFlowView({ property }: { property: ResortDetail }) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  const buildHref = useBookingFlowHref();

  const checkIn = params.checkin ?? defaultDate(1);
  const checkOut = params.checkout ?? defaultDate(2);
  const adults = params.adults ?? 2;
  const childrenCount = params.children ?? 0;

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
    bookingLinkEvents.setToken(params.s);

    async function seed() {
      let prefill: BookingLinkSessionView["prefill"] | undefined;
      if (params.s) {
        const resolved = await getBookingLinkSession(params.s);
        if (!alive) return;
        if (resolved) {
          setSession(resolved);
          prefill = resolved.prefill;
        }
      }

      const next: Record<string, string | number | null> = {};
      if (!params.checkin) next.checkin = prefill?.checkIn ?? defaultDate(1);
      if (!params.checkout) next.checkout = prefill?.checkOut ?? defaultDate(2);
      if (params.adults == null) next.adults = prefill?.adults ?? 2;
      if (params.children == null) next.children = prefill?.children ?? 0;
      // Only when the URL is silent. A card tap already carries `room`, and a
      // guest who closed checkout must not have it pushed back at them — once
      // seeded the URL is the sole source of truth, which is why this effect
      // runs exactly once.
      if (!params.room && prefill?.roomTypeId) next.room = prefill.roomTypeId;

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
    getAvailability(property.slug, checkIn, checkOut, params.s)
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
  }, [property.slug, checkIn, checkOut, seeded]);

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
    () => availability?.find((a) => a.roomTypeId === params.room && a.available) ?? null,
    [availability, params.room],
  );

  const anyAvailable = availability?.some((a) => a.available) ?? true;

  function handleDateGuestChange(next: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
  }) {
    bookingLinkEvents.track("dates_changed_inline");
    updateParams({
      checkin: next.checkIn ?? checkIn,
      checkout: next.checkOut ?? checkOut,
      adults: next.adults ?? adults,
      children: next.children ?? childrenCount,
    });
  }

  function handleBook(roomTypeId: string) {
    bookingLinkEvents.track("room_selected", { roomTypeId });
    bookingLinkEvents.track("checkout_opened", { roomTypeId });
    updateParams({ room: roomTypeId }, { push: true });
  }

  return (
    <Box>
      <Box
        sx={{
          height: { xs: 200, sm: 260 },
          width: "100%",
          bgcolor: sp.border,
          backgroundImage: property.photos[0] ? `url(${property.photos[0]})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <DateGuestCard
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        children={childrenCount}
        onChange={handleDateGuestChange}
      />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 4 }}>
        {selectedAvailability ? (
          <CheckoutForm
            slug={property.slug}
            availability={selectedAvailability}
            addons={property.addons}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={childrenCount}
            sessionToken={params.s}
            initialGuest={session?.guest ?? null}
            onClose={() => updateParams({ room: null }, { push: true })}
          />
        ) : (
          <>
            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: sp.ink, mb: 2 }}>
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
                {(availability ?? []).map((a) => (
                  <RoomAvailabilityCard
                    key={a.roomTypeId}
                    availability={a}
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
        slug={property.slug}
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
