import { Router } from "express";
import authenticating from "../middleware/authenticator";
import UploadController from "../controllers/uploadController";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const uploadRoute = Router();
uploadRoute.use(authenticating);

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

uploadRoute.post(
  "/images",
  upload.single("file"),
  UploadController.uploadImage,
);

export default uploadRoute;
