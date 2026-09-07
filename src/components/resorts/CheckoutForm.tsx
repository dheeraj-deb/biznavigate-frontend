"use client";

import { useMemo, useState } from "react";
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
import { createPublicBooking } from "@/lib/public-booking-api";
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

  const addonsTotal = useMemo(
    () =>
      addons.reduce((sum, addon) => {
        const qty = quantities[addon.id] ?? 0;
        return sum + addonUnitPrice(addon, availability.nights, guestCount) * qty;
      }, 0),
    [addons, quantities, availability.nights, guestCount],
  );
  const grandTotal = availability.totalPrice + addonsTotal;

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
      const addonIds = addons.flatMap((addon) =>
        Array(quantities[addon.id] ?? 0).fill(addon.id),
      );
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
        sessionToken: sessionToken ?? undefined,
        addonIds: addonIds.length ? addonIds : undefined,
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

      <Box
        sx={{
          borderRadius: sp.radiusSm,
          bgcolor: sp.bgSoft,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
          {availability.nights} night{availability.nights !== 1 ? "s" : ""} · {checkIn} – {checkOut}
          {addonsTotal > 0 && ` + extras`}
          {/* The guest was promised a number in WhatsApp; this is where they
              confirm it is the number they are about to pay. */}
          {availability.approvedRate && (
            <Box component="span" sx={{ display: "block", mt: 0.25, fontWeight: 600, color: sp.blue }}>
              Special rate approved by the property
            </Box>
          )}
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          {availability.approvedRate && availability.standardTotalPrice != null && (
            <Typography sx={{ fontSize: "0.875rem", color: sp.muted, textDecoration: "line-through" }}>
              ₹{formatINR(availability.standardTotalPrice + addonsTotal)}
            </Typography>
          )}
          <Typography sx={{ fontSize: "1.125rem", fontWeight: 700, color: sp.ink }}>
            ₹{formatINR(grandTotal)}
          </Typography>
        </Box>
      </Box>

      {error && (
        <Typography sx={{ mt: 1.5, fontSize: "0.8125rem", color: "#dc2626" }}>{error}</Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={submit}
        disabled={!name.trim() || !phone.trim() || submitting}
        sx={{ mt: 2, borderRadius: 9999, bgcolor: sp.blue, "&:hover": { bgcolor: sp.blue }, py: 1.25 }}
      >
        {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : `Pay ₹${formatINR(grandTotal)}`}
      </Button>
    </Box>
  );
}
