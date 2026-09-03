"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import NextLink from "next/link";
import { MediaGallery } from "@/components/smartpages/MediaGallery";
import { AmenitiesGrid } from "@/components/smartpages/AmenitiesGrid";
import { DateGuestCard } from "./DateGuestCard";
import { AskAssistantDrawer } from "./AskAssistantDrawer";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { useBookingFlowParams, useBookingFlowHref, useUpdateBookingFlowParams } from "@/lib/booking-flow-url";
import { getAvailability } from "@/lib/publicApi";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { AvailabilityResult, PublicRoomType, ResortDetail } from "@/lib/publicApi";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function RoomDetailView({ property, roomType }: { property: ResortDetail; roomType: PublicRoomType }) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  const buildHref = useBookingFlowHref();

  const checkIn = params.checkin ?? defaultDate(1);
  const checkOut = params.checkout ?? defaultDate(2);
  const adults = params.adults ?? 2;
  const childrenCount = params.children ?? 0;

  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingLinkEvents.setToken(params.s);
    bookingLinkEvents.track("room_detail_viewed", { roomTypeId: roomType.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const thisRoom = availability?.find((a) => a.roomTypeId === roomType.id) ?? null;

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

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: { xs: 200, sm: 260 },
          width: "100%",
          bgcolor: sp.border,
          backgroundImage: roomType.photos[0] ? `url(${roomType.photos[0]})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Centered on the hero band — sm+ only, where the card fits in one
            row and stays shorter than the hero. On mobile the stacked card
            is taller than the hero itself, so it's rendered as a normal
            sibling below instead (further down, not nested here) rather
            than overflowing a fixed-height absolutely-positioned parent. */}
        <Box sx={{ display: { xs: "none", sm: "block" }, position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)" }}>
          <DateGuestCard
            mt={0}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={childrenCount}
            onChange={handleDateGuestChange}
          />
        </Box>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <DateGuestCard
          mt={2}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={childrenCount}
          onChange={handleDateGuestChange}
        />
      </Box>

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 4 }}>
        <Typography
          component="h1"
          sx={{ fontFamily: guestDisplayFontFamily, fontSize: { xs: "2rem", sm: "2.5rem" }, fontWeight: 400, color: sp.ink }}
        >
          {roomType.name}
        </Typography>
        <Typography sx={{ mt: 0.5, fontSize: "0.9375rem", color: sp.muted }}>
          {property.name} · Sleeps {roomType.capacityAdults} adult{roomType.capacityAdults !== 1 ? "s" : ""}
          {roomType.capacityChildren ? ` + ${roomType.capacityChildren} children` : ""}
          {roomType.totalRooms > 1 && ` · ${roomType.totalRooms} rooms available`}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <MediaGallery photos={roomType.photos} videos={roomType.videos} name={roomType.name} />
        </Box>

        {roomType.description && (
          <Typography sx={{ mt: 3, fontSize: "1rem", lineHeight: 1.75, color: sp.body }}>
            {roomType.description}
          </Typography>
        )}

        {roomType.amenities?.length > 0 && (
          <Box component="section" sx={{ mt: 4 }}>
            <Typography sx={{ mb: 1.5, fontSize: "1.125rem", fontWeight: 700, color: sp.ink }}>Amenities</Typography>
            <AmenitiesGrid amenities={roomType.amenities} />
          </Box>
        )}

        <Box
          sx={{
            mt: 4,
            position: "sticky",
            bottom: 16,
            borderRadius: sp.radius,
            border: `1px solid ${sp.border}`,
            bgcolor: "#fff",
            boxShadow: sp.cardShadowHover,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={22} />
          ) : thisRoom?.available ? (
            <Typography sx={{ fontSize: "1rem" }}>
              <Box component="span" sx={{ fontWeight: 700, color: sp.ink }}>
                ₹{formatINR(thisRoom.totalPrice)}
              </Box>{" "}
              <Box component="span" sx={{ fontSize: "0.8125rem", color: sp.muted }}>
                for {thisRoom.nights} night{thisRoom.nights !== 1 ? "s" : ""}
              </Box>
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "0.9375rem", color: sp.muted }}>Not available for these dates</Typography>
          )}
          <Button
            component={NextLink}
            href={buildHref(`/resorts/${property.slug}/book`, {
              checkin: checkIn,
              checkout: checkOut,
              adults,
              children: childrenCount,
              room: roomType.id,
            })}
            variant="contained"
            disabled={!thisRoom?.available}
            sx={{ borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: sp.blue }, px: 4 }}
          >
            Book
          </Button>
        </Box>
      </Box>

      <AskAssistantDrawer
        slug={property.slug}
        phoneNumber={property.tenant?.gupshupSourceNumber ?? null}
        propertyName={property.name}
        context={{
          step: "room_detail",
          checkIn,
          checkOut,
          adults,
          children: childrenCount,
          roomTypeId: roomType.id,
          roomName: roomType.name,
        }}
      />
    </Box>
  );
}
