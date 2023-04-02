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
const io = require("socket.io");

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
  const server = app.listen(5000);

  const socket = io(server, {
    pingTimeout: 6000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  socket.on("connection", (stream) => {
    console.log("connected to socekt io");

    stream.on("setup", (user) => {
      stream.join(user.id);
    });

    stream.on("join group", (group) => {
      if (group) {
        stream.join(group.id);
        console.log(group);
      }
    });

    stream.on("new Msg", (newMsgRecived) => {
      newMsgRecived.group.users.forEach((user) => {
        // if (user.id === newMsgRecived.chat.userId) return;
        stream.in(user.id).emit("msg recived", newMsgRecived);
      });
    });

    stream.off("setup", (user) => {
      stream.leave(user.id);
    });
  });
};

runServer();
