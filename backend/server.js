import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import memberRoutes from "./routes/memberRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/member", memberRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/user", userAuthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});