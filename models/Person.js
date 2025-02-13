const mongoose = require("mongoose");

// Define the schema (structure of our data)
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
});

// Create a model from the schema
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
