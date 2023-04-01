const express = require("express");
const groupRouters = express.Router();
const groupControllers = require("../Controllers/groupController");
const { vertifyUser } = require("../Middleware/verifyUser");

groupRouters.post("/", vertifyUser, groupControllers.createGroup);

groupRouters.get("/", vertifyUser, groupControllers.getGroup);

groupRouters.post("/addAdmin", groupControllers.addAdmin);

groupRouters.post("/removeAdmin", groupControllers.removeAdmin);

groupRouters.post("/addUser", groupControllers.addUser);

groupRouters.post("/removeUser", groupControllers.removeUser);

module.exports = groupRouters;
