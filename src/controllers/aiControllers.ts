import { Request, Response } from "express";
import { createEmbedding } from "../helpers/embeddingHelper";
import { prisma } from "../prisma/db";
class AIController {
  static async chatBot(req: Request, res: Response) {
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

      res.json(result);
    } catch (err) {
      console.error("❌ Error in chatBot:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default AIController;
