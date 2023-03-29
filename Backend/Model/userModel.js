const sequelize = require("sequelize");
const DataBase = require("../Utils/database");

const User = DataBase.define("users", {
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
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  phoneNo: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
