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

function Gallery() {
  const [imagesByYear, setImagesByYear] = useState({});
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

    // Manually list all images (Alternative: Fetch from API in the future)
    const imageFiles = [
      "poster_2015.jpg", "players_2015.png",
      "champions_2016.jpg", "team_2016.png",
      "podium_2017.jpg", "event_2017.jpeg",
      "tournament_2018.jpg", "crowd_2018.png",
      "match_2019.jpg", "winners_2019.png",
      "poster_2020.jpg", "finals_2020.jpeg",
      "trophy_2021.jpg", "battle_2021.png",
      "poster_2022.jpg", "celebration_2022.jpeg",
      "players_2023.jpg", "team_2023.png",
      "champions_2024.jpg", "grand_finale_2024.jpeg"
    ];

    const organizedImages = {};

    imageFiles.forEach(file => {
      const yearMatch = file.match(/_(\d{4})/);
      if (yearMatch) {
        const year = yearMatch[1];
        if (!organizedImages[year]) {
          organizedImages[year] = [];
        }
        organizedImages[year].push(`/gallery_images/${file}`);
      }
    });

    setImagesByYear(organizedImages);
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
            {Object.keys(imagesByYear).sort((a, b) => b - a).map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gallery Grid */}
        {Object.keys(imagesByYear).sort((a, b) => b - a).map(year => (
          (selectedYear === "all" || selectedYear === year) && (
            <Box key={year} sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}>
                {year}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {imagesByYear[year]?.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 3 }}>
                        <CardActionArea onClick={() => setSelectedImage(image)}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={image}
                            alt={`Gallery ${year}`}
                            onError={(e) => { e.target.src = "/gallery_images/fallback.jpg"; }} // ✅ Fallback Image
                          />
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
        ))}

        {/* Modal to View Large Image */}
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
          <DialogContent sx={{ textAlign: 'center' }}>
            {selectedImage && (
              <img src={selectedImage} alt="Gallery Image" style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '12px' }} />
            )}
          </DialogContent>
        </Dialog>

      </Container>
      <Footer />
    </>
  );
}

export default Gallery;
