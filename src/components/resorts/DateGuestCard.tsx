"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { sp } from "@/components/smartpages/tokens";

type Props = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChange: (next: { checkIn?: string; checkOut?: string; adults?: number; children?: number }) => void;
  /** Optional trailing action rendered below the grid, inside the same card
   *  — e.g. the experience page's "Check availability" button that hands
   *  the selection off to /book, where this same card reappears live. */
  footer?: React.ReactNode;
  /** Raised up to overlap the hero banner above it (Phase C spec on /book:
   *  "raised/elevated"). The experience page's gallery already ends in its
   *  own natural rhythm, so it sits just below instead. Ignored when `mt`
   *  is given explicitly (e.g. the room page centers this over its hero
   *  via an absolutely-positioned wrapper, which needs a plain 0). */
  overlap?: boolean;
  mt?: number | string | { xs?: number | string; sm?: number | string };
};

const labelSx = {
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: sp.muted,
};

const dateFieldSx = {
  "& .MuiInputBase-input": { p: 0, fontSize: "0.9375rem", fontWeight: 600, color: sp.ink },
  "& .MuiInputBase-root": { mt: 0.5 },
  "& .MuiInputBase-root:before, & .MuiInputBase-root:after": { display: "none" },
};

function Stepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (next: number) => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
      <Typography sx={{ fontSize: "0.875rem", color: sp.ink }}>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          sx={{ border: `1px solid ${sp.border}`, width: 28, height: 28 }}
        >
          <RemoveIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <Typography sx={{ width: 20, textAlign: "center", fontSize: "0.875rem", fontWeight: 600 }}>
          {value}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onChange(value + 1)}
          sx={{ border: `1px solid ${sp.border}`, width: 28, height: 28 }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

/**
 * Overlaps the hero on /book and /rooms/[id] (Phase C spec: "raised/elevated,
 * always visible and always editable — changing it re-queries availability
 * in place"). The guest is never sent back a page to change dates.
 *
 * One continuous bar on sm+ — fields separated by hairline dividers, the
 * footer action filling the remaining width flush against the right edge —
 * rather than a padded card with the button stacked below it. `overflow:
 * hidden` on the rounded outer box is what clips a square-cornered footer
 * button into the card's own corner radius, so the button doesn't need to
 * know its own radius.
 */
export function DateGuestCard({ checkIn, checkOut, adults, children, onChange, footer, overlap = true, mt }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        mx: "auto",
        mt: mt !== undefined ? mt : overlap ? { xs: -4, sm: -5 } : { xs: 2, sm: 3 },
        maxWidth: 1280,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          borderRadius: sp.radius,
          border: `1px solid ${sp.border}`,
          bgcolor: "#fff",
          boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "stretch" },
        }}
      >
        <Box sx={{ flex: 1, px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 }, borderBottom: { xs: `1px solid ${sp.divider}`, sm: "none" }, borderRight: { sm: `1px solid ${sp.divider}` } }}>
          <Typography sx={labelSx}>Check-in</Typography>
          <TextField
            type="date"
            variant="standard"
            fullWidth
            value={checkIn}
            onChange={(e) => onChange({ checkIn: e.target.value })}
            slotProps={{ input: { disableUnderline: true } }}
            sx={dateFieldSx}
          />
        </Box>
        <Box sx={{ flex: 1, px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 }, borderBottom: { xs: `1px solid ${sp.divider}`, sm: "none" }, borderRight: { sm: `1px solid ${sp.divider}` } }}>
          <Typography sx={labelSx}>Check-out</Typography>
          <TextField
            type="date"
            variant="standard"
            fullWidth
            value={checkOut}
            onChange={(e) => onChange({ checkOut: e.target.value })}
            slotProps={{ input: { disableUnderline: true }, htmlInput: { min: checkIn } }}
            sx={dateFieldSx}
          />
        </Box>
        <Box
          sx={{
            minWidth: { sm: 220 },
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            borderBottom: { xs: `1px solid ${sp.divider}`, sm: "none" },
            borderRight: { sm: `1px solid ${sp.divider}` },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stepper label="Adults" value={adults} min={1} onChange={(v) => onChange({ adults: v })} />
          <Stepper label="Children" value={children} min={0} onChange={(v) => onChange({ children: v })} />
        </Box>
        {footer && (
          <Box sx={{ display: "flex", flex: { xs: "none", sm: 1 } }}>{footer}</Box>
        )}
      </Box>
    </Box>
  );
}
