// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#E84423' },    // Accent color
    secondary: { main: '#06BCC1' },  // Highlight color
    background: {
      default: '#F5F5F5',           // Lighter background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#06BCC1',
    },
  },
  typography: {
    fontFamily: 'Futura, sans-serif',
    h1: { fontFamily: 'Futura Light, sans-serif' },
    h2: { fontFamily: 'Futura Light, sans-serif' },
    h3: { fontFamily: 'Futura Light, sans-serif' },
    h4: { fontFamily: 'Futura Light, sans-serif' },
    h5: { fontFamily: 'Futura Light, sans-serif' },
    h6: { fontFamily: 'Futura Light, sans-serif' },
  },
});

export default theme;
