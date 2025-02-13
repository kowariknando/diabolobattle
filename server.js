const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const personRoutes = require("./routes/personRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/people", personRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Basic API route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Export the app for testing
module.exports = app;

// Start the server only if not in testing mode
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
