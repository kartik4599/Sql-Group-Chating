const User = require("../Model/userModel");
const { authToken } = require("../Utils/function");

exports.vertifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let user = authToken(token);
    user = await User.findByPk(user.id);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "User not Verified" });
  }
};
