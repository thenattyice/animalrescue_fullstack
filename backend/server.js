const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB connection function
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:4200",
  }),
);
app.use(express.json());

// Routers
const authRoutes = require("./routes/authRoutes");
const dogRoutes = require("./routes/dogRoutes");
const monkeyRoutes = require("./routes/monkeyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", dogRoutes);
app.use("/api", monkeyRoutes);

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
