"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        res.status(400).json({ message: "Validation error: Invalid input data" });
        return;
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            res.status(400).json({ message: "Unique constraint failed" });
            return;
        }
        res.status(400).json({ message: `Database error: ${err.message}` });
        return;
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    if (err.code) {
        res.status(err.code).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: "Internal server error" });
};
exports.default = errorHandler;
