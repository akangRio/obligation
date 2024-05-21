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
      delete createNewUser.instituteId;

      res.send(createNewUser);
    } catch (err) {
      res.status(401).send(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkedUser = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          institute: true,
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
        instituteId: checkedUser.instituteId,
        instituteType: checkedUser.institute?.instituteType
          ? checkedUser.institute?.instituteType
          : null,
      });

      res.send(access_token);
    } catch (err) {
      res.status(401).send(err.message);
    }
  }

  static async getUsers(req, res) {
    try {
      const { search } = req.query;
      const { instituteId, role, instituteType } = req.identity;
      if (instituteId == null && role !== "ADMIN") {
        throw new Error(`you haven't assigned into specific institute`);
      }

      let option = {};
      if (role == "ADMIN") {
        option.include = {
          institute: true,
        };
        option.omit = { password: true };
        if (search && search != "") {
          option.where = {
            OR: [
              {
                name: {
                  contains: "%" + search + "%",
                },
              },
              {
                email: {
                  contains: "%" + search + "%",
                },
              },
              {
                phone: {
                  contains: "%" + search + "%",
                },
              },
              {
                institute: {
                  name: {
                    contains: "%" + search + "%",
                  },
                },
              },
            ],
          };
        }
      } else if (role == "EXCECUTIVE" && instituteType == "INT") {
        option.include = {
          institute: true,
        };
        option.where = {
          role: {
            not: "ADMIN",
          },
        };
        option.omit = { password: true };
      } else {
        option.where = {
          role: {
            not: "ADMIN",
          },
        };
        option.where = {
          instituteId: instituteId,
        };
        option.include = { institute: true };
        option.omit = { password: true };
      }

      const users = await prisma.user.findMany(option);
      res.send(users);
    } catch (err) {
      res.send(err.message);
    }
  }

  static async editUser(req, res) {
    try {
      const { id, name, email, phone, instituteId, role } = req.body;
      const editedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          instituteId,
          role,
        },
      });

      delete editedUser.password;

      res.send(editedUser);
    } catch (err) {
      res.send(err);
    }
  }

  static async editUserPassword(req, res) {
    try {
      const { id, oldpassword, newPassword } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!passValidator(oldpassword, user.password)) {
        throw new Error("wrong password");
      }

      const hashedPass = hasher(newPassword);

      const updatePassword = await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPass,
        },
      });
      res.send("password has been changed");
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = userController;
