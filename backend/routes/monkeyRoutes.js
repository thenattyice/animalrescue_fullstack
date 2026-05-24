const express = require("express");
const router = express.Router();

const monkeyController = require("../controllers/monkeyController");
const authenticateJWT = require("../middleware/authMiddleware");

// Routes for /monkeys endpoint
router
  .route("/monkeys")
  .get(authenticateJWT, monkeyController.monkeysList) // GET method for returning all monkeys
  .post(authenticateJWT, monkeyController.monkeysAddMonkey); // POST method for adding a monkey

// Routes for /monkeys/:id endpoint
router
  .route("/monkeys/:id")
  .get(authenticateJWT, monkeyController.monkeysFindById)
  .put(authenticateJWT, monkeyController.monkeysUpdateMonkey);

module.exports = router;
