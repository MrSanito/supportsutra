import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { prisma } from "@repo/database";
import { redis } from "@repo/redis";
import rootRouter from "./routes.js";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(cookieParser());

const port = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001", "https://supportsutra.zynito.in", "https://www.supportsutra.zynito.in"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update session configuration for cross-port support
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Required for secure cookies behind a proxy if needed
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax', // Use 'none' only with secure: true
  },
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
   console.log("Request Body:", req.body);
  next();
})

app.use("/api/v1", rootRouter);

app.get("/", (req: Request, res: Response) => {
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
