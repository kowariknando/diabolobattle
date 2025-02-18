const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Person = require('../models/Person'); // Ensure you have this model defined

// Get persons: all authenticated users can view the list
router.get('/', authenticateToken, async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching persons' });
  }
});

// Add a person: only admin and premium users can add
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'premium') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const newPerson = new Person(req.body);
  try {
    await newPerson.save();
    res.json(newPerson);
  } catch (err) {
    res.status(500).json({ message: 'Error adding person' });
  }
});

// Delete a person: only admin and premium users can delete
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'premium') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting person' });
  }
});

module.exports = router;
