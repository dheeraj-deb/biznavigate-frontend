import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { getAvailability, type AvailabilityResult } from "../../lib/publicApi";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { sp, formatINR } from "./tokens";

type Props = {
  slug: string;
  propertyId?: string;
  phoneNumber: string | null;
  propertyName: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialAdults?: number;
};

function formatShort(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const dateInputSx = {
  width: "100%",
  borderRadius: sp.radiusSm,
  border: `1px solid ${sp.borderSoft}`,
  bgcolor: "#fff",
  py: 1.25,
  px: 1.5,
  fontSize: "0.875rem",
  color: sp.ink,
  fontFamily: "inherit",
  "&:focus": { outline: "none", boxShadow: `0 0 0 2px rgba(31,87,214,0.3)` },
};

export function LiveRateChecker({
  slug,
  propertyId,
  phoneNumber,
  propertyName,
  initialCheckin,
  initialCheckout,
  initialAdults,
}: Props) {
  const [checkin, setCheckin] = useState(initialCheckin ?? "");
  const [checkout, setCheckout] = useState(initialCheckout ?? "");
  const adults = initialAdults ?? 2;
  const [results, setResults] = useState<AvailabilityResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  // True only when dates arrived pre-filled from a search-engine link (e.g.
  // Google's hotel price card), so we can label the panel accordingly.
  const [prefilled] = useState(Boolean(initialCheckin && initialCheckout));

  const today = new Date().toISOString().split("T")[0];

  async function handleSearch(ci = checkin, co = checkout) {
    if (!ci || !co || ci >= co) return;
    setError(null);
    setPending(true);
    try {
      const data = await getAvailability(slug, ci, co);
      setResults(data);
    } catch {
      setError("Could not fetch availability. Please try again.");
      setResults(null);
    } finally {
      setPending(false);
    }
  }

  // Auto-run once when dates arrive from the URL (Google passes checkin/
  // checkout/adults on click-through) so the guest never re-types what they
  // already told Google.
  useEffect(() => {
    if (initialCheckin && initialCheckout && initialCheckin < initialCheckout) {
      void handleSearch(initialCheckin, initialCheckout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, p: 3 }}>
      <Typography sx={{ mb: 2, fontSize: "1rem", fontWeight: 600, color: sp.ink }}>
        {prefilled
          ? `Your stay · ${formatShort(checkin)} – ${formatShort(checkout)} · ${adults} adult${adults !== 1 ? "s" : ""}`
          : "Check availability & rates"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
        <Box component="label" sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 0.75 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: sp.muted }}>Check-in</Typography>
          <Box
            component="input"
            type="date"
            min={today}
            value={checkin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckin(e.target.value);
              setResults(null);
            }}
            sx={dateInputSx}
          />
        </Box>

        <Box component="label" sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 0.75 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: sp.muted }}>Check-out</Typography>
          <Box
            component="input"
            type="date"
            min={checkin || today}
            value={checkout}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckout(e.target.value);
              setResults(null);
            }}
            sx={dateInputSx}
          />
        </Box>

        <Button
          onClick={() => void handleSearch()}
          disabled={!checkin || !checkout || checkin >= checkout || pending}
          disableElevation
          sx={{
            mt: "auto",
            height: 44,
            px: 3,
            borderRadius: sp.radiusSm,
            bgcolor: sp.blue,
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: 600,
            alignSelf: { sm: "flex-end" },
            "&:hover": { bgcolor: "#1a4ab8" },
            "&.Mui-disabled": { bgcolor: sp.blue, color: "#fff", opacity: 0.5 },
          }}
          startIcon={pending ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : undefined}
        >
          Check
        </Button>
      </Box>

      {error && (
        <Typography sx={{ mt: 1.5, fontSize: "0.875rem", color: "#dc2626" }}>{error}</Typography>
      )}

      {results !== null && (
        <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {results.length === 0 ? (
            <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
              No rooms available for those dates.
            </Typography>
          ) : (
            results.map((r) => (
              <Box
                key={r.roomTypeId}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                  borderRadius: sp.radiusSm,
                  border: `1px solid ${sp.border}`,
                  bgcolor: "#fff",
                  px: 2,
                  py: 1.5,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
                    {r.name}
                  </Typography>
                  {r.available ? (
                    <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>
                      {r.nights} night{r.nights !== 1 ? "s" : ""} ·{" "}
                      <Box component="span" sx={{ fontWeight: 500, color: sp.ink }}>
                        ₹{formatINR(r.pricePerNight)}/night
                      </Box>{" "}
                      · Total ₹{formatINR(r.totalPrice)}
                      {r.availableRooms > 0 && r.availableRooms <= 3 && (
                        <Box component="span" sx={{ ml: 1, fontWeight: 500, color: "#c2410c" }}>
                          Only {r.availableRooms} left
                        </Box>
                      )}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: "0.75rem", color: "#ef4444" }}>Not available</Typography>
                  )}
                </Box>
                {r.available && (
                  <WhatsAppCTA
                    phoneNumber={phoneNumber}
                    propertyName={propertyName}
                    roomName={r.name}
                    checkin={checkin}
                    checkout={checkout}
                    adults={adults}
                    totalPrice={r.totalPrice}
                    propertyId={propertyId}
                    roomTypeId={r.roomTypeId}
                    label="Book now"
                  />
                )}
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}
