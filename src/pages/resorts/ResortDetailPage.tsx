import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import { getResort } from "../../lib/publicApi";
import { usePublicResource } from "../../hooks/usePublicResource";
import { trackListingClick } from "../../lib/attribution";
import { MediaGallery } from "../../components/smartpages/MediaGallery";
import { RoomCard } from "../../components/smartpages/RoomCard";
import { AmenitiesGrid } from "../../components/smartpages/AmenitiesGrid";
import { LiveRateChecker } from "../../components/smartpages/LiveRateChecker";
import { WhatsAppCTA } from "../../components/smartpages/WhatsAppCTA";
import { LodgingSchema } from "../../components/smartpages/LodgingSchema";
import { ReviewSection } from "../../components/smartpages/ReviewSection";
import { SmartPageMeta } from "../../components/smartpages/SmartPageMeta";
import { StickyCtaBar } from "../../components/smartpages/StickyCtaBar";
import { AmenityHighlights } from "../../components/smartpages/AmenityHighlights";
import { StickyPin } from "../../components/smartpages/StickyPin";
import { isDirectVideo } from "../../components/smartpages/VideoEmbed";
import { clipForPhoto } from "../../lib/media";
import type { StorySlide } from "../../components/smartpages/StoryViewer";
import {
  SectionTitle,
  LocationSection,
  PoliciesSection,
  FaqSection,
  LoadingState,
  NotFoundState,
} from "../../components/smartpages/DetailSections";
import { sp } from "../../components/smartpages/tokens";

const StoryViewer = lazy(() => import("../../components/smartpages/StoryViewer"));

export default function ResortDetailPage() {
  const { slug = "" } = useParams();
  // Google's hotel price card (and free booking links) appends the guest's
  // chosen dates/party size to the landing URL — reading them here lets the
  // page open pre-filled instead of asking the guest to type dates twice.
  const [searchParams] = useSearchParams();
  const checkin = searchParams.get("checkin") ?? undefined;
  const checkout = searchParams.get("checkout") ?? undefined;
  const adultsParam = searchParams.get("adults");
  const adults = adultsParam ? parseInt(adultsParam, 10) : undefined;

  const { data: property, loading, error } = usePublicResource(`resort:${slug}`, () => getResort(slug));

  const heroRef = useRef<HTMLDivElement>(null);
  const [storyOpen, setStoryOpen] = useState(() => searchParams.get("story") === "1");

  // Story slides: every photo/video plus any PIN moment's own media (with its
  // label as a caption) — no separate content model, it's derived from what
  // the gallery and moments editor already produced. Photos that have an AI
  // motion clip play as that clip (StoryViewer advances video slides on
  // `ended`), so the story feels filmed while staying true to the photos.
  const slides: StorySlide[] = useMemo(() => {
    if (!property) return [];
    const base: StorySlide[] = [
      ...property.photos.map((url) => {
        const clip = clipForPhoto(property.motion, url);
        return clip ? { kind: "video" as const, url: clip } : { kind: "image" as const, url };
      }),
      ...(property.videos ?? []).filter(isDirectVideo).map((url) => ({ kind: "video" as const, url })),
    ];
    const pinMedia: StorySlide[] = (property.moments ?? [])
      .filter((m) => m.type === "PIN" && m.mediaUrl)
      .map((m) => ({
        kind: (isDirectVideo(m.mediaUrl as string) ? "video" : "image") as "image" | "video",
        url: m.mediaUrl as string,
        caption: m.label,
      }));
    return [...base, ...pinMedia];
  }, [property]);

  // Page-view event so the funnel (view → moment → book) starts at the top.
  useEffect(() => {
    if (property?.id) {
      trackListingClick({ propertyId: property.id, action: "view" });
    }
  }, [property?.id]);

  if (loading) return <LoadingState />;
  if (error || !property) return <NotFoundState message="Resort not found" />;

  const phone = property.tenant?.gupshupSourceNumber ?? null;
  const location = [property.city, property.region, property.country].filter(Boolean).join(", ");
  const highlights = [...(property.highlights ?? []), ...(property.amenities ?? [])].slice(0, 4);
  const metaLocation = [property.city, property.region].filter(Boolean).join(", ");

  return (
    <>
      <SmartPageMeta
        title={`${property.name} — Book Direct | ${metaLocation}`}
        description={
          property.description ??
          `Book ${property.propertyType ?? "resort"} in ${metaLocation} directly via WhatsApp. Best price guaranteed.`
        }
        images={property.photos}
        canonicalPath={`/resorts/${property.slug}`}
      />
      <LodgingSchema property={property} todayRate={property.todayRate} />

      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 4, pb: { xs: 12, sm: 4 } }}>
        {/* Photos */}
        <Box ref={heroRef}>
          <MediaGallery
            photos={property.photos}
            videos={property.videos}
            motion={property.motion}
            name={property.name}
            propertyId={property.id}
            moments={property.moments}
            phoneNumber={phone}
          />
        </Box>

        {/* Header */}
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
            <Typography
              component="h1"
              sx={{ mt: 1, fontSize: { xs: "1.875rem", sm: "2.25rem" }, fontWeight: 700, letterSpacing: "-0.02em", color: sp.ink }}
            >
              {property.name}
            </Typography>
            {location && (
              <Typography sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.75, color: sp.muted }}>
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
              label="Book via WhatsApp"
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

        {/* Availability checker */}
        <Box sx={{ mt: 4 }}>
          <LiveRateChecker
            slug={slug}
            propertyId={property.id}
            phoneNumber={phone}
            propertyName={property.name}
            initialCheckin={checkin}
            initialCheckout={checkout}
            initialAdults={adults}
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
                  tourUrl={
                    property.motion?.tours.find((t) => t.roomTypeId === room.id)?.tourUrl ?? null
                  }
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
        <LocationSection property={property} />

        {/* Policies */}
        <PoliciesSection property={property} />

        {/* FAQ */}
        <FaqSection faqs={property.faqs} />

        {/* Reviews */}
        <ReviewSection
          slug={slug}
          reviews={property.reviews}
          averageRating={property.averageRating}
          reviewCount={property.reviewCount}
        />
      </Box>

      {/* Sticky mobile CTA */}
      <StickyCtaBar
        todayRate={property.todayRate}
        phoneNumber={phone}
        propertyName={property.name}
        propertyId={property.id}
      />

      {/* Floating story entry point */}
      {slides.length > 0 && !storyOpen && (
        <StickyPin thumbnail={property.photos[0] ?? slides[0].url} anchorRef={heroRef} onOpen={() => setStoryOpen(true)} />
      )}

      {storyOpen && (
        <Suspense fallback={null}>
          <StoryViewer
            slides={slides}
            phoneNumber={phone}
            propertyName={property.name}
            propertyId={property.id}
            onClose={() => setStoryOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
