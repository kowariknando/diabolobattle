// client/src/components/PersonsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from './NavBar';
import Footer from './Footer';
import EditIcon from '@mui/icons-material/Edit';    // NEW: for editing
import SaveIcon from '@mui/icons-material/Save';    // NEW: to save edits
import CancelIcon from '@mui/icons-material/Cancel';// NEW: to cancel edits

function PersonsPage({ token, user, logout }) {
  const [persons, setPersons] = useState([]);
  const [usersList, setUsersList] = useState([]);   // RENAMED: 'users' => 'usersList'
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cleanness, setCleanness] = useState('');
  const [creativity, setCreativity] = useState('');
  const [presentation, setPresentation] = useState('');
  const [additionalPoints, setAdditionalPoints] = useState('');
  const [usersError, setUsersError] = useState(null);

  // For inline editing of Persons
  const [editingPersonId, setEditingPersonId] = useState(null);     // which person is being edited
  const [editDifficulty, setEditDifficulty] = useState('');
  const [editCleanness, setEditCleanness] = useState('');
  const [editCreativity, setEditCreativity] = useState('');
  const [editPresentation, setEditPresentation] = useState('');
  const [editAdditionalPoints, setEditAdditionalPoints] = useState('');

  // ================================
  // 1) Fetch Persons and Users
  // ================================
  useEffect(() => {
    // Fetch persons
    fetch('http://localhost:5000/api/persons', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPersons(data))
      .catch(err => console.error('Error fetching persons:', err));

    // Fetch user list if admin OR premium
    if (user?.role === 'admin' || user?.role === 'premium') {
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
        .then(data => {
          setUsersList(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.error('Error fetching users:', err);
          setUsersError(err.message);
        });
    }
  }, [token, user]);

  // ================================
  // 2) Add a new person
  // ================================
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

  // ================================
  // 3) Delete a Person
  // ================================
  const handleDeletePerson = (id) => {
    fetch(`http://localhost:5000/api/persons/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setPersons(persons.filter(person => person._id !== id)))
      .catch(err => console.error('Error deleting person:', err));
  };

  // ================================
  // 4) Sort persons & rank
  // ================================
  const sortedPersons = [...persons].sort((a, b) => {
    // FIX: include additionalPoints in totalPoints
    const totalA = a.difficulty + a.cleanness + a.creativity + a.presentation + (a.additionalPoints || 0);
    const totalB = b.difficulty + b.cleanness + b.creativity + b.presentation + (b.additionalPoints || 0);
    return totalB - totalA; // biggest total first
  });

  // ================================
  // 5) CSV DOWNLOAD LOGIC
  // ================================
  const handleDownloadCSV = () => {
    let csv = 'Rank,Name,Difficulty,Cleanness,Creativity,Presentation,Additional Points,Total Points\n';
    sortedPersons.forEach((person, index) => {
      const rank = index + 1;
      const totalPoints = person.difficulty + person.cleanness + person.creativity + person.presentation + (person.additionalPoints || 0);
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

  // ================================
  // 6) Delete a User (Premium-only)
  // ================================
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setUsersList(usersList.filter(u => u._id !== id)))
      .catch(err => console.error('Error deleting user:', err));
  };

  // ================================
  // 7) Edit a Person (Admin-only)
  // ================================
  const startEditing = (person) => {
    setEditingPersonId(person._id);
    // Populate fields with current data
    setEditDifficulty(person.difficulty.toString());
    setEditCleanness(person.cleanness.toString());
    setEditCreativity(person.creativity.toString());
    setEditPresentation(person.presentation.toString());
    setEditAdditionalPoints(person.additionalPoints ? person.additionalPoints.toString() : '0');
  };

  const cancelEditing = () => {
    setEditingPersonId(null);
  };

  const saveEditing = (id) => {
    // Validate input
    const diffValue = parseInt(editDifficulty, 10);
    if (isNaN(diffValue) || diffValue < 0 || diffValue > 10) {
      alert('Difficulty must be 0-10');
      return;
    }
    const cleanValue = parseInt(editCleanness, 10);
    if (isNaN(cleanValue) || cleanValue < 0 || cleanValue > 5) {
      alert('Cleanness must be 0-5');
      return;
    }
    const creatValue = parseInt(editCreativity, 10);
    if (isNaN(creatValue) || creatValue < 0 || creatValue > 10) {
      alert('Creativity must be 0-10');
      return;
    }
    const presValue = parseInt(editPresentation, 10);
    if (isNaN(presValue) || presValue < 0 || presValue > 10) {
      alert('Presentation must be 0-10');
      return;
    }
    const addPointsValue = editAdditionalPoints.trim() === ''
      ? 0
      : parseInt(editAdditionalPoints, 10);
    if (isNaN(addPointsValue) || addPointsValue < 0 || addPointsValue > 15) {
      alert('Additional Points must be 0-15');
      return;
    }

    // PUT request to update
    const payload = {
      difficulty: diffValue,
      cleanness: cleanValue,
      creativity: creatValue,
      presentation: presValue,
      additionalPoints: addPointsValue,
    };
    fetch(`http://localhost:5000/api/persons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update person');
        }
        return res.json();
      })
      .then(updatedPerson => {
        // Update local state
        setPersons(persons.map(p => p._id === updatedPerson._id ? updatedPerson : p));
        setEditingPersonId(null);
      })
      .catch(err => console.error(err));
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

        {/* ======================================= */}
        {/* Add Person Section (Admin & Premium) */}
        {/* ======================================= */}
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
              inputProps={{ min: 0, max: 10 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Cleanness (0-5)"
              type="number"
              fullWidth
              value={cleanness}
              onChange={(e) => setCleanness(e.target.value)}
              inputProps={{ min: 0, max: 5 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Creativity (0-10)"
              type="number"
              fullWidth
              value={creativity}
              onChange={(e) => setCreativity(e.target.value)}
              inputProps={{ min: 0, max: 10 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Presentation (0-10)"
              type="number"
              fullWidth
              value={presentation}
              onChange={(e) => setPresentation(e.target.value)}
              inputProps={{ min: 0, max: 10 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Additional Points (0-15)"
              type="number"
              fullWidth
              value={additionalPoints}
              onChange={(e) => setAdditionalPoints(e.target.value)}
              inputProps={{ min: 0, max: 15 }}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddPerson}>
              Add Person
            </Button>
          </Paper>
        )}

        {/* ================================================== */}
        {/* People List + CSV Download + Row Coloring + Edit */}
        {/* ================================================== */}
        <Typography variant="h5" sx={{ display: 'inline-block', mr: 2 }}>
          People List
        </Typography>
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
                // Calculate total including additionalPoints
                const totalPoints =
                  person.difficulty +
                  person.cleanness +
                  person.creativity +
                  person.presentation +
                  (person.additionalPoints || 0);

                // Color highlighting
                let bgColor = 'white';
                if (index + 1 <= 12) {
                  bgColor = '#D9F2D9'; // Light green
                } else if (index + 1 <= 20) {
                  bgColor = '#FFF6BA'; // Light yellow
                }

                // If this row is in edit mode
                const isEditing = editingPersonId === person._id;

                return (
                  <TableRow key={person._id} sx={{ backgroundColor: bgColor }}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{person.name}</TableCell>

                    {/* Difficulty */}
                    <TableCell>
                      {isEditing && user?.role === 'admin' ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editDifficulty}
                          onChange={e => setEditDifficulty(e.target.value)}
                          inputProps={{ min: 0, max: 10 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        person.difficulty
                      )}
                    </TableCell>

                    {/* Cleanness */}
                    <TableCell>
                      {isEditing && user?.role === 'admin' ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editCleanness}
                          onChange={e => setEditCleanness(e.target.value)}
                          inputProps={{ min: 0, max: 5 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        person.cleanness
                      )}
                    </TableCell>

                    {/* Creativity */}
                    <TableCell>
                      {isEditing && user?.role === 'admin' ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editCreativity}
                          onChange={e => setEditCreativity(e.target.value)}
                          inputProps={{ min: 0, max: 10 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        person.creativity
                      )}
                    </TableCell>

                    {/* Presentation */}
                    <TableCell>
                      {isEditing && user?.role === 'admin' ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editPresentation}
                          onChange={e => setEditPresentation(e.target.value)}
                          inputProps={{ min: 0, max: 10 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        person.presentation
                      )}
                    </TableCell>

                    {/* Additional Points */}
                    <TableCell>
                      {isEditing && user?.role === 'admin' ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editAdditionalPoints}
                          onChange={e => setEditAdditionalPoints(e.target.value)}
                          inputProps={{ min: 0, max: 15 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        person.additionalPoints
                      )}
                    </TableCell>

                    {/* Total */}
                    <TableCell>{totalPoints}</TableCell>

                    {/* Actions */}
                    <TableCell>
                      {(user?.role === 'admin' || user?.role === 'premium') && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeletePerson(person._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}

                      {/* Edit button only if admin */}
                      {user?.role === 'admin' && (
                        isEditing ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => saveEditing(person._id)}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              color="inherit"
                              onClick={cancelEditing}
                            >
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="primary"
                            onClick={() => startEditing(person)}
                          >
                            <EditIcon />
                          </IconButton>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ====================================== */}
        {/* Users Table (Premium or Admin only)    */}
        {/* ====================================== */}
        {(user?.role === 'premium' || user?.role === 'admin') && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>All Users</Typography>
            {usersError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {usersError}
              </Typography>
            )}
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
                  {usersList.map(u => (
                    <TableRow key={u._id}>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        {/* Only Premium can delete users (per your code) */}
                        {user?.role === 'premium' && (
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteUser(u._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default PersonsPage;
