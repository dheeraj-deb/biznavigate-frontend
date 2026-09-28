"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { sp, formatINR } from "@/components/smartpages/tokens";
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
} from "@/components/smartpages/roomCardParts";
import { stayTotal, type AvailabilityResult, type PublicRoomType } from "@/lib/publicApi";

type Props = {
  availability: AvailabilityResult;
  roomType: PublicRoomType | undefined;
  viewHref: string;
  onBook: () => void;
  /** "2 adults, 1 child" — named when the room is too small for it. */
  party?: string;
};

/** At or below this many rooms left, the card says so — above it, the count is noise. */
const SCARCITY_THRESHOLD = 3;

/**
 * A room on /book once dates are picked: the same card as on the Stay page
 * (RoomCard), with the real total for the stay and a single Book action. The
 * room's own page is reached from its name, photo or "View room details".
 */
export function RoomAvailabilityCard({ availability, roomType, viewHref, onBook, party }: Props) {
  const photos = roomType?.photos ?? [];
  const { availableRooms } = availability;
  const tooSmall = availability.available && availability.fitsParty === false;
  const available = availability.available && !tooSmall;
  const scarce = available && availableRooms > 0 && availableRooms <= SCARCITY_THRESHOLD;

  const price = available ? (
    <>
      <Box>
        {availability.approvedRate && availability.standardTotalPrice != null && (
          <Typography component="span" sx={{ mr: 0.75, fontSize: "0.9375rem", color: sp.muted, textDecoration: "line-through" }}>
            ₹{formatINR(availability.standardTotalPrice)}
          </Typography>
        )}
        <Typography component="span" sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink, letterSpacing: "-0.01em" }}>
          ₹{formatINR(stayTotal(availability))}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>{stayPriceNote(availability)}</Typography>
      {availability.approvedRate && (
        <Typography sx={{ mt: 0.25, fontSize: "0.75rem", fontWeight: 600, color: sp.blue }}>
          Special rate approved for you
        </Typography>
      )}
    </>
  ) : tooSmall ? (
    <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.5, color: sp.muted }}>
      Too small for {party ?? "your group"}
    </Typography>
  ) : (
    <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>Not available for these dates</Typography>
  );

  return (
    <Box component="article" sx={roomCardShellSx}>
      <RoomPhotoCarousel photos={photos} alt={availability.name} href={viewHref}>
        {!available && (
          <Box sx={{ position: "absolute", inset: 0, zIndex: 1, bgcolor: "rgba(255,255,255,0.45)", pointerEvents: "none" }} />
        )}
        {(scarce || !available) && (
          <Box sx={{ ...photoPillSx, pointerEvents: "none" }}>
            <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: available ? "#d97706" : sp.muted }} />
            {available
              ? availableRooms === 1
                ? "Last room left"
                : `Only ${availableRooms} left`
              : tooSmall
                ? "Doesn't fit your group"
                : "Sold out"}
          </Box>
        )}
      </RoomPhotoCarousel>

      <Box sx={roomCardBodySx}>
        <RoomName name={availability.name} href={viewHref} />
        {roomType && <RoomSpecs room={roomType} />}
        {roomType?.description && <RoomDescription text={roomType.description} />}
        <RoomAmenityPreview amenities={roomType?.amenities ?? []} />
        <RoomDetailsLink href={viewHref} />
        <RoomCardFooter
          price={price}
          action={
            <Button variant="contained" disableElevation disabled={!available} onClick={onBook} sx={bookButtonSx}>
              {available ? "Book" : tooSmall ? "Too small" : "Sold out"}
            </Button>
          }
        />
      </Box>
    </Box>
  );
}
