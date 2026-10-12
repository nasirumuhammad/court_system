import express from "express";
import {
  createHearing,
  getAllHearings,
  getHearingsByCase,
  getHearingById,
  updateHearing,
  deleteHearing,
} from "../controllers/hearing.controller.js";

import { verify, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All hearing routes require authentication
router.use(verify);


router.post("/", restrictTo("Admin", "Clerk"), createHearing);

router.get("/", restrictTo("Admin", "Clerk", "Judge", "Lawyer"), getAllHearings);


router.get("/case/:caseId", restrictTo("Admin", "Clerk", "Judge", "Lawyer"), getHearingsByCase);

router.get("/:id", restrictTo("Admin", "Clerk", "Judge", "Lawyer"),getHearingById);

router.put("/:id", restrictTo("Admin", "Clerk"), updateHearing);


router.delete("/:id", restrictTo("Admin"), deleteHearing);

export default router;