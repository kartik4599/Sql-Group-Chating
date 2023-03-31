const express = require("express");
const authRouters = require("./Routes/authRoutes");
const DataBase = require("./Utils/database");
const cors = require("cors");
const chatRouters = require("./Routes/chatRoutes");
const User = require("./Model/userModel");
const Chat = require("./Model/chatModel");
const Group = require("./Model/groupModel");
const groupRouters = require("./Routes/groupRoutes");
const Group_User = require("./Model/Group_User");
require("colors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/auth", authRouters);

app.use("/api/chat", chatRouters);

app.use("/api/group", groupRouters);

// Table Relation
User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User, { through: Group_User });
User.belongsToMany(Group, { through: Group_User });

Group.hasMany(Chat);
Chat.belongsTo(Group);

// Table Relation

const runServer = async () => {
  const db = await DataBase.sync();
  app.listen(5000);
};

runServer();
