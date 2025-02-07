import { Request, Response } from "express";
import { prisma } from "../prisma/db";

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    try {
      const { name, email, phone, instituteType } = req.body;
      await prisma.institute.create({
        data: { name, email, phone, instituteType },
      });
      res.send("ok");
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async addUser(req: Request, res: Response) {
    try {
      const { id, userId } = req.body;

      await prisma.institute.update({
        where: { id },
        data: {
          users: { connect: [{ id: userId }] },
        },
        include: { users: true },
      });

      res.send("ok");
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getInstitutes(req: Request, res: Response) {
    try {
      const institutes = await prisma.institute.findMany({
        include: { users: true },
      });

      res.send(institutes);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async editInstitute(req: Request, res: Response) {
    try {
      const { id, name, email, phone, instituteType } = req.body;

      const updatedInstitute = await prisma.institute.update({
        where: { id },
        data: { name, email, phone, instituteType },
      });

      res.send(updatedInstitute);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default InstituteController;
