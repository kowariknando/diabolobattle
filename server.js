require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const personRoutes = require("./routes/personRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use /people prefix
app.use("/people", personRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic API route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
