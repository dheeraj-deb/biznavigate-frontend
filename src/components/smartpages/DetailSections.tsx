'use client';

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ResortDetail, PublicFaq } from "../../lib/publicApi";
import { sp } from "./tokens";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="h2" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: 700, color: sp.ink }}>
      {children}
    </Typography>
  );
}

export function LocationSection({
  property,
  directions,
}: {
  property: Pick<ResortDetail, "address" | "city" | "region" | "postalCode" | "latitude" | "longitude">;
  directions?: string | null;
}) {
  const hasCoords = property.latitude != null && property.longitude != null;

  return (
    <Box component="section" sx={{ mt: 5, borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: sp.bgSoft, overflow: "hidden" }}>
      {hasCoords && (
        <Box
          component="iframe"
          title="Property location map"
          src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sx={{ display: "block", width: "100%", height: 240, border: 0 }}
        />
      )}
      <Box sx={{ p: 3 }}>
        <Typography component="h2" sx={{ mb: 1.5, fontSize: "1.25rem", fontWeight: 700, color: sp.ink }}>
          Location
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "flex-start", gap: 1, fontSize: "1rem", color: sp.body }}>
          <PlaceIcon sx={{ mt: 0.25, fontSize: 18, flexShrink: 0, color: sp.blue }} />
          {[property.address, property.city, property.region, property.postalCode].filter(Boolean).join(", ")}
        </Typography>
        {hasCoords && (
          <Link
            href={`https://maps.google.com/?q=${property.latitude},${property.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ mt: 1.5, display: "inline-flex", alignItems: "center", gap: 0.75, fontSize: "0.875rem", fontWeight: 500, color: sp.blue }}
          >
            Open in Google Maps →
          </Link>
        )}
        {directions && <Typography sx={{ mt: 1.5, fontSize: "0.875rem", color: sp.muted }}>{directions}</Typography>}
      </Box>
    </Box>
  );
}

export function PoliciesSection({
  property,
}: {
  property: Pick<ResortDetail, "checkInTime" | "checkOutTime" | "cancellationPolicy" | "houseRules">;
}) {
  const hasTimes = property.checkInTime || property.checkOutTime;
  if (!hasTimes && !property.cancellationPolicy && !property.houseRules) return null;

  return (
    <Box component="section" sx={{ mt: 4 }}>
      <SectionTitle>Policies</SectionTitle>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        {hasTimes && (
          <Box sx={{ display: "flex", gap: 1.5, borderRadius: sp.radiusSm, border: `1px solid ${sp.border}`, bgcolor: "#fff", p: 2 }}>
            <AccessTimeIcon sx={{ mt: 0.25, fontSize: 20, flexShrink: 0, color: sp.blue }} />
            <Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>
                Check-in / Check-out
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: "0.875rem", color: sp.muted }}>
                {property.checkInTime && `In: ${property.checkInTime}`}
                {property.checkInTime && property.checkOutTime && " · "}
                {property.checkOutTime && `Out: ${property.checkOutTime}`}
              </Typography>
            </Box>
          </Box>
        )}
        {property.cancellationPolicy && (
          <Box sx={{ display: "flex", gap: 1.5, borderRadius: sp.radiusSm, border: `1px solid ${sp.border}`, bgcolor: "#fff", p: 2 }}>
            <DescriptionIcon sx={{ mt: 0.25, fontSize: 20, flexShrink: 0, color: sp.blue }} />
            <Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>Cancellation</Typography>
              <Typography sx={{ mt: 0.5, fontSize: "0.875rem", color: sp.muted }}>
                {property.cancellationPolicy}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {property.houseRules && (
        <Box sx={{ mt: 2, borderRadius: sp.radiusSm, border: `1px solid ${sp.border}`, bgcolor: "#fff", p: 2 }}>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: sp.ink }}>House rules</Typography>
          <Typography sx={{ mt: 0.5, fontSize: "0.875rem", lineHeight: 1.7, color: sp.muted }}>
            {property.houseRules}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export function FaqSection({ faqs }: { faqs: PublicFaq[] }) {
  if (!faqs?.length) return null;
  return (
    <Box component="section" sx={{ mt: 5 }}>
      <SectionTitle>Frequently asked questions</SectionTitle>
      <Box sx={{ borderRadius: sp.radius, border: `1px solid ${sp.border}`, bgcolor: "#fff", overflow: "hidden" }}>
        {faqs.map((faq, i) => (
          <Accordion
            key={faq.id}
            disableGutters
            elevation={0}
            sx={{
              "&:before": { display: "none" },
              borderTop: i > 0 ? `1px solid ${sp.divider}` : "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: 18, color: sp.muted }} />}
              sx={{ px: 2.5, "& .MuiAccordionSummary-content": { my: 1.5 } }}
            >
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: sp.ink }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>
              <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.7, color: sp.body }}>{faq.answer}</Typography>
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
        The page you're looking for may have moved or is no longer listed.
      </Typography>
      <Link href="/resorts" underline="hover" sx={{ mt: 3, display: "inline-block", fontWeight: 600, color: sp.blue }}>
        Browse all resorts →
      </Link>
    </Box>
  );
}
