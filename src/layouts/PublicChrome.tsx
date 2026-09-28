'use client';

import React, { Suspense } from "react";
import NextLink from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { AttributionCapture } from "../components/AttributionCapture";
import { sp } from "../components/smartpages/tokens";
import guestTheme from "../lib/guestTheme";

/**
 * The pieces of the public /resorts chrome, split out so the property pages
 * (/resorts/[slug]/*) can swap the header and footer for an app shell on
 * phones while every page keeps the same theme and attribution capture.
 */

/** Guest type system + attribution. Wraps every /resorts page. */
export function GuestThemeRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={guestTheme}>
      <Suspense fallback={null}>
        <AttributionCapture />
      </Suspense>
      {children}
    </ThemeProvider>
  );
}

/** `hideOnMobile`: phones get ResortAppShell's own top bar instead. */
export function PublicHeader({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  return (
    <Box
      component="header"
      sx={{
        display: hideOnMobile ? { xs: "none", sm: "block" } : "block",
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: `1px solid ${sp.divider}`,
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1280,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component={NextLink} href="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
          <Box component="img" src="/logo.png" alt="BizNavigate" sx={{ height: 28, width: "auto" }} />
        </Box>
        <Link
          component={NextLink}
          href="/"
          underline="none"
          sx={{ fontSize: "0.8125rem", fontWeight: 600, color: sp.blue }}
        >
          List your property
        </Link>
      </Box>
    </Box>
  );
}

export function PublicFooter({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  return (
    <Box
      component="footer"
      sx={{
        display: hideOnMobile ? { xs: "none", sm: "block" } : "block",
        borderTop: `1px solid ${sp.divider}`,
        bgcolor: sp.bgSoft,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1280,
          px: { xs: 2, sm: 3 },
          py: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", color: sp.muted }}>
          Powered by <Box component="span" sx={{ fontWeight: 600, color: sp.ink }}>BizNavigate</Box> — direct
          bookings on autopilot
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link component={NextLink} href="/privacy-policy" underline="hover" sx={{ fontSize: "0.75rem", color: sp.muted }}>
            Privacy
          </Link>
          <Link component={NextLink} href="/terms" underline="hover" sx={{ fontSize: "0.75rem", color: sp.muted }}>
            Terms
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
