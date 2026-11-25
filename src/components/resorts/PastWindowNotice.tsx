"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sp } from "@/components/smartpages/tokens";

/** "30 Nov 2026". */
export function windowDay(day: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${day}T00:00:00Z`));
}

/** True when the resort isn't taking bookings for this check-in yet. */
export function pastBookingWindow(bookableUntil: string | null | undefined, checkIn: string): boolean {
  return !!bookableUntil && !!checkIn && checkIn > bookableUntil;
}

/**
 * Dates past how far ahead the resort takes bookings (its booking window).
 * Never "unavailable" — that reads as sold out. It says how far ahead is
 * open, and sends the guest to the resort's WhatsApp, where the assistant
 * takes their dates, tells them when they open, and the owner hears.
 */
export function PastWindowNotice({
  bookableUntil,
  checkIn,
  checkOut,
  whatsappNumber,
  propertyName,
}: {
  bookableUntil: string;
  checkIn: string;
  checkOut: string;
  whatsappNumber: string | null;
  propertyName: string;
}) {
  const closed = bookableUntil < new Date().toISOString().slice(0, 10);
  const digits = whatsappNumber?.replace(/\D/g, "") ?? "";
  const text = `Hi, I'd like to stay at ${propertyName} from ${windowDay(checkIn)} to ${windowDay(checkOut)}.`;
  return (
    <Box
      role="status"
      sx={{ borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, p: { xs: 3, sm: 4 }, textAlign: "center" }}
    >
      <Typography sx={{ color: sp.ink, fontWeight: 600 }}>
        {closed
          ? `${propertyName} isn't taking new bookings right now`
          : `We're taking bookings for check-ins up to ${windowDay(bookableUntil)}`}
      </Typography>
      <Typography sx={{ mt: 0.5, fontSize: "0.875rem", color: sp.muted }}>
        {digits
          ? "Message us on WhatsApp with your dates. We'll let you know as soon as they open."
          : "Pick an earlier check-in, or contact the resort about these dates."}
      </Typography>
      {digits ? (
        <Button
          variant="contained"
          size="small"
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${digits}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2, textTransform: "none", fontWeight: 600, boxShadow: "none" }}
        >
          Ask about these dates
        </Button>
      ) : null}
    </Box>
  );
}
