const { prisma } = require("../db");

class userController {
  static async createUser(req, res) {
    const { name, email, phone, role, password } = req.body;
    const createNewUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        password,
      },
    });
    const user = await prisma.user.findMany();

    console.log(req.body);
    res.send(user);
  }
}

module.exports = userController;
