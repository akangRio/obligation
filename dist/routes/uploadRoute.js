"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const uploadController_1 = __importDefault(require("../controllers/uploadController"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const uploadRoute = (0, express_1.Router)();
uploadRoute.use(authenticator_1.default);
/**
 * @swagger
 * /upload/images:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image file.
 *     tags: [Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *       400:
 *         description: Invalid file type
 *       500:
 *         description: Internal server error
 */
uploadRoute.post("/images", upload.single("file"), uploadController_1.default.uploadImage);
exports.default = uploadRoute;
