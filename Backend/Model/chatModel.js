const sequelize = require("sequelize");
const DataBase = require("../Utils/database");

const Chat = DataBase.define("chat", {
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
  isImage: {
    type: sequelize.BOOLEAN,
  },
});

module.exports = Chat;
