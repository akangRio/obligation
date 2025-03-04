import { Request, Response, NextFunction } from "express";
import { supabaseAdminClient, supabaseClient } from "../config/supbaseClient";

class UploadController {
  static async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { instituteId, role, instituteType } = (req as any).identity;

      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      const { data, error } = await supabaseAdminClient.storage
        .from("images")
        .upload(fileName, fileBuffer, {
          contentType: req.file.mimetype,
        });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      res.status(200).json({ message: "File uploaded", data });
    } catch (err) {
      next(err);
    }
  }
}

export default UploadController;
