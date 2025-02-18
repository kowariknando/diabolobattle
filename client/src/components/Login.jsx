import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setToken, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use absolute URL to reach your backend
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      setToken(res.data.token);
      // Decode token payload (for demonstration purposes)
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      setUser(payload);
      // Redirect to PersonsPage after successful login
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed: Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
