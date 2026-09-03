'use client';

import React from "react";
import NextLink from "next/link";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { trackListingClick } from "../../lib/attribution";
import { sp, formatINR } from "./tokens";

type Props = {
  phoneNumber: string | null;
  propertyName: string;
  roomName?: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
  totalPrice?: number;
  intentContext?: string;
  source?: string;
  propertyId?: string;
  roomTypeId?: string;
  /** When set, CTA opens /resorts/:slug/book (this same app) instead of WhatsApp. */
  bookingSlug?: string;
  /** Booking-link session token, carried forward into /book so identity/prefill survive the click. */
  sessionToken?: string | null;
  variant?: "solid" | "outline";
  label?: string;
  fullWidth?: boolean;
  /** Overrides the ListingClick action string (default "book_whatsapp") — e.g. "story_cta". */
  analyticsAction?: string;
};

function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// The booking flow lives in this same app now (/resorts/:slug/book) — see
// docs/guest-experience-handoff.md, Phase C. Always a same-site relative
// link, never an external booking.* domain.
function buildBookingUrl(props: Props): string | null {
  if (!props.bookingSlug) return null;
  const params = new URLSearchParams();
  if (props.sessionToken) params.set("s", props.sessionToken);
  if (props.checkin) params.set("checkin", props.checkin);
  if (props.checkout) params.set("checkout", props.checkout);
  if (props.adults) params.set("adults", String(props.adults));
  if (props.roomTypeId) params.set("room", props.roomTypeId);
  const qs = params.toString();
  return `/resorts/${props.bookingSlug}/book${qs ? `?${qs}` : ""}`;
}

export function buildWhatsAppUrl(props: Props): string {
  const { phoneNumber, propertyName, roomName, checkin, checkout, adults, totalPrice, intentContext, source } = props;
  const number =
    phoneNumber
      ? `91${phoneNumber.replace(/\D/g, "").slice(-10)}`
      : process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT ?? "919999999999";

  const ci = formatDate(checkin);
  const co = formatDate(checkout);

  let text: string;
  if (ci && co && roomName) {
    const guestPart = adults ? `, ${adults} adult${adults !== 1 ? "s" : ""}` : "";
    const pricePart = totalPrice ? ` — ₹${formatINR(totalPrice)} total` : "";
    text = `Hi, I'd like to book the ${roomName} at ${propertyName}, ${ci}–${co}${guestPart}${pricePart}. Please confirm and hold the room.`;
  } else if (roomName) {
    text = `Hi! I'm interested in ${roomName} at ${propertyName}. Is it available?`;
  } else if (intentContext) {
    text = `Hi! I found ${propertyName} for ${intentContext}. Can I get more details?`;
  } else {
    text = `Hi! I'm interested in booking at ${propertyName}. Can you help?`;
  }

  if (source) text += ` (via ${source})`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppCTA(props: Props) {
  const {
    roomName,
    variant = "solid",
    label,
    propertyId,
    roomTypeId,
    fullWidth,
    analyticsAction,
  } = props;
  const bookingHref = buildBookingUrl(props);
  const href = bookingHref ?? buildWhatsAppUrl(props);
  const text =
    label ??
    (bookingHref
      ? roomName
        ? "Book now"
        : "Continue to book"
      : roomName
        ? "Book on WhatsApp"
        : "Book via WhatsApp");

  return (
    <Button
      component={bookingHref ? NextLink : "a"}
      href={href}
      target={bookingHref ? undefined : "_blank"}
      rel={bookingHref ? undefined : "noopener noreferrer"}
      onClick={() =>
        trackListingClick({
          propertyId,
          roomTypeId,
          action: analyticsAction ?? (bookingHref ? "book_page" : "book_whatsapp"),
        })
      }
      startIcon={bookingHref ? undefined : <WhatsAppIcon sx={{ fontSize: 18 }} />}
      fullWidth={fullWidth}
      disableElevation
      sx={{
        borderRadius: "12px",
        px: 2.5,
        py: 1.25,
        fontSize: "0.875rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        ...(bookingHref
          ? variant === "solid"
            ? {
                bgcolor: sp.blue,
                color: "#fff",
                "&:hover": { bgcolor: "#1a4ab8" },
              }
            : {
                border: `1px solid ${sp.blue}`,
                color: sp.blue,
                "&:hover": { bgcolor: "#edf2fd" },
              }
          : variant === "solid"
            ? {
                bgcolor: sp.whatsapp,
                color: "#fff",
                "&:hover": { bgcolor: sp.whatsappDark },
              }
            : {
                border: `1px solid ${sp.whatsapp}`,
                color: sp.whatsappText,
                "&:hover": { bgcolor: "#f0fdf4" },
              }),
      }}
    >
      {text}
    </Button>
  );
}
