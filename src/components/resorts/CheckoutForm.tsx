"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import OptimizedImage from "@/components/OptimizedImage";
import { ExpandableText } from "@/components/smartpages/DetailSections";
import { bedsLabel, mealPlanLabel, sizeLabel } from "@/lib/roomFacts";
import { formatTime } from "@/lib/formatTime";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import {
  createPublicBooking,
  fetchBookingQuote,
  type BookingQuote,
} from "@/lib/public-booking-api";
import { getStoredRef } from "@/lib/attribution";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import { getLiveAddons, partyLabel, type AvailabilityResult, type PropertyAddon, type PublicRoomType } from "@/lib/publicApi";

type Props = {
  slug: string;
  availability: AvailabilityResult;
  addons: PropertyAddon[];
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  /** Ages already known (the URL, or given in WhatsApp) — one per child. */
  initialChildAges?: number[] | null;
  /** Told whenever every child has an age (or not), so the page can keep it. */
  onChildAgesChange?: (ages: number[] | null) => void;
  sessionToken: string | null;
  initialGuest: { name: string | null; phone: string | null; email: string | null } | null;
  onClose: () => void;
  /** For the stay summary at the top (photo, meals). Optional: the form works without it. */
  room?: PublicRoomType;
  /** Shown just above Pay — the last thing a guest should read before paying. */
  cancellationPolicy?: string | null;
  /** The resort's times ("14:00"), shown beside the check-in / check-out days. */
  checkInTime?: string | null;
  checkOutTime?: string | null;
};

/** "2026-09-29" → "Tue, 29 Sept", read as the calendar day it names (no timezone shift). */
function stayDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

/** Mirrors the server's normaliser: a leading 0 is a trunk prefix, and 10 digits is a full Indian mobile. */
function phoneLooksComplete(raw: string): boolean {
  return raw.replace(/\D/g, "").replace(/^0+/, "").length >= 10;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fff",
    fontSize: "0.9375rem",
    "& fieldset": { borderColor: sp.borderSoft },
    "&:hover:not(.Mui-error):not(.Mui-focused) fieldset": { borderColor: sp.muted },
    // An error stays red while focused — the guest is fixing it, not done.
    "&.Mui-focused:not(.Mui-error) fieldset": { borderColor: sp.ink, borderWidth: 1 },
  },
  "& .MuiInputLabel-root.Mui-focused:not(.Mui-error)": { color: sp.ink },
  "& .MuiFormHelperText-root": { mx: 0.5 },
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Typography sx={{ mb: 1.5, fontSize: "1rem", fontWeight: 600, color: sp.ink }}>{children}</Typography>;
}

function addonUnitPrice(addon: PropertyAddon, nights: number, guestCount: number): number {
  if (addon.priceUnit === "PER_NIGHT") return addon.price * nights;
  if (addon.priceUnit === "PER_GUEST") return addon.price * Math.max(1, guestCount);
  return addon.price;
}

function addonUnitLabel(addon: PropertyAddon): string {
  if (addon.priceUnit === "PER_NIGHT") return "/night";
  if (addon.priceUnit === "PER_GUEST") return "/guest";
  return "/stay";
}

/** One line of the price breakdown. `value` null prints the label alone. */
function PriceRow({ label, value, muted, strike }: { label: string; value: number | null; muted?: boolean; strike?: number | null }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 2, py: 0.5 }}>
      <Typography sx={{ fontSize: "0.9375rem", color: muted ? sp.muted : sp.body }}>{label}</Typography>
      {value != null && (
        <Typography sx={{ flexShrink: 0, fontSize: "0.9375rem", color: muted ? sp.muted : sp.ink }}>
          {strike != null && (
            <Box component="span" sx={{ mr: 0.75, color: sp.muted, textDecoration: "line-through" }}>
              ₹{formatINR(strike)}
            </Box>
          )}
          {value < 0 ? `−₹${formatINR(-value)}` : `₹${formatINR(value)}`}
        </Typography>
      )}
    </Box>
  );
}

