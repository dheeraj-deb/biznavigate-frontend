'use client';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ResortCard } from "@/components/smartpages/ResortCard";
import { sp } from "@/components/smartpages/tokens";
import type { ResortListItem } from "@/lib/publicApi";

export function ResortListView({ resorts }: { resorts: ResortListItem[] }) {
  return (
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
  );
}
