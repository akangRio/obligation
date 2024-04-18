const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const hasher = (password) => {
  return bcrypt.hashSync(password, salt);
};
const passValidator = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
module.exports = { hasher, passValidator };
