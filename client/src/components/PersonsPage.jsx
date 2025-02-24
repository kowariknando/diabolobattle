// client/src/components/PersonsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from './NavBar';
import Footer from './Footer';

function PersonsPage({ token, user, logout }) {
  const [persons, setPersons] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cleanness, setCleanness] = useState('');
  const [creativity, setCreativity] = useState('');
  const [presentation, setPresentation] = useState('');
  const [additionalPoints, setAdditionalPoints] = useState('');
  const [usersError, setUsersError] = useState(null);

  // Fetch persons and users
  useEffect(() => {
    fetch('http://localhost:5000/api/persons', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPersons(data))
      .catch(err => console.error('Error fetching persons:', err));

    if (user?.role === 'admin') {
      fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch users');
          }
          return res.json();
        })
        .then(data => setUsers(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error('Error fetching users:', err);
          setUsersError(err.message);
        });
    }
  }, [token, user]);

  // Add a new person
  const handleAddPerson = () => {
    if (!name.trim()) {
      alert('Name is required');
      return;
    }
    const diffValue = parseInt(difficulty, 10);
    if (isNaN(diffValue) || diffValue < 0 || diffValue > 10) {
      alert('Difficulty must be an integer between 0 and 10');
      return;
    }
    const cleanValue = parseInt(cleanness, 10);
    if (isNaN(cleanValue) || cleanValue < 0 || cleanValue > 5) {
      alert('Cleanness must be an integer between 0 and 5');
      return;
    }
    const creatValue = parseInt(creativity, 10);
    if (isNaN(creatValue) || creatValue < 0 || creatValue > 10) {
      alert('Creativity must be an integer between 0 and 10');
      return;
    }
    const presValue = parseInt(presentation, 10);
    if (isNaN(presValue) || presValue < 0 || presValue > 10) {
      alert('Presentation must be an integer between 0 and 10');
      return;
    }
    const addPointsValue = additionalPoints.trim() === ''
      ? 0
      : parseInt(additionalPoints, 10);
    if (isNaN(addPointsValue) || addPointsValue < 0 || addPointsValue > 15) {
      alert('Additional Points must be an integer between 0 and 15 (or leave it blank).');
      return;
    }

    const personData = {
      name: name.trim(),
      difficulty: diffValue,
      cleanness: cleanValue,
      creativity: creatValue,
      presentation: presValue,
      additionalPoints: addPointsValue
    };

    fetch('http://localhost:5000/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(personData)
    })
      .then(res => res.json())
      .then(newPerson => {
        setPersons([...persons, newPerson]);
        setName('');
        setDifficulty('');
        setCleanness('');
        setCreativity('');
        setPresentation('');
        setAdditionalPoints('');
      })
      .catch(err => console.error('Error adding person:', err));
  };

  // Delete a person
  const handleDeletePerson = (id) => {
    fetch(`http://localhost:5000/api/persons/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setPersons(persons.filter(person => person._id !== id)))
      .catch(err => console.error('Error deleting person:', err));
  };

  // Sort persons in descending order by total points and add rank
  const sortedPersons = [...persons].sort((a, b) => {
    const totalA = a.difficulty + a.cleanness + a.creativity + a.presentation;
    const totalB = b.difficulty + b.cleanness + b.creativity + b.presentation;
    return totalB - totalA; // biggest total first
  });

  // CSV DOWNLOAD LOGIC
  const handleDownloadCSV = () => {
    // Prepare CSV header
    let csv = 'Rank,Name,Difficulty,Cleanness,Creativity,Presentation,Additional Points,Total Points\n';

    // Build rows from sorted persons
    sortedPersons.forEach((person, index) => {
      const rank = index + 1;
      const totalPoints = person.difficulty + person.cleanness + person.creativity + person.presentation;

      // Escape any commas/newlines if needed. This example is simple, so we just join with commas.
      const row = [
        rank,
        person.name,
        person.difficulty,
        person.cleanness,
        person.creativity,
        person.presentation,
        person.additionalPoints,
        totalPoints
      ].join(',');

      csv += row + '\n';
    });

    // Create a Blob and a link to trigger download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'people_list.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">
          Welcome, {user?.username}
        </Typography>

        <Button variant="contained" color="secondary" onClick={logout} sx={{ mb: 2 }}>
          Logout
        </Button>

        {/* Add Person Section */}
        {(user?.role === 'admin' || user?.role === 'premium') && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5">Add New Person</Typography>

            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Difficulty (0-10)"
              type="number"
              fullWidth
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              inputProps={{ min: 0, max: 10, step: 1 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Cleanness (0-5)"
              type="number"
              fullWidth
              value={cleanness}
              onChange={(e) => setCleanness(e.target.value)}
              inputProps={{ min: 0, max: 5, step: 1 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Creativity (0-10)"
              type="number"
              fullWidth
              value={creativity}
              onChange={(e) => setCreativity(e.target.value)}
              inputProps={{ min: 0, max: 10, step: 1 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Presentation (0-10)"
              type="number"
              fullWidth
              value={presentation}
              onChange={(e) => setPresentation(e.target.value)}
              inputProps={{ min: 0, max: 10, step: 1 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Additional Points (0-15)"
              type="number"
              fullWidth
              value={additionalPoints}
              onChange={(e) => setAdditionalPoints(e.target.value)}
              inputProps={{ min: 0, max: 15, step: 1 }}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleAddPerson}>
              Add Person
            </Button>
          </Paper>
        )}

        {/* People List */}
        <Typography variant="h5" sx={{ display: 'inline-block', mr: 2 }}>
          People List
        </Typography>
        {/* Download CSV Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadCSV}
          sx={{ mb: 2 }}
        >
          Download CSV
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Cleanness</TableCell>
                <TableCell>Creativity</TableCell>
                <TableCell>Presentation</TableCell>
                <TableCell>Additional Points</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPersons.map((person, index) => {
                const totalPoints =
                  person.difficulty +
                  person.cleanness +
                  person.creativity +
                  person.presentation;
                return (
                  <TableRow key={person._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.difficulty}</TableCell>
                    <TableCell>{person.cleanness}</TableCell>
                    <TableCell>{person.creativity}</TableCell>
                    <TableCell>{person.presentation}</TableCell>
                    <TableCell>{person.additionalPoints}</TableCell>
                    <TableCell>{totalPoints}</TableCell>
                    <TableCell>
                      {(user?.role === 'admin' || user?.role === 'premium') && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeletePerson(person._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}

export default PersonsPage;
