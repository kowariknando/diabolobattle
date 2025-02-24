// client/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Link } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

function Login({ setToken, setUser }) { // <-- Accept setUser as prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store token and user in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Update state in App.jsx
      setToken(data.token);
      setUser(data.user);  // <-- Important!

      navigate('/persons');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/register" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default Login;
