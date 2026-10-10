'use client';

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { stayTotal, type PublicRoomType } from "../../lib/publicApi";
import { extraBedsLabel, groupRoomsLabel, roomsForParty } from "../../lib/party-rooms";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { VideoEmbed, isDirectVideo } from "./VideoEmbed";
import { trackListingClick } from "../../lib/attribution";
import { claimPlayback, releasePlayback } from "../../lib/videoPlayback";
import { sp, formatINR } from "./tokens";
import {
  RoomAmenityPreview,
  RoomCardFooter,
  RoomDescription,
  RoomDetailsLink,
  RoomName,
  RoomPhotoCarousel,
  RoomSpecs,
  bookButtonSx,
  photoPillSx,
  stayPriceNote,
  roomCardBodySx,
  roomCardShellSx,
} from "./roomCardParts";

type Props = {
  room: PublicRoomType;
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
  bookingSlug?: string;
  /** AI-generated room tour (direct mp4) — used when the owner hasn't uploaded a video. */
  tourUrl?: string | null;
  /** Dates/guests currently selected above — carried into the booking link
   *  once availability is confirmed, so /book never has to ask again. */
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  /** Set once this room is confirmed available for checkIn/checkOut — real
   *  price for those dates replaces the generic nightly rate. */
  availability?: {
    totalPrice: number;
    nights: number;
    /** Extra adults/children for the party picked above; added to the total shown. */
    occupancySurcharge?: number;
    /** Rooms of this type the party books, when one room can't hold it. */
    roomsNeeded?: number;
    /** Every room plus extra guests — the total shown when set. */
    totalPriceForParty?: number;
    /** One room with extra beds instead of several (party-rooms.ts). */
    oneRoomWithExtraBeds?: { extraBeds: number; totalPriceForParty: number };
    /** The beds this card is priced with — 0 for the several-room stay. */
    extraBeds?: number;
    /** Set when the owner approved a rate for this guest in WhatsApp — the
     *  standard total, struck through beside what they were actually
     *  promised. Without it the page quotes rack rate for a guest who
     *  negotiated, which reads as a bait-and-switch. */
    standardTotalPrice?: number;
    approvedRate?: boolean;
  } | null;
  /** Book now before availability is known: runs the same inline check as
   *  the date card above, instead of jumping straight into checkout unverified. */
  onBookNow?: (roomTypeId: string) => void;
  /** Book now once this room IS confirmed available — opens checkout for it
   *  right there on the page. Falls back to a /book link (via WhatsAppCTA's
   *  bookingSlug) only if a caller doesn't supply this. */
  onSelectRoom?: () => void;
  /** The room's own page (/resorts/:slug/rooms/:id), session-carrying. When
   *  set, the name, photo and "View details" open it — the description is
   *  clamped here, so the card must not be a dead end. */
  detailsHref?: string;
};

export function RoomCard({
  room,
  phoneNumber,
  propertyName,
  propertyId,
  bookingSlug,
  tourUrl,
  checkIn,
  checkOut,
  adults,
  availability,
  onBookNow,
  onSelectRoom,
  detailsHref,
}: Props) {
  const photos = room.photos ?? [];
  const roomVideo = (room.videos ?? []).find(isDirectVideo) ?? tourUrl ?? undefined;
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function startPreview() {
    if (!roomVideo || playingVideo) return;
    setPlayingVideo(true);
    trackListingClick({ propertyId, roomTypeId: room.id, action: "video_play" });
  }

  function stopPreview() {
    setPlayingVideo(false);
    if (videoRef.current) releasePlayback(videoRef.current);
  }

  function handleVideoMounted(video: HTMLVideoElement | null) {
    if (!video) return;
    claimPlayback(video);
    video.play().catch(() => {});
  }

  const stayLabel = availability
    ? availability.extraBeds
      ? extraBedsLabel(availability.extraBeds)
      : groupRoomsLabel(roomsForParty(availability))
    : null;
  const price = availability ? (
    <>
      <Box>
        {availability.approvedRate && availability.standardTotalPrice != null && (
          <Typography component="span" sx={{ mr: 0.75, fontSize: "0.9375rem", color: sp.muted, textDecoration: "line-through" }}>
            ₹{formatINR(availability.standardTotalPrice)}
          </Typography>
        )}
        <Typography component="span" sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink, letterSpacing: "-0.01em" }}>
          ₹{formatINR(stayTotal(availability, availability.extraBeds))}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>{stayPriceNote(availability)}</Typography>
      {stayLabel && (
        <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", fontWeight: 600, color: sp.ink }}>{stayLabel}</Typography>
      )}
      {availability.approvedRate && (
        <Typography sx={{ mt: 0.25, fontSize: "0.75rem", fontWeight: 600, color: sp.blue }}>
          Special rate approved for you
        </Typography>
      )}
    </>
  ) : (
    <>
      <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
        ₹{formatINR(Number(room.basePrice))}
      </Typography>
      <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>per night</Typography>
    </>
  );

  const action = availability ? (
    onSelectRoom ? (
      <Button variant="contained" disableElevation onClick={onSelectRoom} sx={bookButtonSx}>
        Book now
      </Button>
    ) : (
      <WhatsAppCTA
        phoneNumber={phoneNumber}
        propertyName={propertyName}
        roomName={room.name}
        propertyId={propertyId}
        roomTypeId={room.id}
        bookingSlug={bookingSlug}
        checkin={checkIn}
        checkout={checkOut}
        adults={adults}
        totalPrice={stayTotal(availability, availability.extraBeds)}
        label="Book now"
      />
    )
  ) : (
    <Button variant="contained" disableElevation onClick={() => onBookNow?.(room.id)} sx={bookButtonSx}>
      Book now
    </Button>
  );

  return (
    <Box component="article" sx={roomCardShellSx}>
      {(photos.length > 0 || roomVideo) && (
        <RoomPhotoCarousel
          photos={photos}
          alt={room.name}
          href={detailsHref}
          controlsHidden={playingVideo}
          onMouseEnter={startPreview}
          onMouseLeave={stopPreview}
        >
          {playingVideo && roomVideo && (
            <Box onClick={stopPreview} sx={{ position: "absolute", inset: 0, zIndex: 1, bgcolor: "#000", cursor: "pointer" }}>
              <VideoEmbed
                url={roomVideo}
                poster={photos[0]}
                muted
                loop
                videoRef={(el) => {
                  videoRef.current = el;
                  handleVideoMounted(el);
                }}
              />
            </Box>
          )}
          {roomVideo && !playingVideo && (
            <Box component="button" type="button" onClick={startPreview} sx={{ ...photoPillSx, pl: 0.75, cursor: "pointer" }}>
              <PlayArrowRoundedIcon sx={{ fontSize: 18 }} />
              Room tour
            </Box>
          )}
        </RoomPhotoCarousel>
      )}

      <Box sx={roomCardBodySx}>
        <RoomName name={room.name} href={detailsHref} />
        <RoomSpecs room={room} />
        {room.description && <RoomDescription text={room.description} />}
        <RoomAmenityPreview amenities={room.amenities ?? []} />
        {detailsHref && <RoomDetailsLink href={detailsHref} />}
        <RoomCardFooter price={price} action={action} />
      </Box>
    </Box>
  );
}
