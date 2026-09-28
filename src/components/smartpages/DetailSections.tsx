'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import type { ResortDetail, PublicFaq } from "../../lib/publicApi";
import { formatTime } from "../../lib/formatTime";
import { flexibilityNote, guestRuleItems } from "../../lib/guestRuleItems";
import { sp } from "./tokens";
import { guestDisplayFontFamily } from "../../lib/guestTheme";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{ mb: 2, fontFamily: guestDisplayFontFamily, fontSize: "1.625rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: sp.ink }}
    >
      {children}
    </Typography>
  );
}

/** A small bold heading inside a section ("Getting here", "House rules"). */
export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="h3" sx={{ mb: 1, fontSize: "1rem", fontWeight: 600, color: sp.ink }}>
      {children}
    </Typography>
  );
}

const READ_MORE_AT = 220;

/** Owner-written prose, clamped when long, with a Read more that opens it in place. */
export function ExpandableText({ text, lines = 4 }: { text: string; lines?: number }) {
  const [open, setOpen] = useState(false);
  const long = text.length > READ_MORE_AT;
  return (
    <>
      <Typography
        sx={{
          fontSize: "0.9375rem",
          lineHeight: 1.7,
          color: sp.body,
          whiteSpace: "pre-line",
          ...(long && !open ? { display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}),
        }}
      >
        {text}
      </Typography>
      {long && (
        <Box component="button" type="button" onClick={() => setOpen((o) => !o)} sx={textButtonSx}>
          {open ? "Show less" : "Read more"}
        </Box>
      )}
    </>
  );
}

const textButtonSx = {
  mt: 0.75,
  p: 0,
  border: 0,
  bgcolor: "transparent",
  fontFamily: "inherit",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: sp.ink,
  textDecoration: "underline",
  textUnderlineOffset: 3,
  cursor: "pointer",
} as const;

const pillLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  height: 42,
  px: 2,
  borderRadius: 999,
  border: `1px solid ${sp.borderSoft}`,
  bgcolor: "#fff",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: sp.ink,
  textDecoration: "none",
  whiteSpace: "nowrap",
  "& svg": { fontSize: 18 },
  "&:hover": { borderColor: sp.ink, textDecoration: "none" },
} as const;

/** "+919000012345" → "+91 90000 12345"; anything else as typed. */
function formatPhone(phone: string): string {
  const m = /^\+91(\d{5})(\d{5})$/.exec(phone.replace(/\s+/g, ""));
  return m ? `+91 ${m[1]} ${m[2]}` : phone;
}

export function LocationSection({
  property,
  directions,
}: {
  property: Pick<ResortDetail, "address" | "city" | "region" | "postalCode" | "country" | "latitude" | "longitude" | "phone"> &
    Partial<Pick<ResortDetail, "email" | "directions">>;
  /** Kept for callers that pass directions separately (IntentPageView). */
  directions?: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const hasCoords = property.latitude != null && property.longitude != null;
  const address = [property.address, property.city, property.region, property.postalCode].filter(Boolean).join(", ");
  const area = [property.city, property.region ?? property.country].filter(Boolean).join(", ");
  const gettingHere = (directions ?? property.directions)?.trim();
  const destination = hasCoords ? `${property.latitude},${property.longitude}` : address;
  if (!address && !hasCoords && !gettingHere) return null;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is on screen to select by hand */
    }
  }

  return (
    <Box component="section" sx={{ mt: 6 }}>
      <SectionTitle>Where you&apos;ll be</SectionTitle>
      {area && <Typography sx={{ mt: -1, mb: 2, fontSize: "0.9375rem", color: sp.muted }}>{area}</Typography>}

      {hasCoords && (
        <Box sx={{ position: "relative", borderRadius: "20px", overflow: "hidden", border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft }}>
          <Box
            component="iframe"
            title="Property location map"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sx={{ display: "block", width: "100%", height: { xs: 220, sm: 300 }, border: 0 }}
          />
        </Box>
      )}

      {address && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start", gap: 1.25 }}>
          <PlaceOutlinedIcon sx={{ mt: 0.25, fontSize: 20, flexShrink: 0, color: sp.ink }} />
          <Typography sx={{ flex: 1, fontSize: "0.9375rem", lineHeight: 1.6, color: sp.ink }}>{address}</Typography>
          <Box
            component="button"
            type="button"
            onClick={() => void copyAddress()}
            aria-label="Copy address"
            sx={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              p: 0.5,
              border: 0,
              bgcolor: "transparent",
              fontFamily: "inherit",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: copied ? sp.whatsappText : sp.muted,
              cursor: "pointer",
            }}
          >
            {copied ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />}
            {copied ? "Copied" : "Copy"}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, max-content)" },
          gap: 1,
          // Directions is the one most guests want: full width on phones, the rest share a row under it.
          "& > :first-of-type": { gridColumn: { xs: "1 / -1", sm: "auto" } },
          // Only one of Call / Email: it takes the whole row rather than half of it.
          "& > :nth-of-type(2):last-of-type": { gridColumn: { xs: "1 / -1", sm: "auto" } },
          "& > a": { justifyContent: "center" },
        }}
      >
        {destination && (
          <Link
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...pillLinkSx, bgcolor: sp.ink, borderColor: sp.ink, color: "#fff", "&:hover": { bgcolor: "#1b3159", textDecoration: "none" } }}
          >
            <DirectionsOutlinedIcon />
            Get directions
          </Link>
        )}
        {property.phone && (
          <Link href={`tel:${property.phone.replace(/\s+/g, "")}`} sx={pillLinkSx} aria-label={`Call ${formatPhone(property.phone)}`}>
            <CallOutlinedIcon />
            Call
          </Link>
        )}
        {property.email && (
          <Link href={`mailto:${property.email}`} sx={pillLinkSx} aria-label={`Email ${property.email}`}>
            <MailOutlineIcon />
            Email
          </Link>
        )}
      </Box>

      {gettingHere && (
        <Box sx={{ mt: 3 }}>
          <SubTitle>Getting here</SubTitle>
          <ExpandableText text={gettingHere} />
        </Box>
      )}

      {(property.phone || property.email) && (
        <Typography sx={{ mt: 2.5, fontSize: "0.8125rem", color: sp.muted }}>
          {[property.phone && formatPhone(property.phone), property.email].filter(Boolean).join(" · ")}
        </Typography>
      )}
    </Box>
  );
}

