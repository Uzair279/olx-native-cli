require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const tokenGenerator = (payload) => {
  return jwt.sign(payload, SECRET);
};

module.exports = tokenGenerator;
