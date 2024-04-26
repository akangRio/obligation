const { verifyToken } = require("../helpers/jwt");

const authenticating = (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization == "") {
    throw new Error("not authorized");
  }

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
