import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PersonsPage({ token, user, logout }) {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    difficulty: 1,
    cleanness: 1,
    creativity: 1,
    presentation: 1,
    additionalPoints: 0
  });

  // Fetch the list of persons
  const fetchPersons = async () => {
    try {
      // Use the absolute URL or a proxy to reach your backend
      const res = await axios.get('http://localhost:5000/api/persons', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersons(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching persons');
    }
  };

  useEffect(() => {
    fetchPersons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a person (admin/premium only)
  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/persons',
        newPerson,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPersons();
      // Reset form
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

  // Delete a person (admin/premium only)
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

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Diabolo Battle - Add Person</h1>
      <h2>Welcome, {user?.username}!</h2>

      {/* Only show Add Person form if user is admin or premium */}
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
                onChange={(e) => setNewPerson({ ...newPerson, additionalPoints: +e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Add Person</button>
          </form>
        </div>
      )}

      <h2>People List</h2>
      <ul>
        {persons.map((person) => (
          <li key={person._id} style={{ marginBottom: '0.5rem' }}>
            <strong>{person.name}</strong> (Difficulty: {person.difficulty},
            Cleanness: {person.cleanness}, Creativity: {person.creativity},
            Presentation: {person.presentation}, Additional Points: {person.additionalPoints})
            {(user?.role === 'admin' || user?.role === 'premium') && (
              <button
                onClick={() => handleDeletePerson(person._id)}
                style={{ marginLeft: '1rem' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default PersonsPage;
