import { PrismaClient } from "../prisma/src/generated/client";
/*
console.log("Pase por aqui")

const prisma = new PrismaClient()

export const db = prisma;
*/

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
