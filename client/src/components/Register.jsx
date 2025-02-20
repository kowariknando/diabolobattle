// client/src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import NavBar from './NavBar';  // ✅ Import NavBar
import Footer from './Footer';  // ✅ Import Footer

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('regular'); // Default role is regular user
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(data.message || 'Registration failed');
        }
    };

    return (
        <>
            <NavBar />  {/* ✅ Add NavBar */}
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                        Register
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success.main">{success}</Typography>}
                    <form onSubmit={handleRegister}>
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
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Role</InputLabel>
                            <Select value={role} onChange={(e) => setRole(e.target.value)}>
                                <MenuItem value="regular">Regular User</MenuItem>
                                <MenuItem value="premium">Premium User</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                            Register
                        </Button>
                    </form>
                </Paper>
            </Container>
            <Footer />  {/* ✅ Add Footer */}
        </>
    );
}

export default Register;
