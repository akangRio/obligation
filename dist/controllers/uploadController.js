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
const supbaseClient_1 = require("../config/supbaseClient");
class UploadController {
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { instituteId, role, instituteType } = req.identity;
                if (!req.file) {
                    throw new Error("No file uploaded");
                }
                const fileBuffer = req.file.buffer;
                const fileName = req.file.originalname;
                const { data, error } = yield supbaseClient_1.supabaseAdminClient.storage
                    .from("images")
                    .upload(fileName, fileBuffer, {
                    contentType: req.file.mimetype,
                });
                if (error) {
                    console.log(error);
                    throw new Error(error.message);
                }
                res.status(200).json({ message: "File uploaded", data });
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
}
exports.default = UploadController;
