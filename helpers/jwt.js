const jwt = require("jsonwebtoken");
const privateKey = process.env.SECRET;

function signToken(payload) {
  return jwt.sign(payload, privateKey);
}

function verifyToken(token) {
  return jwt.verify(token, privateKey);
}

module.exports = { signToken, verifyToken };
