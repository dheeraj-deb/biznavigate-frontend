import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Indigo 600 - Top SaaS primary color
      dark: '#4338CA', // Indigo 700
      light: '#818CF8', // Indigo 400
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Slate 50 - Premium polished lighting
      paper: '#FFFFFF',   // Crisp white for cards/surfaces
    },
    text: {
      primary: '#0F172A', // Slate 900 - High contrast but softer than black
      secondary: '#475569', // Slate 600 - Elegant secondary text
    },
    divider: '#E2E8F0', // Slate 200
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25 },
    h4: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h5: { fontWeight: 600, lineHeight: 1.4 },
    h6: { fontWeight: 600, lineHeight: 1.4 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
    body1: { fontSize: '1rem', lineHeight: 1.5, color: '#334155' } // Slate 700
  },
  shape: { borderRadius: 8 }, // Modern rounded corners
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: '#4F46E5',
          color: '#FFFFFF',
          border: '1px solid transparent',
          '&:hover': {
            background: '#4338CA',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        outlinedPrimary: {
          borderColor: '#E2E8F0',
          color: '#0F172A',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            background: '#F8FAFC',
            borderColor: '#CBD5E1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 12,
          border: '1px solid #F1F5F9', // Subtle border mimicking glass/layered vibe
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #E2E8F0',
        }
      }
    }
  },
});

export default theme;
