// mern-app/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const auth = require('../middleware/auth'); // ✅ Ensure authentication

// Get all persons (Requires authentication)
router.get('/', auth, async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new person (Admin & Premium users only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'premium') {
        return res.status(403).json({ message: 'Forbidden: Only Admins & Premium users can add persons.' });
    }

    const { name, difficulty, cleanness, creativity, presentation, additionalPoints } = req.body;

    if (
        typeof difficulty !== 'number' || difficulty < 0 || difficulty > 10 ||
        typeof cleanness !== 'number' || cleanness < 0 || cleanness > 5 ||
        typeof creativity !== 'number' || creativity < 0 || creativity > 10 ||
        typeof presentation !== 'number' || presentation < 0 || presentation > 10 ||
        (additionalPoints !== undefined && (typeof additionalPoints !== 'number' || additionalPoints < 0 || additionalPoints > 15))
    ) {
        return res.status(400).json({ message: 'Invalid input values. Ensure they are within valid ranges.' });
    }

    const person = new Person({
        name,
        difficulty,
        cleanness,
        creativity,
        presentation,
        additionalPoints: additionalPoints || 0
    });

    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a person (Admin & Premium users only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'premium') {
        return res.status(403).json({ message: 'Forbidden: Only Admins & Premium users can delete persons.' });
    }

    try {
        await Person.findByIdAndDelete(req.params.id);
        res.json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
