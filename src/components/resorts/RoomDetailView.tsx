"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import NextLink from "next/link";
import { MediaGallery } from "@/components/smartpages/MediaGallery";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CribOutlinedIcon from "@mui/icons-material/CribOutlined";
import SingleBedOutlinedIcon from "@mui/icons-material/SingleBedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { ExpandableText, SectionTitle, SubTitle } from "@/components/smartpages/DetailSections";
import { RoomSpecs, bookButtonSx, stayPriceNote } from "@/components/smartpages/roomCardParts";
import { AmenityLineIcon } from "@/components/smartpages/amenityLineIcons";
import { formatTime } from "@/lib/formatTime";
import { bathroomLabel, bedsLabel, mealPlanLabel, sizeLabel } from "@/lib/roomFacts";
import { DateGuestCard } from "./DateGuestCard";
import { StaySummary } from "./StaySummary";
import { AskAssistantDrawer } from "./AskAssistantDrawer";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { useBookingFlowParams, useBookingFlowHref, useUpdateBookingFlowParams, readCurrentBookingFlowParams } from "@/lib/booking-flow-url";
import { getAvailability, isBookable, partyLabel, stayTotal } from "@/lib/publicApi";
import { extraBedsFor, extraBedsLabel, groupRoomsLabel, roomsForParty, tooFewRoomsLeft } from "@/lib/party-rooms";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { AvailabilityResult, PublicRoomType, ResortDetail } from "@/lib/publicApi";

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

type Fact = { icon: React.ReactNode; label: string; value: string };

const capitalise = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/** The at-a-glance tiles: bed, size, bathroom, meals, and whether it's the whole place. Unset facts are left out. */
function roomFacts(room: PublicRoomType): Fact[] {
  const out: Fact[] = [];
  const beds = bedsLabel(room.beds);
  if (beds) out.push({ icon: <BedOutlinedIcon />, label: "Bed", value: capitalise(beds.replace(/^1 /, "")) });
  const size = sizeLabel(room.roomSizeSqft);
  if (size) out.push({ icon: <SquareFootOutlinedIcon />, label: "Size", value: size });
  const bath = bathroomLabel(room);
  if (bath) out.push({ icon: <BathtubOutlinedIcon />, label: "Bathroom", value: capitalise(bath.replace(/^1 /, "")) });
  // Only when the API sent a plan — an older build omits it, and "Room only" would then be a guess.
  if (room.mealPlan) {
    out.push({ icon: <FreeBreakfastOutlinedIcon />, label: "Meals", value: mealPlanLabel(room.mealPlan) ?? "Room only" });
  }
  if (room.isEntirePlace) out.push({ icon: <VillaOutlinedIcon />, label: "Stay", value: "The entire place" });
  return out;
}

type Extra = { icon: React.ReactNode; label: string; detail?: string; price?: string };

const perNight = (n: number) => `₹${formatINR(n)}/night`;

/**
 * Who the price covers and what more guests cost. Only states what the owner
 * set: a ₹0 child price could mean "free" or "never filled in", so it says
 * nothing rather than promising a free stay.
 */
