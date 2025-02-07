import { Request, Response } from "express";
import { prisma } from "../prisma/db";
import { hasher, passValidator } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

class UserController {
  static async createUser(req: Request, res: Response) {
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

      // Remove sensitive data
      const { password: _, instituteId: __, ...safeUser } = createNewUser;

      res.send(safeUser);
    } catch (err) {
      res.status(401).send((err as Error).message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const checkedUser = await prisma.user.findUnique({
        where: { email },
        include: { institute: true },
      });

      if (!checkedUser || !passValidator(password, checkedUser.password)) {
        throw new Error("please check your input again");
      }

      const access_token = signToken({
        userId: checkedUser.id,
        email: checkedUser.email,
        name: checkedUser.name,
        role: checkedUser.role,
        instituteId: checkedUser.instituteId,
        instituteType: checkedUser.institute?.instituteType ?? null,
      });

      res.send({ access_token });
    } catch (err) {
      res.status(401).send((err as Error).message);
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const { search } = req.query;
      const { instituteId, role, instituteType } = (req as any).identity;

      if (instituteId == null && role !== "ADMIN") {
        throw new Error(`you haven't been assigned to a specific institute`);
      }

      let options: any = {
        include: { institute: true },
        omit: { password: true },
      };

      if (role === "ADMIN") {
        if (search) {
          options.where = {
            OR: [
              { name: { contains: search as string } },
              { email: { contains: search as string } },
              { phone: { contains: search as string } },
              { institute: { name: { contains: search as string } } },
            ],
          };
        }
      } else if (role === "EXECUTIVE" && instituteType === "INT") {
        options.where = { role: { not: "ADMIN" } };
      } else {
        options.where = { role: { not: "ADMIN" }, instituteId };
      }

      const users = await prisma.user.findMany(options);
      res.send(users);
    } catch (err) {
      res.status(400).send((err as Error).message);
    }
  }

  static async editUser(req: Request, res: Response) {
    try {
      const { id, name, email, phone, instituteId, role } = req.body;
      const editedUser = await prisma.user.update({
        where: { id },
        data: { name, email, phone, instituteId, role },
      });

      const { password: _, ...safeUser } = editedUser;
      res.send(safeUser);
    } catch (err) {
      res.status(400).send((err as Error).message);
    }
  }

  static async editUserPassword(req: Request, res: Response) {
    try {
      const { id, oldPassword, newPassword } = req.body;
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user || !passValidator(oldPassword, user.password)) {
        throw new Error("Wrong password");
      }

      const hashedPass = hasher(newPassword);

      await prisma.user.update({
        where: { id },
        data: { password: hashedPass },
      });

      res.send("Password has been changed");
    } catch (err) {
      res.status(400).send((err as Error).message);
    }
  }
}

export default UserController;
