const { prisma } = require("../db");
const { connect } = require("../routes");

class instituteController {
  static async createInstitute(req, res) {
    try {
      const { name, email, phone } = req.body;
      await prisma.institute.create({
        data: {
          name,
          email,
          phone,
        },
      });
      res.send("ok");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async addUser(req, res) {
    try {
      const { id, userId } = req.body;
      //   const user = await  prisma.user.findOne({
      //         where:{
      //             id:userId
      //         }
      //     })
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
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = instituteController;
