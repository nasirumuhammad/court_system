import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import { validateEnv } from "./config/env.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import caseRoutes from "./routes/case.routes.js";
import hearingRoutes from "./routes/hearing.routes.js";
import documentRoutes from "./routes/document.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.TRUST_PROXY === "true") app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet());
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false }));
app.use(cors({
  origin(origin, callback) {
    // Allow non-browser clients without an Origin header.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser());

app.get("/health/live", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/health/ready", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  return res.status(ready ? 200 : 503).json({ status: ready ? "ready" : "not_ready" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cases", caseRoutes);
app.use("/api/v1/hearings", hearingRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use(errorHandler);

let server;
const shutdown = async (signal) => {
  console.info(`${signal} received; shutting down gracefully`);
  if (server) {
    server.close(async () => {
      try {
        await mongoose.connection.close();
        process.exit(0);
      } catch (error) {
        console.error("Error during shutdown", error);
        process.exit(1);
      }
    });
    setTimeout(() => process.exit(1), 10000).unref();
  } else {
    await mongoose.disconnect();
    process.exit(0);
  }
};

const start = async () => {
  try {
    validateEnv();
    await connectDB();
    server = app.listen(PORT, "0.0.0.0", () => {
      console.info(`API listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
    });
  } catch (error) {
    console.error("API startup failed:", error.message);
    process.exit(1);
  }
};

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

start();
