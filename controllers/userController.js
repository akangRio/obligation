const { prisma } = require("../db");
const { hasher, passValidator } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

class userController {
  static async createUser(req, res) {
    try {
      const { name, email, phone, role, password } = req.body;
      const hashedPass = hasher(password);

      const createNewUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          role,
          password: hashedPass,
        },
      });

      delete createNewUser.password;
      delete createNewUser.id;
      delete createNewUser.instituteId;

      res.send(createNewUser);
    } catch (err) {
      res.send(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkedUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!checkedUser) {
        throw new Error("please check your input again");
      }
      if (!passValidator(password, checkedUser.password)) {
        throw new Error("please check your input again");
      }
      const access_token = signToken({
        userId: checkedUser.id,
        email: checkedUser.email,
        name: checkedUser.name,
        role: checkedUser.role,
      });

      res.send(access_token);
    } catch (err) {
      res.send(err.message);
    }
  }
}

module.exports = userController;
