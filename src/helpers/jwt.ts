import jwt from "jsonwebtoken";

const privateKey = process.env.SECRET as string;

if (!privateKey) {
  throw new Error("SECRET environment variable is not defined.");
}

export function signToken(payload: object): string {
  return jwt.sign(payload, privateKey);
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, privateKey) as T;
}
