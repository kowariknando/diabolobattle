// client/src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EJC Diabolo Battle
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/gallery">Gallery</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
