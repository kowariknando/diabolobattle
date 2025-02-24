// client/src/components/Gallery.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardMedia,
  CardActionArea, Box, MenuItem, Select, FormControl,
  InputLabel, Dialog, DialogContent
} from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import { motion } from 'framer-motion';

/**
 * Use Vite's import.meta.glob to load images from 'src/assets/gallery_images' folder.
 * The result is an object { [filePath]: Module }, where Module.default = actual image URL.
 */
function importAllImages() {
  // Adjust this glob path if your folder name differs:
  const imagesGlob = import.meta.glob('../assets/gallery_images/*.{png,jpg,jpeg,gif}', {
    eager: true
  });

  const importedImages = [];
  for (const path in imagesGlob) {
    // Module object (or string) returned by Vite:
    const moduleImport = imagesGlob[path];
    // Extract the real image URL from moduleImport
    const src = typeof moduleImport === 'string'
      ? moduleImport             // sometimes it is already a string
      : moduleImport.default;    // typical case: the real URL is in "default"

    importedImages.push({
      path, // relative file path (like '../assets/gallery_images/poster_2019.jpg')
      src,
    });
  }
  return importedImages;
}

function Gallery() {
  const [imagesByYear, setImagesByYear] = useState({});
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const allImages = importAllImages();
    console.log('[DEBUG] All imported images:', allImages);

    // Group images by year (assumed from file name, e.g. 'poster_2019.jpg')
    const organized = {};
    allImages.forEach(({ path, src }) => {
      // Example path: '../assets/gallery_images/poster_2019.jpg'
      // We'll parse the actual filename:
      const fileName = path.split('/').pop(); // e.g. "poster_2019.jpg"
      const yearMatch = fileName.match(/_(\d{4})/);
      if (yearMatch) {
        const year = yearMatch[1];
        if (!organized[year]) {
          organized[year] = [];
        }
        organized[year].push(src); // store the final string URL
      }
    });

    console.log('[DEBUG] Organized images by year:', organized);
    setImagesByYear(organized);
  }, []);

  return (
    <>
      <NavBar />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Photo Gallery
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Explore the best moments from past tournaments. Select a year to filter images.
        </Typography>

        {/* Year Filter Dropdown */}
        <FormControl sx={{ minWidth: 200, mb: 4 }}>
          <InputLabel>Select Year</InputLabel>
          <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <MenuItem value="all">All Years</MenuItem>
            {Object.keys(imagesByYear).sort((a, b) => b - a).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gallery Grid */}
        {Object.keys(imagesByYear).sort((a, b) => b - a).map((year) => {
          if (selectedYear !== 'all' && selectedYear !== year) return null;
          return (
            <Box key={year} sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}>
                {year}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {imagesByYear[year]?.map((imageUrl, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 3 }}>
                        <CardActionArea onClick={() => setSelectedImage(imageUrl)}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={imageUrl}
                            alt={`Gallery ${year}`}
                            onError={(e) => {
                              console.error(`Image failed to load: ${imageUrl}`);
                              e.target.src = '/fallback.jpg';
                            }}
                          />
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}

        {/* Modal to View Large Image */}
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
          <DialogContent sx={{ textAlign: 'center' }}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Gallery Image"
                style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '12px' }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}

export default Gallery;
