import express from "express";

import {
  userSignup,
  userLogin,
} from "../controllers/userAuthController.js";


const router = express.Router();


// ==========================
// USER SIGNUP
// ==========================

router.post(
  "/signup",
  userSignup
);


// ==========================
// USER LOGIN
// ==========================

router.post(
  "/login",
  userLogin
);


export default router;