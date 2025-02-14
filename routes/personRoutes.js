const express = require("express");
const Person = require("../models/Person");

const router = express.Router();

// Route to add a new person with new criteria fields
router.post("/add", async (req, res) => {
    const { name, difficulty, cleanness, creativity, presentation, additionalPoints } = req.body;

    // Validate that required fields are provided (note: additionalPoints is optional)
    if (!name || difficulty === undefined || cleanness === undefined || creativity === undefined || presentation === undefined) {
        return res.status(400).json({ message: "Please provide name, difficulty, cleanness, creativity, and presentation." });
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
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all people
router.get("/all", async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a person by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletedPerson) {
            return res.status(404).json({ message: "Person not found" });
        }
        res.json({ message: "Person deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
