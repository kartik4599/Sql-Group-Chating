const express = require("express");
const authRouters = require("./Routes/authRoutes");
const DataBase = require("./Utils/database");
// const bodyParser = require("");
require("colors");
const app = express();

app.use(express.json());

app.use("/api/auth", authRouters);

const runServer = async () => {
  const db = await DataBase.sync();
  console.log(`Started ${db.options.dialect} on ${db.options.host}`.magenta);
  app.listen(5000);
};

runServer();
