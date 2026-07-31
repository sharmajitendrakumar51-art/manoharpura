import express from "express";
import upload from "../middleware/upload.js";

import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  deleteSingleImage,
} from "../controllers/galleryController.js";

const router = express.Router();

// Create Gallery
router.post(
  "/create",
  upload.array("images", 20),
  createGallery
);

// Get All Gallery
router.get("/get-gallery", getAllGallery);

// Get Single Gallery
router.get("/:id", getGalleryById);

// Update Gallery
router.put(
  "/update/:id",
  upload.array("images", 20),
  updateGallery
);

// Delete Gallery
router.delete("/delete/:id", deleteGallery);

router.delete(
  "/delete-image/:galleryId/:imageId",
  deleteSingleImage
);

export default router;