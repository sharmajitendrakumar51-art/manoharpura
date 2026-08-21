import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import memberRoutes from "./routes/memberRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";


dotenv.config();


const app = express();


// ==========================
// DATABASE
// ==========================

connectDB();


// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());


// ==========================
// ADMIN AUTH
// ==========================

app.use(
  "/api/admin/auth",
  authRoutes
);


// ==========================
// USER AUTH
// ==========================

app.use(
  "/api/auth",
  userAuthRoutes
);


// ==========================
// MEMBER
// ==========================

app.use(
  "/api/member",
  memberRoutes
);


// ==========================
// GALLERY
// ==========================

app.use(
  "/api/gallery",
  galleryRoutes
);


// ==========================
// EVENT
// ==========================

app.use(
  "/api/event",
  eventRoutes
);


// ==========================
// NEWS
// ==========================

app.use(
  "/api/news",
  newsRoutes
);


// ==========================
// NOTIFICATION
// ==========================

app.use(
  "/api/notification",
  notificationRoutes
);


// ==========================
// HERO
// ==========================

app.use(
  "/api/hero",
  heroRoutes
);


// ==========================
// SERVER
// ==========================

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});