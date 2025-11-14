import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import axios from "axios";

import userRoutes from "./router/userRouts.js";
import { connectCloudinary } from "./config/cloudinary.js"; // optional if you have this

const app = express();

// ✅ Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Handle JSON and form-data separately
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    return next(); // skip express.json() for file uploads
  }
  express.json()(req, res, next);
});

app.use(cookieParser());

// ✅ API routes
app.use("/api/user", userRoutes);

// ✅ Start server only after DB & Cloudinary connect
const startServer = async () => {
  try {
    await connectDB(); // <-- Correct function name
    await connectCloudinary(); // <-- optional; remove if not using Cloudinary init

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
};

startServer();
