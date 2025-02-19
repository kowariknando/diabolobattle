// client/src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2, mt: 4 }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} EJC Diabolo Battle. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        Follow us on{' '}
        <Link href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" rel="noopener" color="inherit">
          Facebook
        </Link>{' '}
        and{' '}
        <Link href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" rel="noopener" color="inherit">
          Instagram
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
