// client/src/components/Home.jsx
import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import Footer from './Footer';

// ===== DYNAMIC IMPORT OF ALL IMAGES IN /gallery_images FOLDER =====
const imagesArray = [];
const imagesGlob = import.meta.glob('../assets/gallery_images/*.{jpg,jpeg,png,gif}', { eager: true });
for (const path in imagesGlob) {
  const mod = imagesGlob[path];
  // "mod" can be a string or an object with ".default" holding the actual path
  const src = typeof mod === 'string' ? mod : mod.default;
  imagesArray.push(src);
}
// Shuffle all images
imagesArray.sort(() => 0.5 - Math.random());
// Slice only 4 images to display
const imagesToShow = imagesArray.slice(0, 4);

function Home() {
  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'url("/hero.jpg") no-repeat center center',
          backgroundSize: 'cover',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
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
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        />

        {/* Animated Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.img
            src="/logo_grey.png"
            alt="Logo"
            style={{ height: 180, marginBottom: 16 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'MyFuturaLight, sans-serif',
                fontWeight: 'bold',
                mb: 2,
                color: 'primary.main',
              }}
            >
              EJC Diabolo Battle
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'MyFuturaLight, sans-serif', mb: 4, color: 'background.default' }}>
              The ultimate diabolo show at the European Juggling Convention
            </Typography>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="contained" color="primary" component={Link} to="/login" sx={{ fontSize: '1.2rem', px: 4, py: 1 }}>
              Get Started
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          About the Event
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The Diabolo Battle is a diabolo show organized to determine who is the most exciting diabolist at the European Juggling Convention.
        </Typography>
        <Typography variant="body1">
          Join us to witness mind-blowing tricks, electrifying performances, and a community of passionate diabolists!
        </Typography>
      </Container>

      {/* Gallery Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main', textAlign: 'center' }}>
          Gallery
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {imagesToShow.map((img, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 3 }}>
                  {/* ===== Link to /gallery when clicking the image/card ===== */}
                  <CardActionArea component={Link} to="/gallery">
                    <CardMedia component="img" height="180" image={img} alt={`Gallery Random ${index + 1}`} />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Highlight from a past event.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          For more information, follow us on social media:
        </Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
              <motion.div whileHover={{scale: 1.1}}>
                  <Button variant="contained" color="secondary" component="a"
                          href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" rel="noopener">
                      Facebook
                  </Button>
              </motion.div>
              <motion.div whileHover={{scale: 1.1}}>
                  <Button variant="contained" color="secondary" component="a"
                          href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" rel="noopener">
                      Instagram
                  </Button>
              </motion.div>
              <motion.div whileHover={{scale: 1.1}}>
                  <Button variant="contained" color="secondary" component="a"
                          href="https://www.youtube.com/@DiaboloBattle/" target="_blank" rel="noopener">
                      YouTube
                  </Button>
              </motion.div>
          </Box>
      </Container>

        <Footer/>
    </>
  );
}

export default Home;
