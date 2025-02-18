// client/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('regular');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note the absolute URL pointing to your backend
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role
      });
      alert(res.data.message); // "User registered successfully"
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      alert('Registration failed: ' + (err.response?.data.message || err.message));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {/* For testing, you can allow role selection */}
        <div>
          <label>Role (for testing): </label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
