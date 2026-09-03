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

  // Backfill any missing params so the URL always carries the real, active
  // search — a guest who lands on a bare /book gets defaults, but the URL
  // itself becomes the shareable, refreshable state immediately.
  useEffect(() => {
    if (!params.checkin || !params.checkout || params.adults == null || params.children == null) {
      updateParams({ checkin: checkIn, checkout: checkOut, adults, children: childrenCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bookingLinkEvents.setToken(params.s);
    if (params.s) {
      getBookingLinkSession(params.s).then(setSession);
    }
  }, [params.s]);

  useEffect(() => {
    bookingLinkEvents.track("page_view", { step: "book" });
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getAvailability(property.slug, checkIn, checkOut)
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
  }, [property.slug, checkIn, checkOut]);

  useEffect(() => {
    if (availability) {
      bookingLinkEvents.track("availability_viewed", { checkIn, checkOut });
    }
  }, [availability, checkIn, checkOut]);

  const roomTypeById = useMemo(
    () => new Map(property.roomTypes.map((rt) => [rt.id, rt])),
    [property.roomTypes],
  );

  const selectedAvailability = useMemo(
    () => availability?.find((a) => a.roomTypeId === params.room) ?? null,
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
