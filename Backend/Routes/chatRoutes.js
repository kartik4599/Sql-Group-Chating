const express = require("express");
const chatRouters = express.Router();
const chatController = require("../Controllers/chatController");
const { vertifyUser } = require("../Middleware/verifyUser");

chatRouters.post("/", vertifyUser, chatController.postChat);

chatRouters.get("/", vertifyUser, chatController.getAllChat);

module.exports = chatRouters;
