const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// Define the POST route for user registration
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
