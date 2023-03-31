const sequelize = require("sequelize");
const DataBase = require("../Utils/database");

const Group_User = DataBase.define("group_user", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Group_User;
