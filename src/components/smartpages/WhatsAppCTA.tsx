import React from "react";
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

export function buildWhatsAppUrl(props: Props): string {
  const { phoneNumber, propertyName, roomName, checkin, checkout, adults, totalPrice, intentContext, source } = props;
  const number =
    phoneNumber
      ? `91${phoneNumber.replace(/\D/g, "").slice(-10)}`
      : process.env.REACT_APP_WHATSAPP_DEFAULT ?? "919999999999";

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
    // Intent pages: mention what the guest was searching for so Riya AI has context.
    text = `Hi! I found ${propertyName} for ${intentContext}. Can I get more details?`;
  } else {
    text = `Hi! I'm interested in booking at ${propertyName}. Can you help?`;
  }

  // Lightweight source tag for the AI agent / staff — visible context, not
  // hidden tracking. Full click attribution is logged separately (see
  // trackListingClick) before this link is opened.
  if (source) text += ` (via ${source})`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppCTA(props: Props) {
  const { roomName, variant = "solid", label, propertyId, roomTypeId, fullWidth, analyticsAction } = props;
  const href = buildWhatsAppUrl(props);
  const text = label ?? (roomName ? "Book on WhatsApp" : "Book via WhatsApp");

  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackListingClick({ propertyId, roomTypeId, action: analyticsAction ?? "book_whatsapp" })}
      startIcon={<WhatsAppIcon sx={{ fontSize: 18 }} />}
      fullWidth={fullWidth}
      disableElevation
      sx={{
        borderRadius: "12px",
        px: 2.5,
        py: 1.25,
        fontSize: "0.875rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        ...(variant === "solid"
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
