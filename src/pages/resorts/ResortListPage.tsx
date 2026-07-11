import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getResorts } from "../../lib/publicApi";
import { usePublicResource } from "../../hooks/usePublicResource";
import { ResortCard } from "../../components/smartpages/ResortCard";
import { SmartPageMeta } from "../../components/smartpages/SmartPageMeta";
import { LoadingState, NotFoundState } from "../../components/smartpages/DetailSections";
import { sp } from "../../components/smartpages/tokens";

export default function ResortListPage() {
  const { data: resorts, loading, error } = usePublicResource("resorts", getResorts);

  if (loading) return <LoadingState />;
  if (error || !resorts) return <NotFoundState message="Couldn't load resorts" />;

  return (
    <>
      <SmartPageMeta
        title="Resorts & Stays — Book Direct on WhatsApp | BizNavigate"
        description="Browse resorts, villas and homestays. Book directly with the property on WhatsApp — no middlemen, best price guaranteed."
        canonicalPath="/resorts"
      />
      <Box sx={{ mx: "auto", maxWidth: 1024, px: { xs: 2, sm: 3 }, py: 4 }}>
        <Typography component="h1" sx={{ fontSize: { xs: "1.75rem", sm: "2rem" }, fontWeight: 700, color: sp.ink }}>
          Resorts & stays
        </Typography>
        <Typography sx={{ mt: 1, color: sp.muted }}>
          Book directly with the property on WhatsApp — no middlemen.
        </Typography>

        {resorts.length === 0 ? (
          <Typography sx={{ mt: 4, color: sp.muted }}>No resorts listed yet — check back soon.</Typography>
        ) : (
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
            }}
          >
            {resorts.map((property) => (
              <ResortCard key={property.id} property={property} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
