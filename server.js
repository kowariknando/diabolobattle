// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const personsRoutes = require('./routes/persons'); // if used

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (make sure your MongoDB is running)
mongoose.connect('mongodb://localhost/diabolobattle', {
  // Options can be omitted if using Node MongoDB Driver v4+
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/persons', personsRoutes); // if you have person routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
