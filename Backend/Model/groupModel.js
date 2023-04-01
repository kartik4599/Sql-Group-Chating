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
  admin: {
    type: sequelize.STRING,
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue("admin"));
    },
    set: function (val) {
      return this.setDataValue("admin", JSON.stringify(val));
    },
  },
});

module.exports = Group;
