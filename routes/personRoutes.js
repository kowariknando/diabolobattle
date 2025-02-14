const express = require("express");
const Person = require("../models/Person");

const router = express.Router();

// POST /people/add
router.post("/add", async (req, res) => {
  const { name, difficulty, cleanness, creativity, presentation, additionalPoints } = req.body;

  if (
    !name ||
    difficulty === undefined ||
    cleanness === undefined ||
    creativity === undefined ||
    presentation === undefined
  ) {
    return res.status(400).json({
      message: "Please provide name, difficulty, cleanness, creativity, and presentation."
    });
  }

  try {
    const newPerson = new Person({
      name,
      difficulty,
      cleanness,
      creativity,
      presentation,
      additionalPoints
    });
    await newPerson.save();
    return res.status(201).json(newPerson);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// GET /people/all
router.get("/all", async (req, res) => {
  try {
    const people = await Person.find();
    return res.json(people);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE /people/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    return res.json({ message: "Person deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