type PolicyProperty = Pick<ResortDetail, "checkInTime" | "checkOutTime" | "cancellationPolicy" | "houseRules"> &
  Partial<
    Pick<
      ResortDetail,
      "childPolicy" | "petPolicy" | "guestRules" | "smokingAllowed" | "childAgeMax" | "infantAgeMax" | "pricesIncludeTax"
    >
  >;

const RULES_PREVIEW = 6;

/** One icon-led row of "Things to know": a title and the owner's words under it. */
function PolicyRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", gap: 1.75, py: 2.25, borderTop: `1px solid ${sp.divider}`, "& > svg": { mt: 0.25, fontSize: 22, flexShrink: 0, color: sp.ink } }}>
      {icon}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <SubTitle>{title}</SubTitle>
        {children}
      </Box>
    </Box>
  );
}

function TimeTile({ icon, label, time, note }: { icon: React.ReactNode; label: string; time: string; note: string | null }) {
  return (
    <Box sx={{ p: 2, borderRadius: "16px", bgcolor: sp.bgSoft, border: `1px solid ${sp.border}` }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: sp.muted, "& svg": { fontSize: 17 } }}>
        {icon}
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</Typography>
      </Box>
      <Typography sx={{ mt: 0.75, fontFamily: guestDisplayFontFamily, fontSize: "1.625rem", lineHeight: 1.1, color: sp.ink }}>{time}</Typography>
      {note && <Typography sx={{ mt: 0.75, fontSize: "0.8125rem", lineHeight: 1.4, color: sp.muted }}>{note}</Typography>}
    </Box>
  );
}

/**
 * "Things to know": check-in/out, then cancellation, children, pets and
 * pricing as icon rows, then the house rules — the fixed-choice guest rules
 * as a list and the owner's own note under them.
 */