export function CheckoutForm({
  slug,
  availability,
  addons: cachedAddons,
  checkIn,
  checkOut,
  adults,
  children,
  initialChildAges,
  onChildAgesChange,
  sessionToken,
  initialGuest,
  onClose,
  room,
  cancellationPolicy,
  checkInTime,
  checkOutTime,
}: Props) {
  // Field errors show only after the guest tries to pay — not while typing.
  const [attempted, setAttempted] = useState(false);

  // Start from the page's (cached) list so nothing flickers, then swap in the
  // live one — see getLiveAddons. A failed fetch just keeps the cached list.
  const [addons, setAddons] = useState<PropertyAddon[]>(cachedAddons);
  const [name, setName] = useState(initialGuest?.name ?? "");
  const [phone, setPhone] = useState(initialGuest?.phone ?? "");
  const [email, setEmail] = useState(initialGuest?.email ?? "");
  const [notes, setNotes] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  useEffect(() => {
    const ac = new AbortController();
    getLiveAddons(slug, ac.signal)
      .then((live) => {
        setAddons(live);
        // Drop picks for extras that no longer exist, so they aren't sent.
        setQuantities((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => live.some((a) => a.id === id))));
      })
      .catch(() => {});
    return () => ac.abort();
  }, [slug]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Children's ages, asked only where young children stay free — the price
  // depends on them there and nowhere else. One slot per child; "" = not yet.
  const freeAge = room?.freeChildAgeMax ?? null;
  const asksAges = freeAge != null && children > 0;
  const [ageSlots, setAgeSlots] = useState<string[]>(() =>
    Array.from({ length: children }, (_, i) =>
      initialChildAges?.length === children ? String(initialChildAges[i]) : "",
    ),
  );
  // The party can change under an open checkout; keep one slot per child.
  const [slotsFor, setSlotsFor] = useState(children);
  if (slotsFor !== children) {
    setSlotsFor(children);
    setAgeSlots((prev) => Array.from({ length: children }, (_, i) => prev[i] ?? ""));
  }
  const childAges = useMemo(
    () => (asksAges && ageSlots.length === children && ageSlots.every((a) => a !== "") ? ageSlots.map(Number) : null),
    [asksAges, ageSlots, children],
  );
  const childAgesKey = childAges?.join(",") ?? "";
  const agesError = asksAges && !childAges ? "Choose each child's age — children up to " + freeAge + " stay free" : null;

  function setAge(index: number, value: string) {
    const next = ageSlots.map((a, i) => (i === index ? value : a));
    setAgeSlots(next);
    onChildAgesChange?.(next.every((a) => a !== "") ? next.map(Number) : null);
  }

  const guestCount = adults + children;

  // The ids as the server wants them: a repeated id is quantity > 1.
  const addonIds = useMemo(
    () => addons.flatMap((addon) => Array(quantities[addon.id] ?? 0).fill(addon.id) as string[]),
    [addons, quantities],
  );

  // Every rupee on this screen comes from the server. This form used to add
  // the extras up itself and show `availability.totalPrice + addonsTotal`,
  // which is a PRE-TAX subtotal — on a tax-exclusive property that quoted
  // ₹14,500 for a booking created at ₹17,110, under a button that said
  // "Pay ₹14,500" before sending the guest to a page asking ₹3,422.
  const [quote, setQuote] = useState<BookingQuote | null>(null);
  const [quoting, setQuoting] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [payChoice, setPayChoice] = useState<"FULL" | "DEPOSIT" | null>(null);

  const addonKey = addonIds.join(",");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Every extra the guest ticks re-prices the stay: an extra can change the
    // total, and on a cheaper room it can change the GST band too. Only the
    // server knows both rules.
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    // Inside the debounce, not before it: a call that is about to be
    // superseded by the next keystroke should not flash a spinner, and
    // setState in an effect body cascades renders.
    const timer = setTimeout(() => {
      setQuoting(true);
      fetchBookingQuote(
        slug,
        {
          roomTypeId: availability.roomTypeId,
          checkIn,
          checkOut,
          adults,
          children,
          childAges: childAgesKey ? childAgesKey.split(",").map(Number) : undefined,
          sessionToken: sessionToken ?? undefined,
          addonIds: addonKey ? addonKey.split(",") : undefined,
        },
        ac.signal,
      )
        .then((q) => {
          setQuote(q);
          setQuoteError(null);
          // Follow the server's default until the guest says otherwise.
          setPayChoice((prev) => prev ?? q.paymentOptions.find((o) => o.isDefault)?.kind ?? "FULL");
        })
        .catch((e: unknown) => {
          if (ac.signal.aborted) return;
          setQuoteError(e instanceof Error ? e.message : "Could not price this stay.");
        })
        .finally(() => {
          if (!ac.signal.aborted) setQuoting(false);
        });
    }, 250);
    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [slug, availability.roomTypeId, checkIn, checkOut, adults, children, childAgesKey, sessionToken, addonKey]);

  const selectedOption =
    quote?.paymentOptions.find((o) => o.kind === payChoice) ?? quote?.paymentOptions[0] ?? null;
  const dueNow = selectedOption?.dueNow ?? null;

  function setQuantity(addon: PropertyAddon, next: number) {
    const clamped = Math.max(0, Math.min(addon.maxQuantity, next));
    setQuantities((prev) => ({ ...prev, [addon.id]: clamped }));
    if (clamped > 0) bookingLinkEvents.track("addon_selected", { addonId: addon.id, quantity: clamped });
  }

  const nameError = !name.trim() ? "Enter the name the booking is under" : null;
  const phoneError = !phone.trim()
    ? "Enter a WhatsApp number"
    : !phoneLooksComplete(phone)
      ? "That number looks too short — include all 10 digits"
      : null;
  const emailError = email.trim() && !EMAIL.test(email.trim()) ? "That email doesn't look right" : null;

  async function submit() {
    if (submitting) return;
    setAttempted(true);
    if (agesError || nameError || phoneError || emailError) {
      // Take the guest to the first field that needs them.
      const first = agesError
        ? "checkout-child-age-0"
        : nameError
          ? "checkout-name"
          : phoneError
            ? "checkout-phone"
            : "checkout-email";
      const el = document.getElementById(first);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    setSubmitting(true);
    setError(null);
    bookingLinkEvents.track("checkout_started");
    try {
      const storedRef = getStoredRef();
      const result = await createPublicBooking(slug, {
        roomTypeId: availability.roomTypeId,
        checkIn,
        checkOut,
        adults,
        children,
        childAges: childAges ?? undefined,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        notes: notes.trim() || undefined,
        src: "guest_booking_flow",
        // Read at submit, not at mount: the guest may have landed on the
        // creator's link in another tab of the same visit, and this is the
        // last moment before the code stops being recoverable.
        ref: storedRef?.code,
        refSeenAt: storedRef?.firstSeenAt,
        sessionToken: sessionToken ?? undefined,
        addonIds: addonIds.length ? addonIds : undefined,
        // What the guest actually chose on the summary above. The server
        // clamps it to the property's policy.
        paymentChoice: payChoice ?? undefined,
      });
      if (result.requiresPayment && result.checkout) {
        bookingLinkEvents.track("payment_redirected");
        bookingLinkEvents.flush();
        window.location.href = result.checkout.shortUrl;
        return;
      }
      // No payment required — booking is confirmed outright.
      window.location.href = `/resorts/${slug}?booked=1`;
    } catch (e) {
      bookingLinkEvents.track("checkout_failed");
      setError(e instanceof Error ? e.message : "Could not complete booking — please try again.");
      setSubmitting(false);
    }
  }

  const meal = mealPlanLabel(room?.mealPlan);
  const inTime = formatTime(checkInTime);
  const outTime = formatTime(checkOutTime);
  const beds = bedsLabel(room?.beds);
  const size = sizeLabel(room?.roomSizeSqft);
  const stayDetails: { label: string; icon: React.ReactNode; value: string; sub?: string; wide?: boolean }[] = [
    { label: "Check-in", icon: <LoginOutlinedIcon />, value: stayDay(checkIn), sub: inTime ? `From ${inTime}` : undefined },
    { label: "Check-out", icon: <LogoutOutlinedIcon />, value: stayDay(checkOut), sub: outTime ? `By ${outTime}` : undefined },
    {
      label: "Guests",
      icon: <PeopleAltOutlinedIcon />,
      value: partyLabel(adults, children),
      sub: `${adults + children} guest${adults + children !== 1 ? "s" : ""}`,
    },
    {
      label: "Stay",
      icon: <NightsStayOutlinedIcon />,
      value: `${availability.nights} night${availability.nights !== 1 ? "s" : ""}`,
      sub: "1 room",
    },
    ...(beds || size
      ? [{ label: "Room", icon: <BedOutlinedIcon />, value: [beds, size].filter(Boolean).join(" · "), wide: true }]
      : []),
  ];
  const photo = room?.photos?.[0];
  const extraAdults = room?.baseOccupancy != null ? Math.max(0, adults - room.baseOccupancy) : 0;
  // With ages in hand, only the children who pay are named.
  const payingChildren = childAges && freeAge != null ? childAges.filter((a) => a > freeAge).length : children;
  const extraGuestsLabel = [
    extraAdults > 0 ? `${extraAdults} adult${extraAdults !== 1 ? "s" : ""}` : null,
    payingChildren > 0 ? `${payingChildren} ${payingChildren === 1 ? "child" : "children"}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: "20px",
        border: `1px solid ${sp.border}`,
        bgcolor: "#fff",
        boxShadow: sp.cardShadow,
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* What they're booking, first — the thing a guest double-checks before typing anything. */}
      <Box sx={{ display: "flex", gap: 1.75, alignItems: "flex-start" }}>
        {photo && (
          <Box sx={{ flexShrink: 0, width: 76, height: 76, borderRadius: "14px", overflow: "hidden", bgcolor: sp.border }}>
            <OptimizedImage src={photo} alt={availability.name} sizes="76px" sx={{ width: "100%", height: "100%" }} />
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontFamily: guestDisplayFontFamily, fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.1, color: sp.ink }}>
            {availability.name}
          </Typography>
          {meal && (
            <Box component="span" sx={{ mt: 0.5, display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: "0.8125rem", fontWeight: 600, color: sp.whatsappText }}>
              <FreeBreakfastOutlinedIcon sx={{ fontSize: 15 }} />
              {meal}
            </Box>
          )}
        </Box>
        <Box
          component="button"
          type="button"
          onClick={onClose}
          sx={{ flexShrink: 0, p: 0, border: 0, bgcolor: "transparent", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600, color: sp.ink, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}
        >
          Change
        </Box>
      </Box>

      {/* The booking, spelled out: what the guest is agreeing to pay for. */}
      <Box
        component="dl"
        sx={{
          m: 0,
          mt: 2,
          p: 1.75,
          borderRadius: "14px",
          bgcolor: sp.bgSoft,
          border: `1px solid ${sp.border}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 2,
          rowGap: 1.75,
        }}
      >
        {stayDetails.map((d) => (
          <Box key={d.label} sx={{ minWidth: 0, gridColumn: d.wide ? "1 / -1" : "auto" }}>
            <Box component="dt" sx={{ display: "flex", alignItems: "center", gap: 0.625, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: sp.muted, "& svg": { fontSize: 15 } }}>
              {d.icon}
              {d.label}
            </Box>
            <Box component="dd" sx={{ m: 0, mt: 0.375, fontSize: "0.9375rem", fontWeight: 500, lineHeight: 1.35, color: sp.ink }}>
              {d.value}
            </Box>
            {d.sub && <Box sx={{ fontSize: "0.8125rem", lineHeight: 1.35, color: sp.muted }}>{d.sub}</Box>}
          </Box>
        ))}
      </Box>

      {availability.approvedRate && (
        <Typography sx={{ mt: 1.5, fontSize: "0.8125rem", fontWeight: 600, color: sp.blue }}>Special rate approved by the property</Typography>
      )}

      {asksAges && (
        <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${sp.divider}` }}>
          <SectionLabel>{children === 1 ? "Child's age" : "Children's ages"}</SectionLabel>
          <Typography sx={{ mt: -0.75, mb: 1.5, fontSize: "0.875rem", color: sp.muted }}>
            Children up to {freeAge} stay free — the price below updates once you choose.
          </Typography>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" } }}>
            {ageSlots.map((age, i) => (
              <TextField
                key={i}
                id={`checkout-child-age-${i}`}
                select
                label={children === 1 ? "Age" : `Child ${i + 1}`}
                value={age}
                onChange={(e) => setAge(i, e.target.value)}
                error={attempted && age === ""}
                slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                sx={fieldSx}
              >
                <option value="">Choose</option>
                {Array.from({ length: 18 }, (_, a) => (
                  <option key={a} value={a}>
                    {a === 0 ? "Under 1" : `${a} year${a === 1 ? "" : "s"}`}
                  </option>
                ))}
              </TextField>
            ))}
          </Box>
          {attempted && agesError && (
            <Typography sx={{ mt: 1, fontSize: "0.8125rem", color: "#dc2626" }}>{agesError}</Typography>
          )}
        </Box>
      )}

      <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${sp.divider}` }}>
        <SectionLabel>Your details</SectionLabel>
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
          <TextField
            id="checkout-name"
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            error={attempted && !!nameError}
            helperText={attempted ? nameError : undefined}
            sx={fieldSx}
          />
          <TextField
            id="checkout-phone"
            label="WhatsApp number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
            inputProps={{ inputMode: "tel" }}
            required
            error={attempted && !!phoneError}
            helperText={attempted && phoneError ? phoneError : "Your confirmation arrives here"}
            sx={fieldSx}
          />
          <TextField
            id="checkout-email"
            label="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            inputProps={{ inputMode: "email" }}
            error={attempted && !!emailError}
            helperText={attempted && emailError ? emailError : "For your receipt"}
            sx={fieldSx}
          />
          <TextField
            label="Special requests (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Arrival time, dietary needs, a celebration…"
            multiline
            minRows={1}
            maxRows={4}
            sx={fieldSx}
          />
        </Box>
      </Box>

      {addons.length > 0 && (
        <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${sp.divider}` }}>
          <SectionLabel>Add to your stay</SectionLabel>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {addons.map((addon) => {
              const qty = quantities[addon.id] ?? 0;
              const unitPrice = addonUnitPrice(addon, availability.nights, guestCount);
              const toggle = addon.maxQuantity === 1;
              return (
                <Box
                  key={addon.id}
                  component={toggle ? "button" : "div"}
                  type={toggle ? "button" : undefined}
                  onClick={toggle ? () => setQuantity(addon, qty > 0 ? 0 : 1) : undefined}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "inherit",
                    cursor: toggle ? "pointer" : "default",
                    borderRadius: "14px",
                    border: `1px solid ${qty > 0 ? sp.ink : sp.border}`,
                    bgcolor: qty > 0 ? sp.bgSoft : "#fff",
                    px: 1.75,
                    py: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                    {toggle && (
                      <Checkbox
                        size="small"
                        checked={qty > 0}
                        tabIndex={-1}
                        sx={{ p: 0, color: sp.borderSoft, "&.Mui-checked": { color: sp.ink } }}
                      />
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: "0.9375rem", color: sp.ink, fontWeight: 500 }}>{addon.name}</Typography>
                      <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>
                        ₹{formatINR(addon.price)} {addonUnitLabel(addon)}
                        {addon.description ? ` · ${addon.description}` : ""}
                      </Typography>
                    </Box>
                  </Box>

                  {addon.maxQuantity > 1 ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                      <IconButton aria-label={`Fewer ${addon.name}`} size="small" onClick={() => setQuantity(addon, qty - 1)} disabled={qty <= 0} sx={{ border: `1px solid ${sp.borderSoft}`, width: 32, height: 32 }}>
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography sx={{ width: 18, textAlign: "center", fontSize: "0.9375rem", fontWeight: 600 }}>{qty}</Typography>
                      <IconButton aria-label={`More ${addon.name}`} size="small" onClick={() => setQuantity(addon, qty + 1)} disabled={qty >= addon.maxQuantity} sx={{ border: `1px solid ${sp.borderSoft}`, width: 32, height: 32 }}>
                        <AddIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ) : qty > 0 ? (
                    <Typography sx={{ flexShrink: 0, fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>+₹{formatINR(unitPrice)}</Typography>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Every figure here is the server's (fetchBookingQuote), itemised, so
          the guest sees what they pay for BEFORE paying it. */}
      <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${sp.divider}` }}>
        <SectionLabel>Price details</SectionLabel>

        {quoteError && <Typography sx={{ fontSize: "0.875rem", color: "#dc2626" }}>{quoteError}</Typography>}

        {!quote && !quoteError && (
          <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={22} />
          </Box>
        )}

        {quote && (
          <>
            <PriceRow
              label={`₹${formatINR(quote.lines.room.perNight)} × ${quote.nights} night${quote.nights !== 1 ? "s" : ""}`}
              value={quote.lines.room.subtotal}
              strike={quote.lines.room.approvedRate ? quote.lines.room.standardSubtotal : null}
            />
            {quote.lines.occupancySurcharge > 0 && (
              <PriceRow label={`Extra guests${extraGuestsLabel ? ` (${extraGuestsLabel})` : ""}`} value={quote.lines.occupancySurcharge} />
            )}
            {quote.lines.occupancySurcharge < 0 && (
              <PriceRow label="1 guest price" value={quote.lines.occupancySurcharge} />
            )}
            {quote.lines.extras.map((x) => (
              <PriceRow key={x.id} label={x.quantity > 1 ? `${x.name} × ${x.quantity}` : x.name} value={x.subtotal} />
            ))}
            {quote.tax.rate > 0 && !quote.tax.pricesIncludeTax && (
              <>
                <PriceRow label="Subtotal" value={quote.subtotal} />
                <PriceRow label={`GST (${quote.tax.rate}%)`} value={quote.tax.amount} />
              </>
            )}
            <Box sx={{ mt: 1.25, pt: 1.5, borderTop: `1px solid ${sp.divider}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: sp.ink }}>Total</Typography>
              <Typography sx={{ fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.01em", color: sp.ink }}>₹{formatINR(quote.total)}</Typography>
            </Box>
            {quote.tax.rate > 0 && quote.tax.pricesIncludeTax && (
              <Typography sx={{ textAlign: "right", fontSize: "0.8125rem", color: sp.muted }}>
                Includes ₹{formatINR(Math.round(quote.tax.amount))} GST ({quote.tax.rate}%)
              </Typography>
            )}

            {/* A deposit is the property's policy, not a trap: the guest can
                always choose to be done with it instead. */}
            {quote.paymentOptions.length > 1 && (
              <Box sx={{ mt: 2.5 }}>
                <Typography sx={{ mb: 1, fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>How would you like to pay?</Typography>
                <Box role="radiogroup" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {quote.paymentOptions.map((opt) => {
                    const selected = payChoice === opt.kind;
                    return (
                      <Box
                        key={opt.kind}
                        component="button"
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setPayChoice(opt.kind)}
                        sx={{
                          textAlign: "left",
                          fontFamily: "inherit",
                          cursor: "pointer",
                          borderRadius: "14px",
                          border: `1px solid ${selected ? sp.ink : sp.border}`,
                          boxShadow: selected ? `inset 0 0 0 1px ${sp.ink}` : "none",
                          bgcolor: "#fff",
                          p: 1.75,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.25,
                        }}
                      >
                        {selected ? (
                          <RadioButtonCheckedRoundedIcon sx={{ fontSize: 22, color: sp.ink, flexShrink: 0 }} />
                        ) : (
                          <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 22, color: sp.borderSoft, flexShrink: 0 }} />
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>
                            {opt.kind === "FULL" ? "Pay in full now" : "Pay a deposit now"}
                          </Typography>
                          {opt.balance > 0 && (
                            <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.45, color: sp.muted }}>
                              {/* Paid on arrival day: a link that morning, or at the
                                  desk. Not a deadline, so no "by". */}
                              ₹{formatINR(opt.balance)} due on check-in day
                              {opt.balanceDueAt
                                ? ` (${new Date(opt.balanceDueAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    timeZone: "UTC",
                                  })})`
                                : ""}
                              , online or at the resort
                            </Typography>
                          )}
                        </Box>
                        <Typography sx={{ flexShrink: 0, fontSize: "1rem", fontWeight: 700, color: sp.ink }}>₹{formatINR(opt.dueNow)}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>

      {cancellationPolicy && (
        <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${sp.divider}`, display: "flex", gap: 1.5 }}>
          <EventBusyOutlinedIcon sx={{ mt: 0.25, fontSize: 21, flexShrink: 0, color: sp.ink }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ mb: 0.5, fontSize: "1rem", fontWeight: 600, color: sp.ink }}>Cancellation policy</Typography>
            <ExpandableText text={cancellationPolicy} lines={3} />
          </Box>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 2.5, p: 1.5, borderRadius: "12px", bgcolor: "#fef2f2", border: "1px solid #fecaca" }}>
          <Typography sx={{ fontSize: "0.875rem", color: "#b91c1c" }}>{error}</Typography>
        </Box>
      )}

      {/* Pinned to the bottom of the screen on phones, so Pay is always one
          thumb away however long the extras list runs. */}
      <Box
        sx={{
          position: { xs: "sticky", sm: "static" },
          bottom: 0,
          zIndex: 2,
          mt: 3,
          mx: { xs: -2, sm: 0 },
          mb: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          pt: { xs: 1.5, sm: 0 },
          pb: { xs: "calc(12px + env(safe-area-inset-bottom))", sm: 0 },
          bgcolor: "#fff",
          borderTop: { xs: `1px solid ${sp.divider}`, sm: "none" },
          borderRadius: { xs: "0 0 20px 20px", sm: 0 },
        }}
      >
        {/* Enabled even with fields empty: tapping it says what's missing,
            where a greyed-out button just looks broken. */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => void submit()}
          disabled={submitting || quoting || !quote}
          sx={{
            height: 52,
            borderRadius: 999,
            bgcolor: sp.blue,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#1a4ab8" },
            "&.Mui-disabled": { bgcolor: sp.blue, color: "#fff", opacity: 0.6 },
          }}
        >
          {submitting || quoting ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : dueNow != null ? (
            `Pay ₹${formatINR(dueNow)}`
          ) : (
            "Pay"
          )}
        </Button>
        <Typography
          sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, fontSize: "0.75rem", color: sp.muted, textAlign: "center" }}
        >
          <LockOutlinedIcon sx={{ fontSize: 13 }} />
          Secure payment · Confirmation on WhatsApp
        </Typography>
      </Box>
    </Box>
  );
}
