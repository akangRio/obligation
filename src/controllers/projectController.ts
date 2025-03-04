import { createEmbedding } from "../helpers/embeddingHelper";
import { AuthenticatedRequest } from "../middleware/authenticator";
import { prisma } from "../prisma/db";
import { Request, Response, NextFunction } from "express";

class ProjectController {
  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await prisma.projects.findMany();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
  static async createProject(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { title, content } = req.body;
      const { userId } = req.identity;

      const embedding = await createEmbedding(`${title} - ${content}`);

      const project = await prisma.$executeRawUnsafe(
        `INSERT INTO "Projects"
          ("id", "title", "content", "published", "authorId", "isDeleted", "createdAt", "updatedAt", "embedding")
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW(), $6::vector)
         RETURNING *`,
        title,
        content,
        false,
        userId,
        false,
        embedding, // Pass embedding here
      );

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
}
export default ProjectController;
