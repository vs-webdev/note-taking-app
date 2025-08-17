import express from "express"
import { logout, userLogin, userRegister } from "../controllers/auth.controllers"

const authRouter = express.Router()

authRouter.post("/register", userRegister)
authRouter.post("/login", userLogin)
authRouter.post("/logout", logout)

export default authRouter