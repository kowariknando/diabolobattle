// mern-app/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users (Admin only)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const users = await User.find().select('-password'); // Exclude passwords from response
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user (Premium users only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'premium') {
        return res.status(403).json({ message: 'Forbidden: Only Premium users can delete users.' });
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
