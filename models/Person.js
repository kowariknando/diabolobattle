const mongoose = require("mongoose");

// Define the schema with the new criteria fields and a total field
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 0, max: 10 },
  cleanness: { type: Number, required: true, min: 0, max: 5 },
  creativity: { type: Number, required: true, min: 0, max: 10 },
  presentation: { type: Number, required: true, min: 0, max: 10 },
  additionalPoints: { type: Number, required: false, min: 0, max: 15 },
  total: { type: Number } // New field for the total points
});

// Pre-save hook to calculate the total points automatically
personSchema.pre("save", function (next) {
  // Sum the fields; if additionalPoints is not provided, treat it as 0
  this.total =
    this.difficulty +
    this.cleanness +
    this.creativity +
    this.presentation +
    (this.additionalPoints || 0);
  next();
});

module.exports = mongoose.model("Person", personSchema);
