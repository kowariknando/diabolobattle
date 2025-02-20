// client/src/components/About.jsx
import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Link } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

function About() {
  return (
    <>
      <NavBar />
      <Container sx={{ py: 6 }}>
        {/* Title */}
        <Typography variant="h2" sx={{ fontFamily: 'FuturaBold, sans-serif', fontWeight: 'bold', textAlign: 'center', color: 'primary.main', mb: 4 }}>
          EJC Diabolo Battle
        </Typography>

        {/* Event Description */}
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
          The EJC Diabolo Battle is a diabolo competition organized to determine who is the most exciting diabolist of the 2024 European Juggling Convention, at Ovar, Portugal.
          For more info, visit our social media:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Link href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
            Facebook
          </Link>
          <Link href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
            Instagram
          </Link>
        </Box>

        {/* Introduction Section */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Introduction
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The **EJC Diabolo Battle** follows a **single-elimination tournament** format, featuring players of all ages and genders, judged by five experts.
        </Typography>

        {/* Image of the Bracket */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <img src="/brackets.png" alt="Tournament Bracket" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        </Box>

        <Typography variant="body1" sx={{ mb: 4 }}>
          The competition consists of **five main stages**:
          - **Registration**
          - **Singles Qualifications**
          - **Teams Qualifications** *(if applicable)*
          - **Singles Top 16 Finals**
          - **Teams Top 4 Finals** *(if applicable)*
        </Typography>

        {/* Registration Section */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Registration
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Registration is open **until the Qualifications start**. You can register via:
        </Typography>
        <ul>
          <li>Onsite **Info Point List** *(available before the competition)*</li>
          <li>Onsite **Qualifications Day** *(at the qualification location until the last participant has competed)*</li>
        </ul>

        {/* Judging Criteria */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Judging Criteria
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Judges evaluate performances based on the following categories:
        </Typography>
        <ul>
          <li><strong>Difficulty (0-10):</strong> Complexity of the performed tricks.</li>
          <li><strong>Cleanness (0-5):</strong> Precision of execution.</li>
          <li><strong>Creativity (0-10):</strong> Uniqueness and originality.</li>
          <li><strong>Presentation (0-10):</strong> Stage presence and audience engagement.</li>
          <li><strong>Additional Points (0-15):</strong> Exceptional skills deserving extra recognition.</li>
        </ul>

        {/* Winning Explanation */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          How to Win
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The **EJC Diabolo Battle** is not just about skill; it’s about **style, originality, and engaging the audience**.
          Judges will evaluate **creativity, movement, artistic expression, and crowd reaction**. Impress the judges and the crowd, and you’ll move forward!
        </Typography>

        {/* Singles Category */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Singles Category
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The **Singles Qualifications** follow these steps:
        </Typography>
        <ul>
          <li>Each player performs for **60 seconds**.</li>
          <li>Judges score each player based on the official **Singles Voting Sheet**.</li>
          <li>The **top 12 players** move directly to the **Top 16 Finals**.</li>
          <li>Players ranked **13th to 20th** compete in **four additional battles** to determine the last four spots.</li>
        </ul>

        {/* Top 16 Finals */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Top 16 Finals - Singles
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The **Top 16** players compete in a **bracket-style** battle. The structure is randomized, and battles include:
        </Typography>
        <ul>
          <li>Two **30-second rounds** per battle.</li>
          <li>Judges **select the winner** after both rounds.</li>
          <li>Semifinals and Finals include **three rounds**.</li>
          <li>If judges cannot decide, an **extra round** may be added.</li>
        </ul>

        {/* Coin Toss for Battle Order */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}>
          Who Goes First?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Before each battle, a **coin flip** determines who starts.
          - The winner of the toss **chooses who goes first**.
          - Battles are accompanied by **music**, which plays slightly before each round.
        </Typography>

        <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4, mb: 2 }}>
          *"Winning isn’t everything, but wouldn’t it be fun?"* 😉
        </Typography>

      </Container>
      <Footer />
    </>
  );
}

export default About;
