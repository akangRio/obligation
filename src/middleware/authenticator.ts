import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";

interface AuthenticatedRequest extends Request {
  identity?: any;
}

const authenticating = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
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
    const payload = verifyToken(accessToken);

    if (!payload) {
      throw new Error("Invalid token");
    }

    req.identity = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: error.message || "Unauthorized" });
  }
};

export default authenticating;
