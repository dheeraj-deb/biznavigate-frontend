'use client';

import React from "react";
import Box from "@mui/material/Box";
import { PublicFooter, PublicHeader } from "./PublicChrome";

/**
 * Minimal chrome for the public resort listing and occasion pages. Deliberately
 * NOT the marketing MainLayout: its in-page-scroll nav is meaningless here and
 * its hide-on-scroll header competes with the sticky booking CTA. The theme
 * and attribution capture come from GuestThemeRoot in app/resorts/layout.tsx;
 * the property pages under /resorts/[slug] use ResortAppShell instead of this.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column", bgcolor: "#fff" }}>
      <PublicHeader />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <PublicFooter />
    </Box>
  );
}
