// client/src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1B1B1B' }}> {/* Black Background */}
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo_white_no_letters.png" alt="Logo" style={{ height: 50, marginRight: 8 }} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
            EJC Diabolo Battle
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Button sx={{ color: '#FFFFFF' }} component={Link} to="/">Home</Button>
        <Button sx={{ color: '#FFFFFF' }} component={Link} to="/about">About</Button>
        <Button sx={{ color: '#FFFFFF' }} component={Link} to="/gallery">Gallery</Button>
        <Button sx={{ color: '#FFFFFF' }} component={Link} to="/contact">Contact</Button>
        <Button sx={{ color: '#FFFFFF' }} component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
