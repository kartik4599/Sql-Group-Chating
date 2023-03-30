const sequelize = require("sequelize");
const DataBase = require("../Utils/database");

const Chat = DataBase.define("chats", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Chat;
