const express = require("express");
const authRouters = require("./Routes/authRoutes");
const DataBase = require("./Utils/database");
const cors = require("cors");
require("colors");
const app = express();

app.use(cors(
  
));
app.use(express.json());

app.use("/api/auth", authRouters);

const runServer = async () => {
  const db = await DataBase.sync();
  console.log(`Started ${db.options.dialect} on ${db.options.host}`.magenta);
  app.listen(5000);
};

runServer();
