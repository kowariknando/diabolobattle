// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#E84423' },    // Accent Red
    secondary: { main: '#06BCC1' },  // Highlight Blue
    background: {
      default: '#BFBCCB',           // Light Gray Background
      paper: '#FFFFFF',             // White Cards/Paper Elements
    },
    text: {
      primary: '#1B1B1B',           // Rich Black Text
      secondary: '#06BCC1',         // Highlight Blue for Subtext
    },
  },
  typography: {
    fontFamily: 'MyFuturaLight, sans-serif', // Default font
    h1: {
      fontFamily: 'FuturaBold, sans-serif', // Bold for Major Titles
      fontWeight: 'bold',
      fontSize: '3rem',
      color: '#1B1B1B',
    },
    h2: {
      fontFamily: 'FuturaBold, sans-serif',
      fontWeight: 'bold',
      fontSize: '2.5rem',
      color: '#1B1B1B',
    },
    h3: {
      fontFamily: 'MyFuturaLight, sans-serif',
      fontWeight: 500,
      fontSize: '2rem',
      color: '#06BCC1',
    },
    h4: {
      fontFamily: 'MyFuturaLight, sans-serif',
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#06BCC1',
    },
    h5: {
      fontFamily: 'MyFuturaLight, sans-serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      color: '#E84423',
    },
    h6: {
      fontFamily: 'MyFuturaLight, sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
      color: '#E84423',
    },
    body1: {
      fontFamily: 'MyFuturaLight, sans-serif',
      fontSize: '1rem',
      color: '#1B1B1B',
    },
    button: {
      fontFamily: 'FuturaBold, sans-serif',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  },
});

export default theme;
