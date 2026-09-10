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
import { sp, formatINR } from "@/components/smartpages/tokens";
import { guestDisplayFontFamily } from "@/lib/guestTheme";
import {
  createPublicBooking,
  fetchBookingQuote,
  type BookingQuote,
} from "@/lib/public-booking-api";
import { getStoredRef } from "@/lib/attribution";
import { bookingLinkEvents } from "@/lib/booking-link-events";
import type { AvailabilityResult, PropertyAddon } from "@/lib/publicApi";

type Props = {
  slug: string;
  availability: AvailabilityResult;
  addons: PropertyAddon[];
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  sessionToken: string | null;
  initialGuest: { name: string | null; phone: string | null; email: string | null } | null;
  onClose: () => void;
};

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

/** One line of the price breakdown. `value` null prints the label alone —
 *  used for "Includes 18% GST", where the amount is already in the total. */
function PriceRow({ label, value, muted }: { label: string; value: number | null; muted?: boolean }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 0.25 }}>
      <Typography sx={{ fontSize: "0.8125rem", color: muted ? sp.muted : sp.ink }}>{label}</Typography>
      {value != null && (
        <Typography sx={{ fontSize: "0.8125rem", color: muted ? sp.muted : sp.ink }}>
          ₹{formatINR(value)}
        </Typography>
      )}
    </Box>
  );
}

