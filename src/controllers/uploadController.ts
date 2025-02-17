import { Request, Response } from "express";
import { supabaseAdminClient, supabaseClient } from "../config/supbaseClient";

class UploadController {
  static async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      const { instituteId, role, instituteType } = (req as any).identity;
      console.log(req.file);

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
      res.status(400).send((err as Error).message);
    }
  }
}

export default UploadController;
