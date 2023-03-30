const express = require("express");
const authRouters = require("./Routes/authRoutes");
const DataBase = require("./Utils/database");
const cors = require("cors");
const chatRouters = require("./Routes/chatRoutes");
const User = require("./Model/userModel");
const Chat = require("./Model/chatModel");
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

User.hasMany(Chat);
Chat.belongsTo(User);

const runServer = async () => {
  const db = await DataBase.sync();
  console.log(`Started ${db.options.dialect} on ${db.options.host}`.magenta);
  app.listen(5000);
};

runServer();
