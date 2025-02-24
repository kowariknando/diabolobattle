// client/src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
// MUI Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        {/* Left Side: Brand / Logo */}
        {/* We replaced the Typography with an image that links to "/" */}
        <Box sx={{ mr: 2 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo_white_no_letters.png"  // Because the file is in client/public
              alt="EJC Diabolo Battle Logo"
              style={{ height: 60 }}
            />
          </Link>
        </Box>

        {/* Middle: Nav Links (About, Gallery, Login) */}
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          <Button
            component={Link}
            to="/about"
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/gallery"
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
          >
            Gallery
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
          >
            Login
          </Button>
        </Box>

        {/* Right Side: Social Icons (Instagram, Facebook, YouTube) */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            component="a"
            href="https://www.instagram.com/ejc_diabolo_battle/"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.facebook.com/EJCDiaboloBattle/"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.youtube.com/@DiaboloBattle"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
