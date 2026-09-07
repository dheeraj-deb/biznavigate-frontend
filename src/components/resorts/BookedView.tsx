"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { useBookingFlowParams } from "@/lib/booking-flow-url";
import { getCheckoutStatus, type CheckoutStatus } from "@/lib/checkout-status-api";

// Capture settles on a webhook, not on this redirect, so PENDING on arrival is
// normal rather than a problem. A short poll covers the usual gap; past that we
// stop claiming anything and point at the thread, where the confirmation lands
// either way.
const POLL_MS = 2000;
const MAX_POLLS = 10;

function waHref(number: string | null | undefined, propertyName: string | null): string | null {
  if (!number) return null;
  const digits = `91${number.replace(/\D/g, "").slice(-10)}`;
  const text = propertyName
    ? `Hi, I've just completed my booking at ${propertyName}.`
    : "Hi, I've just completed my booking.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function BookedView({ propertyName }: { propertyName: string }) {
  const searchParams = useSearchParams();
  const params = useBookingFlowParams();
  const checkoutId = searchParams.get("cs");

  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [settled, setSettled] = useState(!checkoutId);
  const pollsRef = useRef(0);

  useEffect(() => {
    bookingLinkEvents.setToken(params.s);
    bookingLinkEvents.track("payment_returned", { checkoutId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!checkoutId) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    async function poll() {
      const next = await getCheckoutStatus(checkoutId!);
      if (!alive) return;
      if (next) setStatus(next);
      pollsRef.current += 1;
      if (next && next.status !== "PENDING") {
        setSettled(true);
        return;
      }
      if (pollsRef.current >= MAX_POLLS) {
        setSettled(true);
        return;
      }
      timer = setTimeout(() => void poll(), POLL_MS);
    }

    void poll();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [checkoutId]);

  const paid = status?.status === "PAID";
  const failed = status?.status === "CANCELLED" || status?.status === "EXPIRED";
  const name = status?.booking?.propertyName ?? propertyName;
  const wa = waHref(status?.booking?.whatsappNumber, name);
  const waiting = !settled && !paid;

  return (
    <Box sx={{ mx: "auto", maxWidth: 560, px: { xs: 2, sm: 3 }, py: { xs: 6, sm: 10 }, textAlign: "center" }}>
      {waiting ? (
        <CircularProgress size={34} sx={{ color: sp.blue }} />
      ) : failed ? (
        <ErrorOutlineIcon sx={{ fontSize: 56, color: "#dc2626" }} />
      ) : (
        <CheckCircleIcon sx={{ fontSize: 56, color: paid ? "#16a34a" : sp.muted }} />
      )}

      <Typography
        component="h1"
        sx={{
          mt: 2,
          fontFamily: guestDisplayFontFamily,
          fontSize: { xs: "1.75rem", sm: "2.125rem" },
          lineHeight: 1.15,
          color: sp.ink,
        }}
      >
        {paid
          ? "You're booked"
          : failed
            ? "That payment didn't go through"
            : waiting
              ? "Confirming your payment…"
              : "Almost there"}
      </Typography>

      <Typography sx={{ mt: 1.5, fontSize: "1rem", lineHeight: 1.7, color: sp.body }}>
        {paid ? (
          <>
            Your stay at <strong>{name}</strong> is confirmed. We&apos;ve sent the details to
            your WhatsApp — you can close this page.
          </>
        ) : failed ? (
          <>
            Nothing has been charged. Message us on WhatsApp and we&apos;ll sort it out or
            send you a fresh payment link.
          </>
        ) : (
          <>
            This can take a few seconds. Whatever happens here, your confirmation is on
            its way to your WhatsApp — you can close this page safely.
          </>
        )}
      </Typography>

      {paid && status?.booking?.code && (
        <Box
          sx={{
            mt: 3,
            display: "inline-flex",
            flexDirection: "column",
            gap: 0.5,
            borderRadius: sp.radiusSm,
            border: `1px solid ${sp.border}`,
            bgcolor: sp.bgSoft,
            px: 3,
            py: 2,
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: sp.muted }}>
            BOOKING
          </Typography>
          <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink }}>
            {status.booking.code}
          </Typography>
          {typeof status.amount === "number" && (
            <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
              ₹{formatINR(status.amount)} paid
            </Typography>
          )}
        </Box>
      )}

      {wa && (
        <Button
          href={wa}
          variant="contained"
          startIcon={<WhatsAppIcon />}
          sx={{
            mt: 4,
            borderRadius: 9999,
            px: 3,
            py: 1.25,
            bgcolor: "#25D366",
            "&:hover": { bgcolor: "#1da851" },
            fontWeight: 600,
          }}
        >
          Back to WhatsApp
        </Button>
      )}
    </Box>
  );
}
