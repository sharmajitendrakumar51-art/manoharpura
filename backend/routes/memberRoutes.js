import express from "express";
import upload from "../middleware/upload.js";

import {
    addMember,
    getMembers,
    getMemberById,
    getMemberByEmail,
    updateMember,
    updateMemberStatus,
    deleteMember,
    getInactiveMembers,
    getDashboardCounts,
    getRecentMembers,
} from "../controllers/memberController.js";

const router = express.Router();


// ==========================
// TEST API
// ==========================
router.get("/test", (req, res) => {

  console.log("✅ TEST API HIT");

  res.json({
    success: true,
    message: "Backend Working",
  });

});


// ==========================
// Add Member
// ==========================
router.post(
  "/add-member",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "janAadhaarCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  addMember
);

// Get All Members
router.get("/get-members", getMembers);

// Get Single Member
router.get("/get-member/:id", getMemberById);

router.get(
    "/get-member-by-email/:email",
    getMemberByEmail
);

// Update Member
router.put(
  "/update-member/:id",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "janAadhaarCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  updateMember
);

// Update Member Status
router.put("/update-status/:id", updateMemberStatus);

// Delete Member
router.delete("/delete-member/:id", deleteMember);

router.get("/get-inactive-members", getInactiveMembers);

router.get("/dashboard-counts", getDashboardCounts);

router.get("/recent-members", getRecentMembers);

export default router;