import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { MomentPopover } from "./MomentPopover";
import type { PageMoment } from "../../lib/publicApi";
import { sp } from "./tokens";

type Props = {
  highlights: string[];
  moments: PageMoment[];
  phoneNumber: string | null;
  propertyName: string;
  propertyId?: string;
};

/**
 * Hovr-style "Highlights": the plain chip strip, upgraded so any chip whose
 * text matches a HIGHLIGHT moment's label becomes tappable — opening the
 * same media popover as a photo pin.
 */
export function AmenityHighlights({ highlights, moments, phoneNumber, propertyName, propertyId }: Props) {
  if (!highlights.length) return null;

  const byLabel = new Map(
    moments.filter((m) => m.type === "HIGHLIGHT").map((m) => [m.label.toLowerCase(), m]),
  );

  return (
    <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
      {highlights.map((h) => {
        const moment = byLabel.get(h.toLowerCase());
        const chip = (onClick?: (e: React.MouseEvent<HTMLElement>) => void) => (
          <Typography
            component={moment ? "button" : "span"}
            onClick={onClick}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              borderRadius: "999px",
              border: `1px solid ${moment ? sp.blue : sp.borderSoft}`,
              bgcolor: moment ? sp.blueBgTint : sp.bgSoft,
              px: 1.75,
              py: 0.75,
              fontSize: "0.875rem",
              color: "#374151",
              fontFamily: "inherit",
              cursor: moment ? "pointer" : "default",
            }}
          >
            {moment && <AutoAwesomeIcon sx={{ fontSize: 14, color: sp.blue }} />}
            {h}
          </Typography>
        );

        if (!moment) return <React.Fragment key={h}>{chip()}</React.Fragment>;

        return (
          <MomentPopover
            key={h}
            moment={moment}
            phoneNumber={phoneNumber}
            propertyName={propertyName}
            propertyId={propertyId}
            trigger={(onClick) => chip(onClick)}
          />
        );
      })}
    </Box>
  );
}
