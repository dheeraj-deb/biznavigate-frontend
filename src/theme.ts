import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4E5FFD',
      dark: '#3A4AE8',
      light: '#EEF0FF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6B6B',
      dark: '#E05555',
      light: '#FFE8E8',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6B7280',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 },
    h4: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h5: { fontWeight: 600, lineHeight: 1.4 },
    h6: { fontWeight: 600, lineHeight: 1.4 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '12px 28px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': { boxShadow: 'none', transform: 'translateY(-1px)' },
        },
        containedPrimary: {
          background: '#4E5FFD',
          color: '#ffffff',
          '&:hover': { background: '#3A4AE8' },
        },
        outlinedPrimary: {
          borderColor: '#4E5FFD',
          color: '#4E5FFD',
          borderWidth: '1.5px',
          '&:hover': {
            background: '#EEF0FF',
            borderColor: '#3A4AE8',
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
          border: '1px solid #F3F4F6',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: '#1A1A2E',
          boxShadow: 'none',
          borderBottom: '1px solid #F3F4F6',
        },
      },
    },
  },
});

export default theme;
