import { createTheme } from '@mui/material/styles';
import theme from '@/theme';

/**
 * Guest booking experience theme (Phase C). Extends the base MUI theme —
 * same palette, shape, component overrides — but swaps typography to the
 * Geist + Instrument Serif system loaded in src/lib/guest-fonts.ts. Nested
 * under the root ThemeProvider in app/resorts/layout.tsx, so only /resorts/*
 * picks this up; marketing stays on the base theme's Inter.
 *
 * Instrument Serif is deliberately NOT wired into the typography variants
 * (h1-h6) here — it's reserved for property/room names specifically, not
 * every heading, so those components set it directly via sx.
 */
const guestTheme = createTheme(theme, {
  typography: {
    fontFamily: 'var(--font-guest-sans), ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
});

export const guestDisplayFontFamily = 'var(--font-guest-display), Georgia, serif';

export default guestTheme;
