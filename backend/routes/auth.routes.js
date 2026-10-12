import express from "express";
import {
  login,
  getMe,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

import { verify } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/login", login);
router.get("/me", verify, getMe);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;