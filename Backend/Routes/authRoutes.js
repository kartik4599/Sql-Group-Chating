const express = require("express");
const authRouters = express.Router();
const authController = require("../Controllers/authController");

authRouters.post("/signup", authController.signup);

module.exports = authRouters;
