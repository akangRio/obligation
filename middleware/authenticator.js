const { verifyToken } = require("../helpers/jwt");

const authenticating = (req, res, next) => {
  const bearerHeader = req.headers.authorization.split(" ");
  const access_token = bearerHeader[1];

  const payload = verifyToken(access_token);
  if (!payload) {
    throw { name: "Invalid Token" };
  }

  req.identity = payload;

  next();
};

module.exports = authenticating;
