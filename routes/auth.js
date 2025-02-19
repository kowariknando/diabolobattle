const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure your User model exists in server/models/User.js
const bcrypt = require('bcrypt'); // or use 'bcryptjs'
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Registration route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Optionally, check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user (default role is 'regular' if not provided)
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'regular'
    });

    await newUser.save();
    return res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    // Check for duplicate key error (error code 11000)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare the plain-text password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token if credentials are valid
    const payload = { id: user._id, username: user.username, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
