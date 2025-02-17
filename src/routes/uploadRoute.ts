import { Router } from "express";
import authenticating from "../middleware/authenticator";
import UploadController from "../controllers/uploadController";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const uploadRoute = Router();
uploadRoute.use(authenticating);

uploadRoute.post(
  "/images",
  upload.single("file"),
  UploadController.uploadImage,
);

export default uploadRoute;
