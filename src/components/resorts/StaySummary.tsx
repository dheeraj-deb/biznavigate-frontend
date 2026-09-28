"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { sp } from "@/components/smartpages/tokens";
import { DateGuestCard } from "./DateGuestCard";

function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/**
 * Phones: the stay as one tappable line ("Fri, 10 Oct → Sun, 12 Oct · 2
 * nights · 2 adults") that opens the full date/guest card in place. The card
 * stacked open is four rows tall — most of a phone screen before the first
 * room — for a choice most guests arrive having already made.
 */
export function StaySummary(props: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onChange: React.ComponentProps<typeof DateGuestCard>["onChange"];
}) {
  const [open, setOpen] = useState(false);
  const nights = nightsBetween(props.checkIn, props.checkOut);
  const party = `${props.adults} adult${props.adults !== 1 ? "s" : ""}${
    props.children ? `, ${props.children} child${props.children !== 1 ? "ren" : ""}` : ""
  }`;
  return (
    <Box sx={{ display: { xs: "block", sm: "none" }, pt: 2 }}>
      <Box sx={{ px: 2 }}>
        <Box
          component="button"
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textAlign: "left",
            fontFamily: "inherit",
            cursor: "pointer",
            borderRadius: sp.radius,
            border: `1px solid ${sp.border}`,
            bgcolor: "#fff",
            boxShadow: sp.cardShadow,
            px: 2,
            py: 1.5,
          }}
        >
          <CalendarMonthOutlinedIcon sx={{ color: sp.blue }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, color: sp.ink }}>
              {shortDate(props.checkIn)} → {shortDate(props.checkOut)}
            </Typography>
            <Typography sx={{ fontSize: "0.8125rem", color: sp.muted }}>
              {nights} night{nights !== 1 ? "s" : ""} · {party}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: sp.blue }}>
            {open ? "Done" : "Edit"}
          </Typography>
        </Box>
      </Box>
      {open && (
        <DateGuestCard
          mt={1}
          checkIn={props.checkIn}
          checkOut={props.checkOut}
          adults={props.adults}
          children={props.children}
          onChange={props.onChange}
        />
      )}
    </Box>
  );
}
