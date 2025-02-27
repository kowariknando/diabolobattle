// mern-app/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const auth = require('../middleware/auth');

// GET all persons...
// POST new person...
// DELETE person...

// ADD THIS PUT ROUTE FOR ADMIN-ONLY EDIT
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only Admin can edit persons.' });
  }

  try {
    const { difficulty, cleanness, creativity, presentation, additionalPoints } = req.body;

    // Basic validation
    if (typeof difficulty !== 'number' || difficulty < 0 || difficulty > 10 ||
        typeof cleanness !== 'number' || cleanness < 0 || cleanness > 5 ||
        typeof creativity !== 'number' || creativity < 0 || creativity > 10 ||
        typeof presentation !== 'number' || presentation < 0 || presentation > 10 ||
        typeof additionalPoints !== 'number' || additionalPoints < 0 || additionalPoints > 15
    ) {
      return res.status(400).json({ message: 'Invalid numeric fields or out of range.' });
    }

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      {
        difficulty,
        cleanness,
        creativity,
        presentation,
        additionalPoints
      },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
