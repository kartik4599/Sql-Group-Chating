const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.genrateToken = (userId) => {
  return jwt.sign(userId, process.env.JWTToken);
};
