const express = require("express");
const Person = require("../models/Person"); // Ensure this is the correct model

const router = express.Router();

// Route to add a new person
router.post("/add", async (req, res) => {
    const { name, age, city } = req.body;

    try {
        const newPerson = new Person({ name, age, city });
        await newPerson.save(); // Save to the database
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all people
router.get("/all", async (req, res) => {
    try {
        const people = await Person.find(); // Fetch all entries
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