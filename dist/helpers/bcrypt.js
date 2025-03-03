"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passValidator = exports.hasher = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const salt = bcryptjs_1.default.genSaltSync(10);
const hasher = (password) => {
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.hasher = hasher;
const passValidator = (password, hashedPass) => {
    return bcryptjs_1.default.compareSync(password, hashedPass);
};
exports.passValidator = passValidator;
