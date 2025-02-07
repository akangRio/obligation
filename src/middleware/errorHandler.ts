import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { JsonWebTokenError } from "jsonwebtoken";

interface CustomError extends Error {
  code?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: "Validation error: Invalid input data" });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(400).json({ message: "Unique constraint failed" });
      return;
    }
    res.status(400).json({ message: `Database error: ${err.message}` });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (err.code) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
