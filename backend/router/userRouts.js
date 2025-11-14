import { Router } from "express";
import { login, register } from "../controller/UserController.js";
import { upload } from "../middlewares/multer.js"; // assuming you have this middleware
import multer from "multer";

const userRoutes = Router();

// Multer setup (for in-memory file storage)
const storage = multer.memoryStorage();
const upload0 = multer({ storage });

// Register route with image upload
// userRoutes.post("/register", upload0.single("Image"), register);
userRoutes.post("/register", upload0.single("image"), register);


// Login route
userRoutes.post("/login", login);

// Example: Update route (if you add an Update function later)
/// import { update } from "../controller/UserController.js";
/// userRoutes.put("/update/:id", upload0.single("Image"), update);

export default userRoutes;
