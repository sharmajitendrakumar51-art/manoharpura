import express from "express";

import {

  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,

} from "../controllers/notificationController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// ===============================
// Create Notification
// ===============================

router.post(

    "/create",

    upload.single("attachment"),

    createNotification

);

// ===============================
// Get All Notifications
// ===============================

router.get(

    "/",

    getAllNotifications

);

// ===============================
// Get Single Notification
// ===============================

router.get(

    "/:id",

    getNotificationById

);

// ===============================
// Update Notification
// ===============================

router.put(

    "/update/:id",

    upload.single("attachment"),

    updateNotification

);

// ===============================
// Delete Notification
// ===============================

router.delete(

    "/delete/:id",

    deleteNotification

);

export default router;