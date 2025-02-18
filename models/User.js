const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // This will store a hashed password
  role: { type: String, enum: ['admin', 'premium', 'regular'], default: 'regular' }
});

module.exports = mongoose.model('User', UserSchema);
