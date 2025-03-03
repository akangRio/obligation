"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = process.env.SECRET;
if (!privateKey) {
    throw new Error("SECRET environment variable is not defined.");
}
function signToken(payload) {
    return jsonwebtoken_1.default.sign(payload, privateKey);
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, privateKey);
}
