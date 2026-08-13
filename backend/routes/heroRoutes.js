import express from "express";

import {
  createHero,
  getAllHeroes,
  getActiveHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} from "../controllers/heroController.js";

import upload from "../middleware/upload.js";

const router = express.Router();


// ===============================
// Create Hero
// ===============================

router.post(
  "/create",
  upload.single("image"),
  createHero
);


// ===============================
// Get All Heroes
// ===============================

router.get(
  "/",
  getAllHeroes
);


// ===============================
// Get Active Heroes
// ===============================

router.get(
  "/active",
  getActiveHeroes
);


// ===============================
// Get Single Hero
// ===============================

router.get(
  "/:id",
  getHeroById
);


// ===============================
// Update Hero
// ===============================

router.put(
  "/update/:id",
  upload.single("image"),
  updateHero
);


// ===============================
// Delete Hero
// ===============================

router.delete(
  "/delete/:id",
  deleteHero
);


export default router;