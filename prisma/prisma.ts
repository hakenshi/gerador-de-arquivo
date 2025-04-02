import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  // Ensure the PrismaClient instance is reused to prevent too many connections.
  if (!(global as any).db) {
	(global as any).db = new PrismaClient();
  }
  db = (global as any).db;
}

export default db;