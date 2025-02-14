const mongoose = require("mongoose");

// Define the schema with the new criteria fields
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    difficulty: { type: Number, required: true, min: 0, max: 10 },
    cleanness: { type: Number, required: true, min: 0, max: 5 },
    creativity: { type: Number, required: true, min: 0, max: 10 },
    presentation: { type: Number, required: true, min: 0, max: 10 },
    additionalPoints: { type: Number, required: false, min: 0, max: 15 }
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
