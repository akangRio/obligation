const { prisma } = require("../db");

class instituteController {
  static async createInstitute(req, res) {
    try {
      const { name, email, phone, instituteType } = req.body;
      await prisma.institute.create({
        data: {
          name,
          email,
          phone,
          instituteType,
        },
      });
      res.send("ok");
    } catch (err) {
      res.send(err);
    }
  }

  static async addUser(req, res) {
    try {
      const { id, userId } = req.body;

      await prisma.institute.update({
        where: {
          id,
        },
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
            ],
          },
        },
        include: {
          users: true, // Include all posts in the returned object
        },
      });
      res.send("ok");
    } catch (err) {
      res.send(err);
    }
  }

  static async getInstitutes(req, res) {
    try {
      const institutes = await prisma.institute.findMany({});
      res.send(institutes);
    } catch (err) {
      res.send(err);
    }
  }

  static async editInstitute(req, res) {
    try {
      const { id, name, email, phone } = req.body;
      const updateInstitute = await prisma.institute.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
        },
      });
      res.send(updateInstitute);
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = instituteController;
