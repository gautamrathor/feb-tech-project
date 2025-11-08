import { Router } from "express";
import { login, register } from "../controller/user.js";
const userRoutes = Router()

userRoutes.post("/register", register)
userRoutes.post("/login", login)


export default userRoutes;