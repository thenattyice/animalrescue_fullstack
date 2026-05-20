const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogController");
const authenticateJWT = require("../middleware/authMiddleware");

// Routes for /dogs endpoint
router
  .route("/dogs")
  .get(authenticateJWT, dogController.dogsList) // GET method for returning all dogs
  .post(authenticateJWT, dogController.dogsAddDog); // POST method for adding a dog

// Routes for /dogs/:id endpoint
router
  .route("/dogs/:id")
  .get(authenticateJWT, dogController.dogsFindById)
  .put(authenticateJWT, dogController.dogsUpdateDog);

module.exports = router;
