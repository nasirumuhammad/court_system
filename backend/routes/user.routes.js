import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { verify, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All user routes require authentication
router.use(verify);

// Admin and Clerk
router.get("/", restrictTo("Admin", "Clerk"), getAllUsers);
router.get("/:id", restrictTo("Admin", "Clerk"), getUserById);

// Admin only
router.post("/", restrictTo("Admin"), createUser);
router.put("/:id", restrictTo("Admin"), updateUser);
router.delete("/:id", restrictTo("Admin"), deleteUser);

export default router;