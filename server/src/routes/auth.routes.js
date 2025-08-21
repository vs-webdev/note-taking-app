import express from "express"
import { logout, refresh, userLogin, userRegister } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/register", userRegister)
authRouter.post("/login", userLogin)
authRouter.post("/logout", logout)
authRouter.post("/refreshToken", refresh)

export default authRouter