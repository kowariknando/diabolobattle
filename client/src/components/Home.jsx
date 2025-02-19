// client/src/components/Home.jsx
import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

function Home() {
  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '80vh',
          background: 'url("/hero.jpg") no-repeat center center',
          backgroundSize: 'cover',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          p: 2,
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <img src="/logo.png" alt="Logo" style={{ height: 120, marginBottom: 16 }} />
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            EJC Diabolo Battle
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            The ultimate diabolo competition at the 2024 European Juggling Convention in Ovar, Portugal.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/login" sx={{ fontSize: '1.2rem', px: 4, py: 1 }}>
            Get Started
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          About the Event
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The EJC Diabolo Battle is a diabolo competition organized to determine who is the most exciting diabolist at the 2024 European Juggling Convention, held in Ovar, Portugal.
        </Typography>
        <Typography variant="body1">
          Join us to witness mind-blowing tricks, electrifying performances, and a community of passionate diabolists!
        </Typography>
      </Container>

      {/* Gallery Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Gallery
        </Typography>
        <Grid container spacing={2}>
          {['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg', 'gallery4.jpg'].map((img, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia component="img" height="140" image={`/${img}`} alt={`Gallery ${index + 1}`} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Highlight from a past event.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          For more information, follow us on social media:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" component="a" href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" rel="noopener">
            Facebook
          </Button>
          <Button variant="contained" color="secondary" component="a" href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" rel="noopener">
            Instagram
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Home;