export function CheckoutForm({
  slug,
  availability,
  addons,
  checkIn,
  checkOut,
  adults,
  children,
  sessionToken,
  initialGuest,
  onClose,
}: Props) {
  const [name, setName] = useState(initialGuest?.name ?? "");
  const [phone, setPhone] = useState(initialGuest?.phone ?? "");
  const [email, setEmail] = useState(initialGuest?.email ?? "");
  const [notes, setNotes] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [slug, availability.roomTypeId, checkIn, checkOut, adults, children, sessionToken, addonKey]);

  const selectedOption =
    quote?.paymentOptions.find((o) => o.kind === payChoice) ?? quote?.paymentOptions[0] ?? null;
  const dueNow = selectedOption?.dueNow ?? null;

  function setQuantity(addon: PropertyAddon, next: number) {
    const clamped = Math.max(0, Math.min(addon.maxQuantity, next));
    setQuantities((prev) => ({ ...prev, [addon.id]: clamped }));
    if (clamped > 0) bookingLinkEvents.track("addon_selected", { addonId: addon.id, quantity: clamped });
  }

  async function submit() {
    if (!name.trim() || !phone.trim() || submitting) return;
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: sp.muted }}>
            Confirm your details
          </Typography>
          <Typography sx={{ mt: 0.25, fontFamily: guestDisplayFontFamily, fontSize: "1.5rem", fontWeight: 400, color: sp.ink }}>
            {availability.name}
          </Typography>
        </Box>
        <Button onClick={onClose} size="small" sx={{ color: sp.muted }}>
          Cancel
        </Button>
      </Box>

      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 2 }}>
        <TextField label="Full name" size="small" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Phone (WhatsApp)" size="small" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <TextField label="Email (optional)" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Notes (optional)" size="small" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Box>

      {addons.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: "0.8125rem", fontWeight: 600, color: sp.ink }}>Extras</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {addons.map((addon) => {
              const qty = quantities[addon.id] ?? 0;
              const unitPrice = addonUnitPrice(addon, availability.nights, guestCount);
              return (
                <Box
                  key={addon.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: sp.radiusSm,
                    border: `1px solid ${sp.border}`,
                    px: 1.5,
                    py: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                    {addon.maxQuantity === 1 ? (
                      <Checkbox
                        size="small"
                        checked={qty > 0}
                        onChange={(e) => setQuantity(addon, e.target.checked ? 1 : 0)}
                        sx={{ p: 0.5 }}
                      />
                    ) : null}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: "0.875rem", color: sp.ink, fontWeight: 500 }}>{addon.name}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>
                        ₹{formatINR(addon.price)} {addonUnitLabel(addon)}
                        {addon.description ? ` · ${addon.description}` : ""}
                      </Typography>
                    </Box>
                  </Box>

                  {addon.maxQuantity > 1 ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
                      <IconButton size="small" onClick={() => setQuantity(addon, qty - 1)} disabled={qty <= 0} sx={{ border: `1px solid ${sp.border}`, width: 26, height: 26 }}>
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography sx={{ width: 16, textAlign: "center", fontSize: "0.8125rem", fontWeight: 600 }}>{qty}</Typography>
                      <IconButton size="small" onClick={() => setQuantity(addon, qty + 1)} disabled={qty >= addon.maxQuantity} sx={{ border: `1px solid ${sp.border}`, width: 26, height: 26 }}>
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ) : qty > 0 ? (
                    <Typography sx={{ flexShrink: 0, fontSize: "0.8125rem", fontWeight: 600, color: sp.ink }}>
                      +₹{formatINR(unitPrice)}
                    </Typography>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Every line here is the server's, itemised, so the guest can see what
          they are paying for BEFORE they pay it. */}
      <Box sx={{ borderRadius: sp.radiusSm, bgcolor: sp.bgSoft, p: 2 }}>
        <Typography sx={{ fontSize: "0.875rem", color: sp.muted, mb: 1 }}>
          {availability.nights} night{availability.nights !== 1 ? "s" : ""} · {checkIn} – {checkOut}
          {availability.approvedRate && (
            <Box component="span" sx={{ display: "block", mt: 0.25, fontWeight: 600, color: sp.blue }}>
              Special rate approved by the property
            </Box>
          )}
        </Typography>

        {quoteError && (
          <Typography sx={{ fontSize: "0.8125rem", color: "#dc2626" }}>{quoteError}</Typography>
        )}

        {quote && (
          <>
            <PriceRow label={`${quote.roomName}`} value={quote.lines.room.subtotal} />
            {quote.lines.occupancySurcharge > 0 && (
              <PriceRow label="Extra guests" value={quote.lines.occupancySurcharge} />
            )}
            {quote.lines.extras.map((x) => (
              <PriceRow
                key={x.id}
                label={x.quantity > 1 ? `${x.name} × ${x.quantity}` : x.name}
                value={x.subtotal}
              />
            ))}
            {quote.tax.rate > 0 && (
              <>
                <PriceRow label="Subtotal" value={quote.subtotal} />
                <PriceRow
                  label={
                    quote.tax.pricesIncludeTax
                      ? `Includes ${quote.tax.rate}% GST`
                      : `GST (${quote.tax.rate}%)`
                  }
                  value={quote.tax.pricesIncludeTax ? null : quote.tax.amount}
                  muted
                />
              </>
            )}
            <Box sx={{ height: "1px", bgcolor: sp.border, my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>Total</Typography>
              <Box sx={{ textAlign: "right" }}>
                {quote.lines.room.approvedRate && quote.lines.room.standardSubtotal != null && (
                  <Typography sx={{ fontSize: "0.8125rem", color: sp.muted, textDecoration: "line-through" }}>
                    ₹{formatINR(quote.lines.room.standardSubtotal)}
                  </Typography>
                )}
                <Typography sx={{ fontSize: "1.125rem", fontWeight: 700, color: sp.ink }}>
                  ₹{formatINR(quote.total)}
                </Typography>
              </Box>
            </Box>

            {/* A deposit is the property's policy, not a trap: the guest can
                always choose to be done with it instead. */}
            {quote.paymentOptions.length > 1 && (
              <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}>
                {quote.paymentOptions.map((opt) => (
                  <Box
                    key={opt.kind}
                    component="button"
                    type="button"
                    onClick={() => setPayChoice(opt.kind)}
                    sx={{
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: sp.radiusSm,
                      border: `1px solid ${payChoice === opt.kind ? sp.blue : sp.border}`,
                      bgcolor: payChoice === opt.kind ? "rgba(37,99,235,0.04)" : "#fff",
                      p: 1.25,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
                        {opt.kind === "FULL" ? "Pay in full now" : "Pay a deposit now"}
                      </Typography>
                      {opt.balance > 0 && (
                        <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>
                          ₹{formatINR(opt.balance)} due later
                          {opt.balanceDueAt
                            ? ` · by ${new Date(opt.balanceDueAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}`
                            : ""}
                        </Typography>
                      )}
                    </Box>
                    <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, color: sp.ink }}>
                      ₹{formatINR(opt.dueNow)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      {error && (
        <Typography sx={{ mt: 1.5, fontSize: "0.8125rem", color: "#dc2626" }}>{error}</Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={submit}
        disabled={!name.trim() || !phone.trim() || submitting || quoting || !quote}
        sx={{ mt: 2, borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: sp.blue }, py: 1.25 }}
      >
        {submitting || quoting ? (
          <CircularProgress size={20} sx={{ color: "#fff" }} />
        ) : dueNow != null ? (
          `Pay ₹${formatINR(dueNow)}`
        ) : (
          "Pay"
        )}
      </Button>
    </Box>
  );
}
