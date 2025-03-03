"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
globalForPrisma.prisma = globalForPrisma.prisma || new client_1.PrismaClient();
const prisma = globalForPrisma.prisma;
exports.prisma = prisma;
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
