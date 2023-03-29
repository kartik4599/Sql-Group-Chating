const Sequilize = require("sequelize");

const DataBase = new Sequilize("chat","root","root1234",{
    dialect:"mysql",
    host:"localhost"
});

module.exports = DataBase;
