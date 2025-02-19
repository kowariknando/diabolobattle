// client/src/components/PersonsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PersonsPage({ token, user, logout }) {
  const [persons, setPersons] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    difficulty: 1,
    cleanness: 1,
    creativity: 1,
    presentation: 1,
    additionalPoints: 0
  });

  // Fetch persons from the backend
  const fetchPersons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/persons', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersons(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching persons');
    }
  };

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching users');
    }
  };

  useEffect(() => {
    fetchPersons();
    if (user && user.role === 'admin') {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Handler for adding a new person
  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/persons',
        newPerson,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPersons();
      // Reset form fields
      setNewPerson({
        name: '',
        difficulty: 1,
        cleanness: 1,
        creativity: 1,
        presentation: 1,
        additionalPoints: 0
      });
    } catch (err) {
      console.error(err);
      alert('Error adding person');
    }
  };

  // Handler for deleting a person (admin/premium only)
  const handleDeletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/persons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPersons();
    } catch (err) {
      console.error(err);
      alert('Error deleting person');
    }
  };

  // Handler for deleting a user (admin only)
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error deleting user');
    }
  };

  // Compute total points for a person (ensuring additionalPoints defaults to 0)
  const getTotalPoints = (person) => {
    return (
      person.difficulty +
      person.cleanness +
      person.creativity +
      person.presentation +
      (person.additionalPoints ?? 0)
    );
  };

  // Create a sorted copy of persons (sorted by total points descending)
  const sortedPersons = [...persons].sort((a, b) => getTotalPoints(b) - getTotalPoints(a));

  return (
    <div style={{ padding: '1rem' }}>
      {/* Header Section with Welcome message and Logout button at the top right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '1rem'
        }}
      >
        <span style={{ marginRight: '1rem' }}>
          Welcome, {user?.username}!
        </span>
        <button onClick={logout}>Logout</button>
      </div>

      <h1>Diabolo Battle - Add Person</h1>

      {/* Add Person Form for Admin/Premium users */}
      {(user?.role === 'admin' || user?.role === 'premium') && (
        <div>
          <form onSubmit={handleAddPerson} style={{ marginBottom: '1rem' }}>
            <label>
              Name (required):
              <input
                type="text"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Difficulty (0-10, required):
              <input
                type="number"
                min="0"
                max="10"
                value={newPerson.difficulty}
                onChange={(e) => setNewPerson({ ...newPerson, difficulty: +e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Cleanness (0-5, required):
              <input
                type="number"
                min="0"
                max="5"
                value={newPerson.cleanness}
                onChange={(e) => setNewPerson({ ...newPerson, cleanness: +e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Creativity (0-10, required):
              <input
                type="number"
                min="0"
                max="10"
                value={newPerson.creativity}
                onChange={(e) => setNewPerson({ ...newPerson, creativity: +e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Presentation (0-10, required):
              <input
                type="number"
                min="0"
                max="10"
                value={newPerson.presentation}
                onChange={(e) => setNewPerson({ ...newPerson, presentation: +e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Additional Points (0-15, optional):
              <input
                type="number"
                min="0"
                max="15"
                value={newPerson.additionalPoints}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, additionalPoints: +e.target.value || 0 })
                }
              />
            </label>
            <br />
            <button type="submit">Add Person</button>
          </form>
        </div>
      )}

      {/* People List Table */}
      <h2>People List</h2>
      {sortedPersons.length === 0 ? (
        <p>No persons found.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Cleanness</th>
              <th>Creativity</th>
              <th>Presentation</th>
              <th>Additional Points</th>
              <th>Total Points</th>
              {(user?.role === 'admin' || user?.role === 'premium') && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedPersons.map((person, index) => (
              <tr key={person._id}>
                <td>{index + 1}</td>
                <td>{person.name}</td>
                <td>{person.difficulty}</td>
                <td>{person.cleanness}</td>
                <td>{person.creativity}</td>
                <td>{person.presentation}</td>
                <td>{person.additionalPoints ?? 0}</td>
                <td>{getTotalPoints(person)}</td>
                {(user?.role === 'admin' || user?.role === 'premium') && (
                  <td>
                    <button onClick={() => handleDeletePerson(person._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Admin-only: Users Management Table */}
      {user?.role === 'admin' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Users List (Admin Only)</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(u._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonsPage;
