import express from "express";

import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// ==========================
// Create News
// ==========================

router.post(
  "/create",
  upload.single("image"),
  createNews
);

// ==========================
// Get All News
// ==========================

router.get("/", getAllNews);

// ==========================
// Get Single News
// ==========================

router.get("/:id", getNewsById);

// ==========================
// Update News
// ==========================

router.put(
  "/update/:id",
  upload.single("image"),
  updateNews
);

// ==========================
// Delete News
// ==========================

router.delete(
  "/delete/:id",
  deleteNews
);

export default router;