// client/src/components/PersonsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box } from '@mui/material';

function PersonsPage({ token, user, logout }) {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [cleanliness, setCleanliness] = useState(1);
  const [creativity, setCreativity] = useState(1);
  const [presentation, setPresentation] = useState(1);
  const [additionalPoints, setAdditionalPoints] = useState(0);
  const [users, setUsers] = useState([]); // For admin user management

  // Fetch persons
  useEffect(() => {
    fetch('http://localhost:5000/api/persons', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPersons(data))
      .catch(err => console.error('Error fetching persons:', err));

    // Fetch users (only for admins)
    if (user?.role === 'admin') {
      fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Error fetching users:', err));
    }
  }, [token, user]);

  // Add a new person
  const handleAddPerson = () => {
    fetch('http://localhost:5000/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, difficulty, cleanliness, creativity, presentation, additionalPoints })
    })
      .then(res => res.json())
      .then(data => {
        setPersons([...persons, data]);
        setName('');
        setDifficulty(1);
        setCleanliness(1);
        setCreativity(1);
        setPresentation(1);
        setAdditionalPoints(0);
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

  // Delete a user (admin only)
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(err => console.error('Error deleting user:', err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
        Welcome, {user?.username}! ({user?.role})
      </Typography>

      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mb: 2 }}>
        Logout
      </Button>

      {/* Add Person Section (Visible only to Admin and Premium Users) */}
      {(user?.role === 'admin' || user?.role === 'premium') && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Add New Person</Typography>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Difficulty" type="number" fullWidth value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} sx={{ mb: 2 }} />
          <TextField label="Cleanliness" type="number" fullWidth value={cleanliness} onChange={(e) => setCleanliness(Number(e.target.value))} sx={{ mb: 2 }} />
          <TextField label="Creativity" type="number" fullWidth value={creativity} onChange={(e) => setCreativity(Number(e.target.value))} sx={{ mb: 2 }} />
          <TextField label="Presentation" type="number" fullWidth value={presentation} onChange={(e) => setPresentation(Number(e.target.value))} sx={{ mb: 2 }} />
          <TextField label="Additional Points" type="number" fullWidth value={additionalPoints} onChange={(e) => setAdditionalPoints(Number(e.target.value))} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" onClick={handleAddPerson}>
            Add Person
          </Button>
        </Paper>
      )}

      {/* People List */}
      <Typography variant="h5" sx={{ mb: 2 }}>People List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Cleanliness</TableCell>
              <TableCell>Creativity</TableCell>
              <TableCell>Presentation</TableCell>
              <TableCell>Total Points</TableCell>
              {(user?.role === 'admin' || user?.role === 'premium') && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person._id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.difficulty}</TableCell>
                <TableCell>{person.cleanliness}</TableCell>
                <TableCell>{person.creativity}</TableCell>
                <TableCell>{person.presentation}</TableCell>
                <TableCell>{person.difficulty + person.cleanliness + person.creativity + person.presentation + (person.additionalPoints || 0)}</TableCell>
                {(user?.role === 'admin' || user?.role === 'premium') && (
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDeletePerson(person._id)}>Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Management (Only for Admins) */}
      {user?.role === 'admin' && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Manage Users</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default PersonsPage;
