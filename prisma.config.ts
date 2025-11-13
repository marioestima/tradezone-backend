import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./src/prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
