"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { sp } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";

/**
 * Shown where the checkout form would be when the resort can't take online
 * payments yet (its Cashfree account isn't active, so the server refuses the
 * checkout). Telling the guest before she types her details beats letting her
 * fill the form and fail at "Pay".
 */
export function OnlineBookingUnavailable({
  propertyName,
  roomName,
  phone,
  onClose,
}: {
  propertyName: string;
  roomName: string;
  phone: string | null;
  onClose: () => void;
}) {
  const waText = encodeURIComponent(
    `Hi, I'd like to book the ${roomName} at ${propertyName}.`,
  );
  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: sp.radius,
        border: `1px solid ${sp.border}`,
        bgcolor: "#fff",
        boxShadow: sp.cardShadowHover,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: sp.muted }}>
            Book directly
          </Typography>
          <Typography sx={{ mt: 0.25, fontFamily: guestDisplayFontFamily, fontSize: "1.5rem", fontWeight: 400, color: sp.ink }}>
            {roomName}
          </Typography>
        </Box>
        <Button onClick={onClose} size="small" sx={{ color: sp.muted }}>
          Close
        </Button>
      </Box>
      <Typography sx={{ mt: 1.5, fontSize: "0.9rem", lineHeight: 1.6, color: sp.body }}>
        {propertyName} isn&apos;t taking online bookings yet.{" "}
        {phone
          ? "Message them on WhatsApp and they'll confirm your stay and how to pay."
          : "Contact the resort directly to book this stay."}
      </Typography>
      {phone ? (
        <Button
          component="a"
          href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          disableElevation
          sx={{
            mt: 2,
            borderRadius: "12px",
            fontWeight: 600,
            bgcolor: sp.whatsapp,
            "&:hover": { bgcolor: sp.whatsappDark },
          }}
        >
          Message on WhatsApp
        </Button>
      ) : null}
    </Box>
  );
}
