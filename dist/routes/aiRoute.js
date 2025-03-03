"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const aiControllers_1 = __importDefault(require("../controllers/aiControllers"));
const aiRoute = (0, express_1.Router)();
aiRoute.use(authenticator_1.default);
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
aiRoute.post("/chatbot", aiControllers_1.default.chatBot);
exports.default = aiRoute;
