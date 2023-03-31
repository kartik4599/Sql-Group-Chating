const express = require("express");
const groupRouters = express.Router();
const groupControllers = require("../Controllers/groupController");
const { vertifyUser } = require("../Middleware/verifyUser");

groupRouters.post("/", vertifyUser, groupControllers.createGroup);

groupRouters.get("/", vertifyUser, groupControllers.getGroup);

module.exports = groupRouters;
