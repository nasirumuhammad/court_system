import express from "express";
import {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  updateCaseStatus,
  assignJudge,
  deleteCase,
  assignLawyer,
} from "../controllers/case.controller.js";

import { verify, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All case routes require authentication
router.use(verify);


router.get(
  "/",
  restrictTo("Admin", "Clerk", "Judge", "Lawyer"),
  getAllCases
);

router.get(
  "/:id",
  restrictTo("Admin", "Clerk", "Judge", "Lawyer"),
  getCaseById
);


router.post(
  "/",
  restrictTo("Admin", "Clerk"),
  createCase
);


router.put(
  "/:id",
  restrictTo("Admin", "Clerk"),
  updateCase
);


router.put(
  "/:id/assign-judge",
  restrictTo("Admin", "Clerk"),
  assignJudge
);

router.put(
    "/:id/assign-lawyer",
    restrictTo("Admin", "Clerk"),
    assignLawyer
);

router.put(
  "/:id/status",
  restrictTo("Admin", "Clerk", "Judge"),
  updateCaseStatus
);



router.delete(
  "/:id",
  restrictTo("Admin"),
  deleteCase
);

export default router;