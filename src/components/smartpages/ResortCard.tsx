import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import OptimizedImage from "../OptimizedImage";
import type { ResortListItem } from "../../lib/publicApi";
import { sp, formatINR } from "./tokens";

export function ResortCard({ property }: { property: ResortListItem }) {
  const photo = property.photos?.[0];
  const location = [property.city, property.region].filter(Boolean).join(", ");

  return (
    <Box
      component={RouterLink}
      to={`/resorts/${property.slug}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: sp.radius,
        border: `1px solid ${sp.border}`,
        bgcolor: "#fff",
        boxShadow: sp.cardShadow,
        textDecoration: "none",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: sp.cardShadowHover },
        "&:hover .resort-card-photo img": { transform: "scale(1.05)" },
        "&:hover .resort-card-name": { color: sp.blue },
      }}
    >
      <Box
        className="resort-card-photo"
        sx={{
          position: "relative",
          aspectRatio: "4/3",
          width: "100%",
          overflow: "hidden",
          bgcolor: sp.border,
          "& img": { transition: "transform 0.3s ease" },
        }}
      >
        {photo ? (
          <OptimizedImage src={photo} alt={property.name} sx={{ width: "100%", height: "100%" }} />
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: sp.faint,
              fontSize: "0.875rem",
            }}
          >
            No photo
          </Box>
        )}
        {property.propertyType && (
          <Typography
            sx={{
              position: "absolute",
              left: 12,
              top: 12,
              borderRadius: "8px",
              bgcolor: "rgba(255,255,255,0.9)",
              px: 1.25,
              py: 0.5,
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: sp.blue,
              backdropFilter: "blur(4px)",
            }}
          >
            {property.propertyType}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 1.5, p: 2 }}>
        <Box>
          <Typography
            className="resort-card-name"
            component="h2"
            sx={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.4, color: sp.ink, transition: "color 0.15s" }}
          >
            {property.name}
          </Typography>
          {location && (
            <Typography
              sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.75rem", color: sp.muted }}
            >
              <PlaceIcon sx={{ fontSize: 13, flexShrink: 0 }} />
              {location}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "0.75rem" }}>
          <StarIcon sx={{ fontSize: 15, color: "#fbbf24" }} />
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: sp.ink }}>4.5</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>· Direct booking</Typography>
        </Box>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #f0f4fa",
            pt: 1.5,
          }}
        >
          <Typography sx={{ fontSize: "0.875rem" }}>
            <Box component="span" sx={{ fontWeight: 700, color: sp.ink }}>
              ₹{property.minimumPrice ? formatINR(property.minimumPrice) : "—"}
            </Box>
            <Box component="span" sx={{ color: sp.muted }}>
              /night
            </Box>
          </Typography>
          <Typography
            sx={{
              borderRadius: "8px",
              bgcolor: "rgba(37,211,102,0.1)",
              px: 1.5,
              py: 0.75,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: sp.whatsappText,
            }}
          >
            Book on WhatsApp
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
