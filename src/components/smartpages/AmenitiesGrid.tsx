'use client';

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PoolIcon from "@mui/icons-material/Pool";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import ParkIcon from "@mui/icons-material/Park";
import SecurityIcon from "@mui/icons-material/Security";
import VideocamIcon from "@mui/icons-material/Videocam";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";
import { sp } from "./tokens";

const ICON_MAP: Record<string, React.ElementType> = {
  wifi: WifiIcon,
  parking: LocalParkingIcon,
  pool: PoolIcon,
  restaurant: RestaurantIcon,
  gym: FitnessCenterIcon,
  "air conditioning": AcUnitIcon,
  ac: AcUnitIcon,
  breakfast: FreeBreakfastIcon,
  garden: ParkIcon,
  security: SecurityIcon,
  cctv: VideocamIcon,
  location: PlaceIcon,
};

function AmenityIcon({ name }: { name: string }) {
  const key = name.toLowerCase();
  const Icon = Object.entries(ICON_MAP).find(([k]) => key.includes(k))?.[1] ?? StarIcon;
  return <Icon sx={{ fontSize: 20, color: sp.blue }} />;
}

export function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  if (!amenities?.length) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
      }}
    >
      {amenities.map((amenity) => (
        <Box
          key={amenity}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderRadius: sp.radiusSm,
            border: `1px solid ${sp.border}`,
            bgcolor: "#fff",
            px: 2,
            py: 1.5,
          }}
        >
          <AmenityIcon name={amenity} />
          <Typography sx={{ fontSize: "0.875rem", color: "#374151" }}>{amenity}</Typography>
        </Box>
      ))}
    </Box>
  );
}
