import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5469d4', // Blue-purple color similar to the image
      light: '#7b8be8',
      dark: '#3a4ba3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5a0', // Bright teal accent color from the image
      light: '#4effc0',
      dark: '#00b380',
      contrastText: '#000000',
    },
    background: {
      default: '#0a0e29', // Very dark blue background
      paper: '#151c4a',   // Slightly lighter dark blue
    },
    text: {
      primary: '#ffffff',
      secondary: '#b7bdd7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #5469d4 0%, #7b8be8 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #3a4ba3 0%, #5469d4 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #00e5a0 0%, #4effc0 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #00b380 0%, #00e5a0 100%)',
          },
        },
      },
    },
  },
});

export default theme; 