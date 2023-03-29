const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.signup = async (req, res) => {
  const { name, email, phoneNo, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const currentuser = await User.create({
      name,
      email,
      phoneNo,
      password: hashPassword,
    });

    if (currentuser) {
      res.status(200).json(currentuser);
    }
  } catch (e) {
    console.log(e);
    let previoususer = await User.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNo }],
      },
    });
    previoususer = JSON.parse(JSON.stringify(previoususer));

    if (previoususer.length > 0) {
      res.status(500).json({
        msg: "User allready exist",
        user: JSON.stringify(previoususer),
      });
    } else {
      res.status(400).json({ msg: "error occured" });
    }
  }
};
