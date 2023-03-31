const sequelize = require("sequelize");
const DataBase = require("../Utils/database");

const Group = DataBase.define("group", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  // admin: {
  //   type: sequelize.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = Group;