function roomExtras(room: PublicRoomType, property: ResortDetail): Extra[] {
  const out: Extra[] = [];
  const childMax = property.childAgeMax;
  const infantMax = property.infantAgeMax;

  out.push({
    icon: <PeopleAltOutlinedIcon />,
    label: `Sleeps ${room.capacityAdults} adult${room.capacityAdults !== 1 ? "s" : ""}${
      room.capacityChildren > 0 ? ` + ${room.capacityChildren} ${room.capacityChildren === 1 ? "child" : "children"}` : ""
    }`,
    detail:
      room.baseOccupancy != null && room.baseOccupancy < room.capacityAdults
        ? `The price covers ${room.baseOccupancy} adult${room.baseOccupancy !== 1 ? "s" : ""}`
        : undefined,
  });
  if (room.maxOccupancy) {
    out.push({ icon: <GroupsOutlinedIcon />, label: `Up to ${room.maxOccupancy} guests in total` });
  }
  if (room.extraAdultPrice && room.extraAdultPrice > 0) {
    out.push({ icon: <PersonAddAltOutlinedIcon />, label: "Each extra adult", price: perNight(room.extraAdultPrice) });
  }
  if (room.capacityChildren > 0 && room.childPrice && room.childPrice > 0) {
    out.push({
      icon: <ChildCareOutlinedIcon />,
      label: "Each child",
      detail: infantMax != null && childMax != null ? `Ages ${infantMax}–${childMax}` : undefined,
      price: perNight(room.childPrice),
    });
  }
  if (room.occupancyInfants && room.occupancyInfants > 0) {
    out.push({
      icon: <CribOutlinedIcon />,
      label: `Up to ${room.occupancyInfants} infant${room.occupancyInfants !== 1 ? "s" : ""} in a cot`,
      detail: infantMax != null ? `Under ${infantMax} years` : undefined,
    });
  }
  if (room.extraBedsMax && room.extraBedsMax > 0) {
    out.push({
      icon: <SingleBedOutlinedIcon />,
      label: room.extraBedsMax === 1 ? "Extra bed" : `Up to ${room.extraBedsMax} extra beds`,
      detail: "Book it with the room",
      price: room.extraBedPrice && room.extraBedPrice > 0 ? perNight(room.extraBedPrice) : undefined,
    });
  }
  // A lone "Sleeps 2 adults" row says nothing the specs line didn't.
  return out.length > 1 ? out : [];
}

const AMENITY_PREVIEW = 8;

function RoomAmenities({ amenities }: { amenities: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? amenities : amenities.slice(0, AMENITY_PREVIEW);
  return (
    <Box component="section" sx={{ mt: 5 }}>
      <SectionTitle>In the room</SectionTitle>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, columnGap: 2.5 }}>
        {visible.map((a) => (
          <Box key={a} sx={{ display: "flex", alignItems: "center", gap: 1.5, minHeight: 56, py: 1.25, borderBottom: `1px solid ${sp.divider}` }}>
            <Box sx={{ flexShrink: 0, display: "flex" }}>
              <AmenityLineIcon name={a} size={22} color={sp.ink} />
            </Box>
            <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.35, color: sp.ink }}>{a}</Typography>
          </Box>
        ))}
      </Box>
      {amenities.length > AMENITY_PREVIEW && (
        <Button
          onClick={() => setShowAll((v) => !v)}
          sx={{ mt: 2.5, width: { xs: "100%", sm: "auto" }, height: 46, px: 3, borderRadius: 999, border: `1px solid ${sp.ink}`, color: sp.ink, fontSize: "0.875rem", fontWeight: 600, textTransform: "none" }}
        >
          {showAll ? "Show fewer" : `Show all ${amenities.length} amenities`}
        </Button>
      )}
    </Box>
  );
}

