// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const personsRoutes = require('./routes/persons');
const userRoutes = require('./routes/users'); // new route

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/diabolobattle')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/persons', personsRoutes);
app.use('/api/users', userRoutes); // mount the users route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
