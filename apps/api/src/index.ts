import express from "express";
import cors from "cors";
import { prisma } from "@repo/database";
import { redis } from "@repo/redis";
import rootRouter from "./routes.ts";
import type { Request, Response, NextFunction } from "express";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
   console.log("Request Body:", req.body);
  next();
})

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express in Turborepo!" });
});

async function startServer() {
  try {
    // 1. Check Database connection
    await prisma.$connect();
    console.log("🟢 [Database]: Connection has been established successfully.");

    // 2. Check Redis connection
    await redis.ping();
    console.log("🟢 [Redis]: Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`🚀 [Server]: Started successfully on port ${port}`);
    });
  } catch (error) {
    console.error("🔴 [Error]: Unable to start server due to connection issues.");
    console.error(error);
    process.exit(1);
  }
}

startServer();
