// client/src/components/About.jsx
import React from 'react';
import {Container, Box, Typography, Grid, Card, CardContent, CardMedia, Link, Button} from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import {motion} from "framer-motion";

function About() {
  return (
    <>
      <NavBar />
        <Container sx={{py: 6}}>
            {/* Title */}
            <Typography variant="h2" sx={{
                fontFamily: 'MyFuturaLight, sans-serif',
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'primary.main',
                mb: 4
            }}>
                EJC Diabolo Battle
            </Typography>

            {/* Event Description */}
            <Typography variant="body1" sx={{textAlign: 'center', mb: 4}}>
                The EJC Diabolo Battle is a diabolo show organized to determine who is the most exciting
                diabolist of the European Juggling Convention.<br/>
                Started in 2015, we’ve been going bigger and bolder every year—turning this event into one of the
                most unmissable shows at the European Juggling Convention. And guess what? It’s all thanks to
                everyone who keeps supporting us, because we’re awesome... and so are you!<br/><br/>
                Join us to witness mind-blowing tricks, electrifying performances, and a community of passionate
                diabolists!
            </Typography>
 {/* Contact Section */}
      <Container sx={{ py: 0, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Follow Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Don't forget to follow us in our social media for more info and updates:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="contained" color="secondary" component="a" href="https://www.facebook.com/EJCDiaboloBattle/" target="_blank" rel="noopener">
              Facebook
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="contained" color="secondary" component="a" href="https://www.instagram.com/ejc_diabolo_battle/" target="_blank" rel="noopener">
              Instagram
            </Button>
          </motion.div>
        </Box>
      </Container>

            {/* Introduction Section */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                <br/>Introduction
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                EJC Diabolo Battle is a diabolo competition, where the main part, the Top 16 Finals, is organized in the
                classic single-elimination tournament structure.
            </Typography>

            {/* Image of the Bracket */}
            <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                <img src="/brackets.png" alt="Tournament Bracket"
                     style={{maxWidth: '50%', height: 'auto', borderRadius: '8px'}}/>
            </Box>

            <Typography variant="body1" sx={{mb: 4}}>
                <ul>
                    Players of all ages and genders will compete together and be judged by five judges, may they be diabolo
                    players or other people related to circus arts.
                </ul>
                <ul>
                    The whole competition is divided into 5 parts: Registration, Singles Qualifications, Teams
                    Qualifications ( if there are sufficient participants and/or a strong willingness among players to
                    compete), Singles Top 16 Final, and Teams Top 4 Final (if applicable).
                </ul>
            </Typography>

            {/* Registration Section */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                Registration
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                Registration is open until the Qualifications start. You can register via:
            </Typography>
            <ul>
                <li>Onsite Info Point List (available before the competition)</li>
                <li>Onsite Qualifications Day (at the qualification location until the last participant has competed)
                </li>
            </ul>

            {/* Judging Criteria */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                Judging Criteria
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                Judges evaluate performances based on the following categories:
            </Typography>
            <ul>
                <li><strong>Difficulty (0-10):</strong> Complexity of the performed tricks.</li>
                <li><strong>Cleanness (0-5):</strong> Precision of execution.</li>
                <li><strong>Creativity (0-10):</strong> Uniqueness and originality. is the player presenting his own
                    tricks or rather widespread tricks.
                </li>
                <li><strong>Presentation (0-10):</strong> Stage presence, body movement, comedy, battle spirit and
                    audience engagement.
                </li>
                <li><strong>Additional Points (0-15):</strong> Here, judges can compensate for the previous fields. For
                    example, somebody does a crazy creative trick that you would give more than 10 points. Because
                    exceptional skills deserving extra recognition.
                </li>
            </ul>
            <ul>
                Total: sum of the points in all the fields.
            </ul>
            <ul>
                There is no limitation in the kind and amount of sticks, diabolos (or monobolos) to be used.
            </ul>

            {/* Winning Explanation */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                How to Win
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                <ul>The word battle has not been chosen by chance. You need to get on stage with a fighting spirit, believe that you are the best, and try to kick asses with style. It is all about people liking what you do.
                </ul>
                <ul>Qualities that will be counted are originality, technical difficulty, cleanness of execution, artistic look of the combination, movement of the player on stage, stage presence of the player, script, adaptation to the music, and anything you can think of is welcome! Judges will also take into account the reaction of the audience.
                </ul>
                <ul>You can choose complicated, technical tricks or more artistic tricks. It will be up to the
                    judges to compare, so it may be better to include a bit of everything. Perform with confidence and
                    you may find yourself moving through the competition! <u>There are also extra awards for special
                    tricks, this may go to the people that play only qualifications!</u> As a player, you should try to
                    impress and surprise the audience. Also, if you are in the audience and you like what you see,
                    please make noise. ☺
                </ul>
                <ul>Winning is not the most important goal (at least not for me). Having fun is the goal. But wouldn’t winning be fun? So, go for it!
                </ul>
                The EJC Diabolo Battle is not just about skill; it’s about style, originality, and engaging the
                audience.
                Judges will evaluate creativity, movement, artistic expression, and crowd reaction. Impress the
                judges and the crowd, and you’ll move forward!
            </Typography>

            {/* Singles Category */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                Singles Category
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                The Singles Qualifications follow these steps:
            </Typography>
            <ul>
                <li>Each player performs for 60 seconds. <u> Note: for Qualifications is 60 seconds but for the finals is just 30 seconds.</u></li>
                <li>Judges score each player based on the official Singles Voting Sheet.</li>
                <li>The top 12 players move directly to the Top 16 Finals.</li>
                <li>Players ranked 13th to 20th compete in four additional battles to determine the last four
                    spots.<u> The order is randomized.</u>
                </li>
                <ul>
                    Notes:
                </ul>
                <ul>
                    - If for example, only 19 players signed up then the 13th player goes directly to the finals, and so on.
                </ul>
                <ul>
                    - If there is a draw in points between two players when making the ranking, judges are allowed to give one point to one of the players after deliberating all together. In order to break the draw and save time.
                </ul>
            </ul>

            {/* Top 16 Finals */}
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
                Top 16 Finals - Singles
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
                The 16 players in the Top 16 Finals will be distributed in brackets to battle one-on-one. <strong>The
                order of this bracket is random.</strong>
            </Typography>
            <ul>
                <li>Two 30-second rounds per battle.</li>
                <li>Judges select the winner after both rounds.</li>
                <li>Semifinals and Finals include three rounds.</li>
                <li>If judges cannot decide, an extra round may be added.</li>
            </ul>

            {/* Coin Toss for Battle Order */}
            <Typography variant="h5" sx={{fontWeight: 'bold', mb: 2, color: 'secondary.main'}}>
                Who Goes First?
            </Typography>
            <Typography variant="body1" sx={{mb: 4}}>
                Before each battle, a coin flip determines who starts. The winner of the toss chooses who goes first.
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
              Music
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              During each battle, music will start approximately 3 seconds early to give players a brief preview.
              If the 30-second limit is exceeded, the music is muted or lowered, unless the next player can immediately begin.
              Occasionally, the MC may allow extra time for an especially spectacular trick—however, that trick will earn fewer points to keep the battle fair.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Example:</strong>
              <ul>
                <li>30 seconds: Player A</li>
                <li>30 seconds: Player B</li>
                <li>30 seconds: Player A</li>
                <li>30 seconds: Player B</li>
              </ul>
              Semifinals and finals consist of three rounds instead of two.
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
              Award Ceremony and Group Photo
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              After the final battle, we will congratulate the winners, take a group photo, and distribute awards as soon as possible.
              Please do not leave before the photo and award distribution—anyone could end up receiving an award, not just the winners!
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
              Awards
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Each player can pick the diabolo they wish to receive as a prize, with the champion choosing first,
              the finalist second, and so on, and from there onwards, and randomly in case of a tie. Modifications of this may be allowed in order to have matching multiple diabolos, always under the agreement of the players.
            </Typography>
            <Typography variant="body1" sx={{fontStyle: 'italic', textAlign: 'center', mt: 4, mb: 2}}>
                "Winning isn’t everything, but wouldn’t it be fun?" 😉
            </Typography>
        </Container>
      <Footer />
    </>
  );
}

export default About;
