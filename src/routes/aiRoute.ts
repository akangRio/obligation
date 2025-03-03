import { Router } from "express";
import authenticating from "../middleware/authenticator";
import AIController from "../controllers/aiControllers";

const aiRoute = Router();
aiRoute.use(authenticating);

/**
 * @swagger
 * /chatbot:
 *   post:
 *     summary: Chat with the AI
 *     description: Chat with the AI
 *     tags: [AI]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */

aiRoute.post("/chatbot", AIController.chatBot);

export default aiRoute;
