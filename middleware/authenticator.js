const { verifyToken } = require("../helpers/jwt");

const authenticating = (req, res, next) => {
  const { access_token } = req.headers;
  const payload = verifyToken(access_token);
  if (!payload) {
    throw { name: "Invalid Token" };
  }

  req.identity = payload;

  next();
};

module.exports = authenticating;
