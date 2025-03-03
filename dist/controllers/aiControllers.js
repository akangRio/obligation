"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const embeddingHelper_1 = require("../helpers/embeddingHelper");
const db_1 = require("../prisma/db");
class AIController {
    static chatBot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryText = req.body.prompt;
                const queryEmbedding = yield (0, embeddingHelper_1.createEmbedding)(queryText);
                const result = yield db_1.prisma.$queryRaw `
          SELECT id, title, content, published, "authorId", "createdAt", "updatedAt",
                 (embedding <-> ${queryEmbedding}::vector) AS similarity
          FROM "Projects"
          ORDER BY embedding <-> ${queryEmbedding}::vector
          LIMIT 5;
        `;
                res.json(result);
            }
            catch (err) {
                console.error("❌ Error in chatBot:", err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = AIController;
