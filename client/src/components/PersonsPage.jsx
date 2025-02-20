// client/src/components/PersonsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from './NavBar';  // ✅ Import NavBar
import Footer from './Footer';  // ✅ Import Footer

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
    const personData = {
      name,
      difficulty: Number(difficulty),
      cleanness: Number(cleanness),
      creativity: Number(creativity),
      presentation: Number(presentation),
      additionalPoints: additionalPoints ? Number(additionalPoints) : 0,
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

  // Delete a user (Premium users only)
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(err => console.error('Error deleting user:', err));
  };

  return (
    <>
      <NavBar />  {/* ✅ Add NavBar */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Welcome, {user?.username}</Typography>

        <Button variant="contained" color="secondary" onClick={logout} sx={{ mb: 2 }}>
          Logout
        </Button>

        {/* Add Person Section */}
        {(user?.role === 'admin' || user?.role === 'premium') && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5">Add New Person</Typography>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Difficulty (0-10)" type="number" fullWidth value={difficulty} onChange={(e) => setDifficulty(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Cleanness (0-5)" type="number" fullWidth value={cleanness} onChange={(e) => setCleanness(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Creativity (0-10)" type="number" fullWidth value={creativity} onChange={(e) => setCreativity(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Presentation (0-10)" type="number" fullWidth value={presentation} onChange={(e) => setPresentation(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Additional Points (0-15)" type="number" fullWidth value={additionalPoints} onChange={(e) => setAdditionalPoints(e.target.value)} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={handleAddPerson}>
              Add Person
            </Button>
          </Paper>
        )}

        {/* People List */}
        <Typography variant="h5">People List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Cleanness</TableCell>
                <TableCell>Creativity</TableCell>
                <TableCell>Presentation</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {persons.map((person) => (
                <TableRow key={person._id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.difficulty}</TableCell>
                  <TableCell>{person.cleanness}</TableCell>
                  <TableCell>{person.creativity}</TableCell>
                  <TableCell>{person.presentation}</TableCell>
                  <TableCell>{person.difficulty + person.cleanness + person.creativity + person.presentation}</TableCell>
                  <TableCell>
                    {(user?.role === 'admin' || user?.role === 'premium') && (
                      <IconButton color="error" onClick={() => handleDeletePerson(person._id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />  {/* ✅ Add Footer */}
    </>
  );
}

export default PersonsPage;
