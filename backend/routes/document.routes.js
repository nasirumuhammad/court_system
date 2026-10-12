import express from "express";
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentsByCase,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

import { verify, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All document routes require authentication
router.use(verify);


router.post("/", restrictTo("Admin", "Clerk"), createDocument);



router.get("/", restrictTo("Admin", "Clerk", "Judge", "Lawyer"), getAllDocuments);

router.get("/case/:caseId", restrictTo("Admin", "Clerk", "Judge", "Lawyer"), getDocumentsByCase);

router.get( "/:id",
 restrictTo("Admin", "Clerk", "Judge", "Lawyer"),
  getDocumentById
);


router.put( "/:id", restrictTo("Admin", "Clerk"), updateDocument);

router.delete("/:id", restrictTo("Admin"), deleteDocument);

export default router;