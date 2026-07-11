import React from "react";
import type { ResortDetail } from "../../lib/publicApi";

// Keys lowercase — propertyType arrives in varying case ("RESORT", "Resort").
const SCHEMA_TYPE: Record<string, string> = {
  resort: "Resort",
  homestay: "BedAndBreakfast",
  cottage: "LodgingBusiness",
  hotel: "Hotel",
  villa: "VacationRental",
  apartment: "VacationRental",
  camp: "CampingPitch",
};

function buildPriceRange(basePrices: number[]): string {
  const valid = basePrices.filter((p) => p > 0);
  if (valid.length === 0) return "₹₹";
  const min = Math.min(...valid);
  if (min < 3000) return "₹";
  if (min < 8000) return "₹₹";
  if (min < 15000) return "₹₹₹";
  return "₹₹₹₹";
}

function baseUrl(): string {
  return process.env.REACT_APP_PUBLIC_BASE_URL ?? window.location.origin;
}

export function LodgingSchema({ property, todayRate }: { property: ResortDetail; todayRate: number }) {
  const type = SCHEMA_TYPE[(property.propertyType ?? "").toLowerCase()] ?? "LodgingBusiness";
  const url = `${baseUrl()}/resorts/${property.slug}`;

  const lodging = {
    "@context": "https://schema.org",
    "@type": type,
    name: property.name,
    description: property.description,
    url,
    telephone: property.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.region,
      postalCode: property.postalCode,
      addressCountry: "IN",
    },
    ...(property.latitude && property.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: property.latitude,
            longitude: property.longitude,
          },
        }
      : {}),
    image: property.photos,
    amenityFeature: (property.amenities ?? []).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    ...(property.checkInTime ? { checkinTime: property.checkInTime } : {}),
    ...(property.checkOutTime ? { checkoutTime: property.checkOutTime } : {}),
    // priceRange is derived from real room rates, not a fixed placeholder —
    // Google flags mismatches between structured data and on-page/GBP price.
    priceRange: buildPriceRange(property.roomTypes.map((rt) => rt.basePrice)),
    // No starRating: Google ignores "self-serving" review/rating markup a
    // business publishes about itself, and inventing an official hotel-class
    // rating risks a misrepresentation flag. aggregateRating below is
    // sourced from reviews collected on this platform, not the resort's own
    // site — that's the pattern Google actually allows.
    ...(property.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: property.averageRating,
            reviewCount: property.reviewCount,
          },
          review: property.reviews.slice(0, 10).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.guestName },
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            ...(r.comment ? { reviewBody: r.comment } : {}),
          })),
        }
      : {}),
    containsPlace: property.roomTypes.map((rt) => ({
      "@type": "HotelRoom",
      name: rt.name,
      description: rt.description,
      occupancy: { "@type": "QuantitativeValue", maxValue: rt.capacityAdults },
      offers: {
        "@type": "Offer",
        price: rt.basePrice,
        priceCurrency: "INR",
        url,
      },
    })),
    makesOffer: {
      "@type": "Offer",
      price: todayRate,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const schemas: object[] = [lodging];

  if (property.faqs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: property.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  // Google accepts JSON-LD anywhere in the document, body included — no need
  // to hoist these into <head>.
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
