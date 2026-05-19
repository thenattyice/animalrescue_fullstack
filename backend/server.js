const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB connection function
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Animal Rescue API is running");
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
