"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import {
  useBookingFlowParams,
  useSearchParamsSnapshot,
  useHydrated,
  readCurrentBookingFlowParams,
} from "@/lib/booking-flow-url";
import { getCheckoutStatus, type CheckoutStatus } from "@/lib/checkout-status-api";

// Capture settles on a webhook, not on this redirect, so PENDING on arrival is
// normal rather than a problem. A short poll covers the usual gap; past that we
// stop claiming anything and point at the thread, where the confirmation lands
// either way.
const POLL_MS = 2000;
const MAX_POLLS = 10;

function waHref(number: string | null | undefined, text: string): string | null {
  if (!number) return null;
  const digits = `91${number.replace(/\D/g, "").slice(-10)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function BookedView({
  propertyName,
  whatsappNumber = null,
}: {
  propertyName: string;
  /** The resort's WhatsApp number — a request has no checkout to read it from. */
  whatsappNumber?: string | null;
}) {
  const searchParams = useSearchParamsSnapshot();
  const params = useBookingFlowParams();
  const hydrated = useHydrated();
  const checkoutId = searchParams.get("cs");
  // The booking code of a request sent to a resort that approves bookings
  // itself. Nothing was paid, so there is no checkout to look up.
  const requestedCode = checkoutId ? null : searchParams.get("requested");

  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [polled, setPolled] = useState(false);
  const pollsRef = useRef(0);

  // Derived rather than seeded from `checkoutId`, because the page is
  // prerendered: the hydration render always reads an empty query string, so a
  // guest arriving with a real `cs` would otherwise be shown the finished
  // screen before the first status call went out. Until the query string has
  // actually been read, nothing is settled.
  const settled = hydrated && (checkoutId ? polled : true);

  useEffect(() => {
    // From the address bar - a mount-once effect sees empty params on the
    // hydration render, and the event queue drops everything without a token.
    bookingLinkEvents.setToken(readCurrentBookingFlowParams().s);
    const query = new URLSearchParams(window.location.search);
    // Only a guest coming back from the payment page has returned from one.
    if (query.get("cs")) {
      bookingLinkEvents.track("payment_returned", { checkoutId: query.get("cs") });
    }
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
        setPolled(true);
        return;
      }
      if (pollsRef.current >= MAX_POLLS) {
        setPolled(true);
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
  const wa = waHref(
    status?.booking?.whatsappNumber,
    name ? `Hi, I've just completed my booking at ${name}.` : "Hi, I've just completed my booking.",
  );
  const waiting = !settled && !paid;

  if (hydrated && requestedCode) {
    return (
      <RequestSent
        code={requestedCode}
        propertyName={propertyName}
        wa={waHref(whatsappNumber, `Hi, I've just sent a booking request (${requestedCode}) for ${propertyName}.`)}
      />
    );
  }

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

/**
 * A resort that approves each booking has the guest's request and is holding
 * the room; nothing has been charged. The guest tapped a button and needs to
 * hear exactly that — what was sent, that it cost nothing yet, and where the
 * answer will arrive.
 */
function RequestSent({ code, propertyName, wa }: { code: string; propertyName: string; wa: string | null }) {
  return (
    <Box sx={{ mx: "auto", maxWidth: 560, px: { xs: 2, sm: 3 }, py: { xs: 6, sm: 10 }, textAlign: "center" }}>
      <MarkChatReadOutlinedIcon sx={{ fontSize: 56, color: sp.blue }} />
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
        Request sent
      </Typography>
      <Typography sx={{ mt: 1.5, fontSize: "1rem", lineHeight: 1.7, color: sp.body }}>
        <strong>{propertyName}</strong> confirms each booking itself. We&apos;re holding your room and
        will message you on WhatsApp as soon as they reply — with a link to pay if it&apos;s a yes.
        Nothing has been charged.
      </Typography>
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
        <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: sp.muted }}>REQUEST</Typography>
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: sp.ink }}>{code}</Typography>
        <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>Not paid yet</Typography>
      </Box>
      {wa && (
        <Box>
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
        </Box>
      )}
    </Box>
  );
}
