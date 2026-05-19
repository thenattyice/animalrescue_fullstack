const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Define routes for login and register
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

module.exports = router;