export function RoomDetailView({ property, roomType }: { property: ResortDetail; roomType: PublicRoomType }) {
  const params = useBookingFlowParams();
  const updateParams = useUpdateBookingFlowParams();
  const buildHref = useBookingFlowHref();

  const checkIn = params.checkin ?? defaultDate(1);
  const checkOut = params.checkout ?? defaultDate(2);
  const adults = params.adults ?? 2;
  const childrenCount = params.children ?? 0;
  const childAgesKey = params.childAges?.join(",") ?? "";

  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // From the address bar - a mount-once effect sees empty params on the
    // hydration render, and the event queue drops everything without a token.
    bookingLinkEvents.setToken(readCurrentBookingFlowParams().s);
    bookingLinkEvents.track("room_detail_viewed", { roomTypeId: roomType.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
  }, [property.slug, checkIn, checkOut, adults, childrenCount, childAgesKey, params.s]);

  const thisRoom = availability?.find((a) => a.roomTypeId === roomType.id) ?? null;
  // A group one room can't hold books several — "3 rooms for your group".
  // Free but not bookable is either too few of them left, or a type the
  // group can't take at all.
  // One room with extra beds when the chat chose it for this room, or when
  // that is the only way the group fits.
  const extraBeds = thisRoom
    ? extraBedsFor(thisRoom, params.room === roomType.id ? params : {})
    : 0;
  const groupRooms = thisRoom ? roomsForParty(thisRoom, extraBeds) : 1;
  const stayLabel = extraBeds > 0 ? extraBedsLabel(extraBeds) : groupRoomsLabel(groupRooms);
  const shortOfRooms = !!thisRoom && tooFewRoomsLeft(thisRoom);
  const tooSmall = !!thisRoom?.available && !isBookable(thisRoom) && !shortOfRooms;

  const checkInTime = formatTime(property.checkInTime);
  const checkOutTime = formatTime(property.checkOutTime);
  const facts = roomFacts(roomType);
  const extras = roomExtras(roomType, property);

  function handleDateGuestChange(next: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
  }) {
    bookingLinkEvents.track("dates_changed_inline");
    const nextAdults = next.adults ?? adults;
    const nextChildren = next.children ?? childrenCount;
    updateParams({
      checkin: next.checkIn ?? checkIn,
      checkout: next.checkOut ?? checkOut,
      adults: nextAdults,
      children: nextChildren,
      // A room count from the chat was sized for the old party.
      ...(nextAdults !== adults || nextChildren !== childrenCount ? { rooms: null, beds: null } : {}),
    });
  }

  return (
    <Box>
      <Box
        sx={{
          // Phones skip the banner: the gallery below opens on the same photo.
          display: { xs: "none", sm: "block" },
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

      <StaySummary
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        children={childrenCount}
        onChange={handleDateGuestChange}
      />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
        <Typography
          component="h1"
          sx={{ fontFamily: guestDisplayFontFamily, fontSize: { xs: "2.25rem", sm: "2.75rem" }, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.01em", color: sp.ink }}
        >
          {roomType.name}
        </Typography>
        {/* Phones already show the resort under the name in the top bar. */}
        <Typography sx={{ display: { xs: "none", sm: "block" }, mt: 0.75, fontSize: "0.9375rem", color: sp.muted }}>
          {property.name}
          {property.city ? ` · ${property.city}` : ""}
        </Typography>
        <RoomSpecs room={roomType} />

        <Box sx={{ mt: 3 }}>
          <MediaGallery photos={roomType.photos} videos={roomType.videos} name={roomType.name} />
        </Box>

        {facts.length > 0 && (
          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: `repeat(${Math.min(facts.length, 4)}, 1fr)` },
              gap: 1.25,
            }}
          >
            {facts.map((f) => (
              <Box key={f.label} sx={{ p: 1.75, borderRadius: "16px", border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft }}>
                <Box sx={{ color: sp.ink, "& svg": { fontSize: 22 } }}>{f.icon}</Box>
                <Typography sx={{ mt: 1, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: sp.muted }}>
                  {f.label}
                </Typography>
                <Typography sx={{ mt: 0.25, fontSize: "0.9375rem", lineHeight: 1.35, color: sp.ink }}>{f.value}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {roomType.description && (
          <Box component="section" sx={{ mt: 4 }}>
            <SectionTitle>About this room</SectionTitle>
            <ExpandableText text={roomType.description} lines={5} />
          </Box>
        )}

        {roomType.amenities?.length > 0 && <RoomAmenities amenities={roomType.amenities} />}

        {extras.length > 0 && (
          <Box component="section" sx={{ mt: 5 }}>
            <SectionTitle>Guests &amp; extras</SectionTitle>
            <Box>
              {extras.map((e) => (
                <Box
                  key={e.label}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1.75, borderTop: `1px solid ${sp.divider}`, "& > svg": { mt: 0.125, fontSize: 21, flexShrink: 0, color: sp.ink } }}
                >
                  {e.icon}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.4, color: sp.ink }}>{e.label}</Typography>
                    {e.detail && <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", color: sp.muted }}>{e.detail}</Typography>}
                  </Box>
                  {e.price && (
                    <Typography sx={{ flexShrink: 0, fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>{e.price}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {(checkInTime || checkOutTime || property.cancellationPolicy || property.pricesIncludeTax != null) && (
          <Box component="section" sx={{ mt: 5 }}>
            <SectionTitle>Good to know</SectionTitle>
            {(checkInTime || checkOutTime) && (
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1, mb: 2, fontSize: "0.9375rem", color: sp.ink }}>
                {checkInTime && (
                  <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, "& svg": { fontSize: 19 } }}>
                    <LoginOutlinedIcon /> Check-in from {checkInTime}
                  </Box>
                )}
                {checkOutTime && (
                  <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, "& svg": { fontSize: 19 } }}>
                    <LogoutOutlinedIcon /> Check-out by {checkOutTime}
                  </Box>
                )}
              </Box>
            )}
            {property.pricesIncludeTax != null && (
              <Typography sx={{ mb: 2, fontSize: "0.9375rem", color: sp.body }}>
                {property.pricesIncludeTax ? "Prices shown include all taxes." : "Taxes are added at checkout."}
              </Typography>
            )}
            {property.cancellationPolicy && (
              <>
                <SubTitle>Cancellation</SubTitle>
                <ExpandableText text={property.cancellationPolicy} lines={3} />
              </>
            )}
            <Box
              component={NextLink}
              href={`${buildHref(`/resorts/${property.slug}`)}#things-to-know`}
              sx={{ mt: 2, display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: "0.875rem", fontWeight: 600, color: sp.ink, textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              House rules &amp; all policies
              <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            mt: 5,
            position: "sticky",
            bottom: { xs: "calc(12px + env(safe-area-inset-bottom))", sm: 16 },
            zIndex: 2,
            borderRadius: "20px",
            border: `1px solid ${sp.border}`,
            bgcolor: "#fff",
            boxShadow: sp.cardShadowHover,
            px: 2.5,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={22} />
          ) : thisRoom && isBookable(thisRoom) ? (
            <Box sx={{ minWidth: 0 }}>
              <Box>
                {thisRoom.approvedRate && thisRoom.standardTotalPrice != null && (
                  <Typography component="span" sx={{ mr: 0.75, fontSize: "0.9375rem", color: sp.muted, textDecoration: "line-through" }}>
                    ₹{formatINR(thisRoom.standardTotalPrice)}
                  </Typography>
                )}
                <Typography component="span" sx={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.01em", color: sp.ink }}>
                  ₹{formatINR(stayTotal(thisRoom, extraBeds))}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.4, color: sp.muted }}>{stayPriceNote(thisRoom)}</Typography>
              {stayLabel && (
                <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", fontWeight: 600, color: sp.ink }}>{stayLabel}</Typography>
              )}
              {thisRoom.approvedRate ? (
                <Typography sx={{ mt: 0.25, fontSize: "0.75rem", fontWeight: 600, color: sp.blue }}>Special rate approved for you</Typography>
              ) : thisRoom.availableRooms > 0 && thisRoom.availableRooms <= 3 ? (
                <Typography sx={{ mt: 0.25, fontSize: "0.75rem", fontWeight: 600, color: "#b45309" }}>
                  {thisRoom.availableRooms === 1 ? "Last room left" : `Only ${thisRoom.availableRooms} left`} for these dates
                </Typography>
              ) : null}
            </Box>
          ) : shortOfRooms && thisRoom ? (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.3, color: sp.ink }}>Not enough rooms left</Typography>
              <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", lineHeight: 1.4, color: sp.muted }}>
                Your group needs {groupRooms} — only {thisRoom.availableRooms} free for these dates
              </Typography>
            </Box>
          ) : tooSmall ? (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.3, color: sp.ink }}>Too small for your group</Typography>
              {/* The party itself is in the stay summary at the top; this says what the room takes. */}
              <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", lineHeight: 1.4, color: sp.muted }}>
                Sleeps {partyLabel(roomType.capacityAdults, roomType.capacityChildren).replace(", ", " + ")}
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ fontSize: "0.9375rem", color: sp.muted }}>Not available for these dates</Typography>
          )}
          {!loading && !(thisRoom && isBookable(thisRoom)) ? (
            <Button
              variant="outlined"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{ ...bookButtonSx, bgcolor: "transparent", color: sp.ink, borderColor: sp.ink, "&:hover": { bgcolor: sp.bgSoft, borderColor: sp.ink } }}
            >
              {tooSmall ? "Edit guests" : "Change dates"}
            </Button>
          ) : (
            <Button
              component={NextLink}
              href={buildHref(`/resorts/${property.slug}/book`, {
                checkin: checkIn,
                checkout: checkOut,
                adults,
                children: childrenCount,
                room: roomType.id,
                beds: extraBeds > 0 ? extraBeds : null,
              })}
              variant="contained"
              disableElevation
              disabled={loading}
              sx={bookButtonSx}
            >
              {groupRooms > 1 ? `Book ${groupRooms} rooms` : "Book"}
            </Button>
          )}
        </Box>
      </Box>

      <AskAssistantDrawer
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
