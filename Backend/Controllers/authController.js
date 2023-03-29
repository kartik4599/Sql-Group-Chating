const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { genrateToken } = require("../Utils/function");
require("colors");

exports.signup = async (req, res) => {
  try {
    const { name, email, phoneNo, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const currentuser = await User.create({
      name,
      email,
      phoneNo,
      password: hashPassword,
    });

    if (currentuser) {
      res.status(200).json({ msg: "Success", user: currentuser });
    }
  } catch (e) {
    const { email, phoneNo } = req.body;
    console.log(e);
    let previoususer = await User.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNo }],
      },
    });
    previoususer = JSON.parse(JSON.stringify(previoususer));

    if (previoususer.length > 0) {
      res.status(200).json({
        msg: "User allready exist",
        user: JSON.stringify(previoususer),
      });
    } else {
      res.status(400).json({ msg: "error occured" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let currentUser = await User.findAll({
      where: {
        email,
      },
    });

    currentUser = JSON.parse(JSON.stringify(currentUser));

    if (currentUser.length > 0) {
      const result = await bcrypt.compare(password, currentUser[0].password);
      console.log(`${result}`.bgCyan);
      if (result) {
        const jwt = genrateToken({ id: currentUser[0].id });

        res.status(200).json({ msg: "Success", user: currentUser, jwt });
      } else {
        res.status(200).json({ msg: "Wrong Password" });
      }
    } else res.status(200).json({ msg: "Wrong Email" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Error occured" });
  }
};
