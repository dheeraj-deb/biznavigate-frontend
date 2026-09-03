"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import type { AvailabilityResult, PublicRoomType } from "@/lib/publicApi";

type Props = {
  availability: AvailabilityResult;
  roomType: PublicRoomType | undefined;
  viewHref: string;
  onBook: () => void;
};

export function RoomAvailabilityCard({ availability, roomType, viewHref, onBook }: Props) {
  const photo = roomType?.photos?.[0];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        borderRadius: sp.radius,
        border: `1px solid ${sp.border}`,
        bgcolor: "#fff",
        overflow: "hidden",
        boxShadow: sp.cardShadow,
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: 220 }, height: { xs: 160, sm: "auto" }, flexShrink: 0, bgcolor: sp.border }}>
        {photo ? (
          <OptimizedImage src={photo} alt={availability.name} width="100%" height="100%" />
        ) : null}
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
          <Box>
            <Typography sx={{ fontFamily: guestDisplayFontFamily, fontSize: "1.25rem", fontWeight: 400, color: sp.ink }}>
              {availability.name}
            </Typography>
            {roomType && (
              <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", color: sp.muted }}>
                Sleeps {roomType.capacityAdults} adult{roomType.capacityAdults !== 1 ? "s" : ""}
                {roomType.capacityChildren ? ` + ${roomType.capacityChildren} children` : ""}
              </Typography>
            )}
          </Box>
          {availability.available ? (
            <Box
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                bgcolor: "rgba(34,197,94,0.1)",
                color: "#16a34a",
                fontSize: "0.75rem",
                fontWeight: 600,
                px: 1.25,
                py: 0.5,
              }}
            >
              {availability.availableRooms} left
            </Box>
          ) : (
            <Box
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                bgcolor: sp.chipBg,
                color: sp.muted,
                fontSize: "0.75rem",
                fontWeight: 600,
                px: 1.25,
                py: 0.5,
              }}
            >
              Sold out
            </Box>
          )}
        </Box>

        {roomType?.description && (
          <Typography sx={{ fontSize: "0.875rem", color: sp.body, lineHeight: 1.6 }}>
            {roomType.description}
          </Typography>
        )}

        <Box sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 1 }}>
          <Box>
            {availability.available && (
              <Typography sx={{ fontSize: "1rem" }}>
                <Box component="span" sx={{ fontWeight: 700, color: sp.ink }}>
                  ₹{formatINR(availability.totalPrice)}
                </Box>{" "}
                <Box component="span" sx={{ fontSize: "0.8125rem", color: sp.muted }}>
                  for {availability.nights} night{availability.nights !== 1 ? "s" : ""}
                </Box>
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={NextLink}
              href={viewHref}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 9999 }}
            >
              View room
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={!availability.available}
              onClick={onBook}
              sx={{ borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: sp.blue } }}
            >
              Book
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
