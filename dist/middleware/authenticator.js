"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../helpers/jwt");
const authenticating = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader.trim() === "") {
            throw new Error("Not authorized");
        }
        const bearerToken = authHeader.split(" ");
        if (bearerToken.length !== 2) {
            throw new Error("Invalid authorization format");
        }
        const accessToken = bearerToken[1];
        const payload = (0, jwt_1.verifyToken)(accessToken);
        if (!payload) {
            throw new Error("Invalid token");
        }
        req.identity = payload;
        next();
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unauthorized";
        res.status(500).json({ error: errMessage });
    }
};
exports.default = authenticating;
