'use client';

import { useEffect } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import PlaceIcon from "@mui/icons-material/Place";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { trackListingClick } from "@/lib/attribution";
import { MediaGallery } from "@/components/smartpages/MediaGallery";
import { RoomCard } from "@/components/smartpages/RoomCard";
import { AmenitiesGrid } from "@/components/smartpages/AmenitiesGrid";
import { LiveRateChecker } from "@/components/smartpages/LiveRateChecker";
import { WhatsAppCTA } from "@/components/smartpages/WhatsAppCTA";
import { LodgingSchema } from "@/components/smartpages/LodgingSchema";
import { ReviewSection } from "@/components/smartpages/ReviewSection";
import { StickyCtaBar } from "@/components/smartpages/StickyCtaBar";
import { AmenityHighlights } from "@/components/smartpages/AmenityHighlights";
import {
  SectionTitle,
  LocationSection,
  PoliciesSection,
  FaqSection,
} from "@/components/smartpages/DetailSections";
import { sp, formatINR } from "@/components/smartpages/tokens";
import type { IntentPageData } from "@/lib/publicApi";

export function IntentPageView({ intent }: { intent: IntentPageData }) {
  const { property } = intent;

  useEffect(() => {
    if (property?.id) {
      trackListingClick({ propertyId: property.id, action: "view" });
    }
  }, [property?.id]);

  const phone = property.tenant?.gupshupSourceNumber ?? null;
  const location = [property.city, property.region].filter(Boolean).join(", ");
  const highlights = [...(property.highlights ?? []), ...(property.amenities ?? [])].slice(0, 6);

  const crumbLinkSx = { fontSize: "0.75rem", color: sp.muted, "&:hover": { color: sp.blue } };

  return (
    <>
      <LodgingSchema property={property} todayRate={property.todayRate} />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 3, pb: { xs: 12, sm: 3 } }}>
        {/* Breadcrumb */}
        <Box component="nav" sx={{ mb: 3, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.75 }}>
          <Link component={NextLink} href="/" underline="none" sx={crumbLinkSx}>
            Home
          </Link>
          <ChevronRightIcon sx={{ fontSize: 12, color: sp.muted }} />
          <Link component={NextLink} href="/resorts" underline="none" sx={crumbLinkSx}>
            Resorts
          </Link>
          <ChevronRightIcon sx={{ fontSize: 12, color: sp.muted }} />
          <Link component={NextLink} href={`/resorts/${property.slug}`} underline="none" sx={crumbLinkSx}>
            {property.name}
          </Link>
          <ChevronRightIcon sx={{ fontSize: 12, color: sp.muted }} />
          <Typography component="span" sx={{ fontSize: "0.75rem", color: "#374151" }}>
            {intent.h1}
          </Typography>
        </Box>

        {/* Intent H1 + intro */}
        <Box sx={{ mb: 4, borderRadius: sp.radius, border: `1px solid ${sp.borderSoft}`, bgcolor: sp.blueBgTint, px: 3, py: 3 }}>
          <Typography component="h1" sx={{ fontSize: { xs: "1.5rem", sm: "1.875rem" }, fontWeight: 700, lineHeight: 1.25, color: sp.ink }}>
            {intent.h1}
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: "1rem", lineHeight: 1.75, color: sp.body }}>{intent.intro}</Typography>
          <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <WhatsAppCTA
              phoneNumber={phone}
              propertyName={property.name}
              propertyId={property.id}
              bookingSlug={property.slug}
              intentContext={intent.h1}
              label="Continue to book"
            />
            {property.todayRate > 0 && (
              <Typography sx={{ fontSize: "0.875rem", color: sp.muted }}>
                From{" "}
                <Box component="span" sx={{ fontWeight: 600, color: sp.ink }}>
                  ₹{formatINR(property.todayRate)}
                </Box>
                /night · Direct price
              </Typography>
            )}
          </Box>
        </Box>

        {/* Photos */}
        <MediaGallery
          photos={property.photos}
          videos={property.videos}
          name={property.name}
          propertyId={property.id}
          moments={property.moments}
          phoneNumber={phone}
        />

        {/* Property header */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "flex-start" },
            justifyContent: { sm: "space-between" },
            gap: 2,
          }}
        >
          <Box>
            {property.propertyType && (
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  borderRadius: "8px",
                  bgcolor: sp.blueBgSoft,
                  px: 1.25,
                  py: 0.5,
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: sp.blue,
                }}
              >
                {property.propertyType}
              </Typography>
            )}
            <Typography component="h2" sx={{ mt: 1, fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: sp.ink }}>
              {property.name}
            </Typography>
            {location && (
              <Typography sx={{ mt: 0.75, display: "flex", alignItems: "center", gap: 0.75, color: sp.muted }}>
                <PlaceIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                {location}
              </Typography>
            )}
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <WhatsAppCTA
              phoneNumber={phone}
              propertyName={property.name}
              propertyId={property.id}
              bookingSlug={property.slug}
              intentContext={intent.h1}
              label="Continue to book"
            />
          </Box>
        </Box>

        {/* Highlights strip */}
        <AmenityHighlights
          highlights={highlights}
          moments={property.moments ?? []}
          phoneNumber={phone}
          propertyName={property.name}
          propertyId={property.id}
        />

        {/* Description */}
        {property.description && (
          <Typography sx={{ mt: 3, fontSize: "1rem", lineHeight: 1.75, color: sp.body }}>
            {property.description}
          </Typography>
        )}

        {/* Live availability checker */}
        <Box sx={{ mt: 4 }}>
          <LiveRateChecker
            slug={property.slug ?? ""}
            propertyId={property.id}
            phoneNumber={phone}
            propertyName={property.name}
          />
        </Box>

        {/* Room types */}
        {property.roomTypes.length > 0 && (
          <Box component="section" sx={{ mt: 5 }}>
            <SectionTitle>Room types</SectionTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {property.roomTypes.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  phoneNumber={phone}
                  propertyName={property.name}
                  propertyId={property.id}
                  bookingSlug={property.slug}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <Box component="section" sx={{ mt: 5 }}>
            <SectionTitle>Amenities</SectionTitle>
            <AmenitiesGrid amenities={property.amenities} />
          </Box>
        )}

        {/* Location */}
        <LocationSection property={property} directions={property.directions} />

        {/* Policies */}
        <PoliciesSection property={property} />

        {/* FAQ */}
        <FaqSection faqs={property.faqs} />

        {/* Reviews */}
        <ReviewSection
          slug={property.slug ?? ""}
          reviews={property.reviews}
          averageRating={property.averageRating}
          reviewCount={property.reviewCount}
        />

        {/* Back link */}
        <Box sx={{ mt: 5, borderTop: `1px solid ${sp.divider}`, pt: 3, textAlign: "center" }}>
          <Link component={NextLink} href={`/resorts/${property.slug}`} underline="hover" sx={{ fontSize: "0.875rem", color: sp.blue }}>
            ← View full {property.name} resort page
          </Link>
        </Box>
      </Box>

      {/* Sticky mobile CTA */}
      <StickyCtaBar
        todayRate={property.todayRate}
        phoneNumber={phone}
        propertyName={property.name}
        propertyId={property.id}
        bookingSlug={property.slug}
        intentContext={intent.h1}
      />
    </>
  );
}
