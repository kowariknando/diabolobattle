const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 0, max: 10 },
  cleanness: { type: Number, required: true, min: 0, max: 5 },
  creativity: { type: Number, required: true, min: 0, max: 10 },
  presentation: { type: Number, required: true, min: 0, max: 10 },
  additionalPoints: { type: Number, required: false, min: 0, max: 15 }
});

module.exports = mongoose.model("Person", personSchema);
