import express from "express";
import {
  getDashboardSummary,
  getDashboardReport,
} from "../controllers/report.controller.js";
import { verify, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verify);

// Dashboard Home
router.get(
  "/summary",
  getDashboardSummary
);

// Reports Page
router.get(
  "/report",
  restrictTo("Admin", "Clerk"),
  getDashboardReport
);

export default router;