export function PoliciesSection({ property }: { property: PolicyProperty }) {
  const [showAllRules, setShowAllRules] = useState(false);
  const checkIn = formatTime(property.checkInTime);
  const checkOut = formatTime(property.checkOutTime);
  const rules = guestRuleItems(property.guestRules, property.smokingAllowed);
  const earlyNote = flexibilityNote(property.guestRules?.earlyCheckIn, "Early check-in");
  const lateNote = flexibilityNote(property.guestRules?.lateCheckOut, "Late check-out");
  const childAges =
    property.childAgeMax != null && property.infantAgeMax != null
      ? `Ages ${property.infantAgeMax}–${property.childAgeMax} count as children, under ${property.infantAgeMax} as infants.`
      : null;
  const hasHouseRules = rules.length > 0 || !!property.houseRules;

  if (!checkIn && !checkOut && !property.cancellationPolicy && !property.childPolicy && !property.petPolicy && !hasHouseRules) return null;

  const visibleRules = showAllRules ? rules : rules.slice(0, RULES_PREVIEW);

  return (
    <Box component="section" id="things-to-know" sx={{ mt: 6, scrollMarginTop: 72 }}>
      <SectionTitle>Things to know</SectionTitle>

      {(checkIn || checkOut) && (
        <Box sx={{ mb: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {checkIn && <TimeTile icon={<LoginOutlinedIcon />} label="Check-in" time={`From ${checkIn}`} note={earlyNote} />}
          {checkOut && <TimeTile icon={<LogoutOutlinedIcon />} label="Check-out" time={`By ${checkOut}`} note={lateNote} />}
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        {property.cancellationPolicy && (
          <PolicyRow icon={<EventBusyOutlinedIcon />} title="Cancellation policy">
            {/* Never clamped: it is the one policy a guest must read in full before paying. */}
            <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.7, color: sp.body, whiteSpace: "pre-line" }}>
              {property.cancellationPolicy}
            </Typography>
          </PolicyRow>
        )}
        {(property.childPolicy || childAges) && (
          <PolicyRow icon={<ChildCareOutlinedIcon />} title="Children">
            {property.childPolicy && <ExpandableText text={property.childPolicy} />}
            {childAges && (
              <Typography sx={{ mt: property.childPolicy ? 1 : 0, fontSize: "0.8125rem", color: sp.muted }}>{childAges}</Typography>
            )}
          </PolicyRow>
        )}
        {property.petPolicy && (
          <PolicyRow icon={<PetsOutlinedIcon />} title="Pets">
            <ExpandableText text={property.petPolicy} />
          </PolicyRow>
        )}
        {property.pricesIncludeTax != null && (
          <PolicyRow icon={<ReceiptLongOutlinedIcon />} title="Taxes">
            <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.7, color: sp.body }}>
              {property.pricesIncludeTax ? "Prices shown include all taxes." : "Taxes are added to the prices shown at checkout."}
            </Typography>
          </PolicyRow>
        )}
      </Box>

      {hasHouseRules && (
        <Box sx={{ mt: 1, pt: 3, borderTop: `1px solid ${sp.divider}` }}>
          <SubTitle>House rules</SubTitle>
          {rules.length > 0 && (
            <Box sx={{ mt: 1.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 3, rowGap: 2 }}>
              {visibleRules.map(({ key, Icon, label, detail, restrictive }) => (
                <Box key={key} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <Icon sx={{ mt: 0.125, fontSize: 21, flexShrink: 0, color: restrictive ? sp.muted : sp.ink }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.4, color: sp.ink }}>{label}</Typography>
                    {detail && <Typography sx={{ mt: 0.25, fontSize: "0.8125rem", lineHeight: 1.4, color: sp.muted }}>{detail}</Typography>}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {rules.length > RULES_PREVIEW && (
            <Box component="button" type="button" onClick={() => setShowAllRules((v) => !v)} sx={{ ...textButtonSx, mt: 2 }}>
              {showAllRules ? "Show fewer rules" : `Show all ${rules.length} rules`}
            </Box>
          )}
          {property.houseRules && (
            <Box sx={{ mt: rules.length > 0 ? 2.5 : 0.5, pl: 2, borderLeft: `2px solid ${sp.borderSoft}` }}>
              <ExpandableText text={property.houseRules} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

/**
 * Owner-written questions only. The rows seeded from the property record
 * repeat what "Where you'll be" and "Things to know" already show, so they
 * are left out here — they still feed the FAQ schema (LodgingSchema).
 */
export function FaqSection({ faqs }: { faqs: PublicFaq[] }) {
  const own = (faqs ?? []).filter((f) => !f.fromPropertyDetails);
  if (!own.length) return null;
  return (
    <Box component="section" sx={{ mt: 6 }}>
      <SectionTitle>Questions guests ask</SectionTitle>
      <Box sx={{ borderBottom: `1px solid ${sp.divider}` }}>
        {own.map((faq) => (
          <Accordion
            key={faq.id}
            disableGutters
            elevation={0}
            square
            sx={{ bgcolor: "transparent", "&:before": { display: "none" }, borderTop: `1px solid ${sp.divider}` }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: 22, color: sp.ink }} />}
              sx={{ px: 0, minHeight: 60, "& .MuiAccordionSummary-content": { my: 2, mr: 1.5 } }}
            >
              <Typography sx={{ fontSize: "0.9375rem", fontWeight: 500, lineHeight: 1.45, color: sp.ink }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
              <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.7, color: sp.body, whiteSpace: "pre-line" }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export function LoadingState() {
  return (
    <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 4 }}>
      <Box sx={{ aspectRatio: "16/7", borderRadius: sp.radius, bgcolor: sp.border, animation: "pulse 1.5s ease-in-out infinite", "@keyframes pulse": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } } }} />
      <Box sx={{ mt: 3, height: 36, width: "40%", borderRadius: "8px", bgcolor: sp.border }} />
      <Box sx={{ mt: 2, height: 20, width: "60%", borderRadius: "8px", bgcolor: sp.chipBg }} />
    </Box>
  );
}

export function NotFoundState({ message }: { message: string }) {
  return (
    <Box sx={{ mx: "auto", maxWidth: 1024, px: 2, py: 10, textAlign: "center" }}>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: sp.ink }}>{message}</Typography>
      <Typography sx={{ mt: 1.5, color: sp.muted }}>
        The page you&apos;re looking for may have moved or is no longer listed.
      </Typography>
      <Link href="/resorts" underline="hover" sx={{ mt: 3, display: "inline-block", fontWeight: 600, color: sp.blue }}>
        Browse all resorts →
      </Link>
    </Box>
  );
}
