// client/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('regular');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role
      });
      alert(res.data.message); // e.g. "User registered successfully"
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      alert('Registration failed: ' + (err.response?.data.message || err.message));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}
      >
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
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

        {/* For testing, allow role selection */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="role-label">Role (for testing)</InputLabel>
          <Select
            labelId="role-label"
            label="Role (for testing)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="regular">Regular</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
