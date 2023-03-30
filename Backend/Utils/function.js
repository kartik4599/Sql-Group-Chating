const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.genrateToken = (userId) => {
  return jwt.sign(userId, process.env.JWTToken);
};

exports.authToken = (token) => {
  let senduser;
  jwt.verify(token, process.env.JWTToken, (err, user) => {
    if (err) {
      console.log(err);
    }
    senduser = user;
  });
  return senduser;
};
