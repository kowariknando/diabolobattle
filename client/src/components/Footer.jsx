// client/src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1B1B1B', color: 'white', p: 3, mt: 4, textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} EJC Diabolo Battle. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Follow us on{' '}
        <Link href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" rel="noopener" sx={{ color: '#06BCC1' }}>
          Facebook
        </Link>{' '}
          ,{' '}
        <Link href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" rel="noopener" sx={{ color: '#06BCC1' }}>
          Instagram{' '}
        </Link>
           and{' '}
          <Link href="https://www.youtube.com/@DiaboloBattle/" target="_blank" rel="noopener" sx={{ color: '#06BCC1' }}>
          YouTube{' '}
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
