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
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.75 }}>
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
 */
export function DateGuestCard({ checkIn, checkOut, adults, children, onChange }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        mx: "auto",
        mt: { xs: -4, sm: -5 },
        maxWidth: 1024,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          borderRadius: sp.radius,
          border: `1px solid ${sp.border}`,
          bgcolor: "#fff",
          boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
          p: { xs: 2, sm: 2.5 },
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr auto" },
          alignItems: "center",
        }}
      >
        <TextField
          type="date"
          label="Check-in"
          size="small"
          value={checkIn}
          onChange={(e) => onChange({ checkIn: e.target.value })}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          type="date"
          label="Check-out"
          size="small"
          value={checkOut}
          onChange={(e) => onChange({ checkOut: e.target.value })}
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: checkIn } }}
        />
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", sm: "auto" },
            minWidth: { sm: 220 },
            borderRadius: sp.radiusSm,
            border: `1px solid ${sp.border}`,
            px: 1.5,
          }}
        >
          <Stepper label="Adults" value={adults} min={1} onChange={(v) => onChange({ adults: v })} />
          <Box sx={{ borderTop: `1px solid ${sp.divider}` }} />
          <Stepper label="Children" value={children} min={0} onChange={(v) => onChange({ children: v })} />
        </Box>
      </Box>
    </Box>
  );
}
