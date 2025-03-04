import { Request, Response, NextFunction } from "express";
import { createEmbedding } from "../helpers/embeddingHelper";
import { prisma } from "../prisma/db";
class AIController {
  static async chatBot(req: Request, res: Response, next: NextFunction) {
    try {
      const queryText = req.body.prompt;
      const queryEmbedding = await createEmbedding(queryText);

      const result = await prisma.$queryRaw<
        Array<{
          id: string;
          title: string;
          content: string;
          published: boolean;
          authorId: string;
          createdAt: Date;
          updatedAt: Date;
          similarity: number;
        }>
      >`
          SELECT id, title, content, published, "authorId", "createdAt", "updatedAt",
                 (embedding <-> ${queryEmbedding}::vector) AS similarity
          FROM "Projects"
          ORDER BY embedding <-> ${queryEmbedding}::vector
          LIMIT 5;
        `;
      const filtered = result.filter((project) => project.similarity < 1.25);

      res.json(filtered);
    } catch (err) {
      next(err);
    }
  }
}

export default AIController;
