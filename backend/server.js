const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dogRoutes = require("./routes/dogRoutes");
const monkeyRoutes = require("./routes/monkeyRoutes");

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:4200",
  }),
);
app.use(express.json());
app.use(mongoSanitize());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
});

app.use("/api/auth", authLimiter);

// Routers
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
