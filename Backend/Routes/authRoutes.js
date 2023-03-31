const express = require("express");
const authRouters = express.Router();
const authController = require("../Controllers/authController");

authRouters.post("/signup", authController.signup);

authRouters.post("/login", authController.login);

authRouters.get("/user", authController.searchUser);

module.exports = authRouters;
