import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 20,
    },
  ]),
  createEvent
);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put(
  "/update/:id",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 20,
    },
  ]),
  updateEvent
);

router.delete("/delete/:id", deleteEvent);

export default router;