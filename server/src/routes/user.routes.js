import express from "express";
import { getUserInfo, updateSettings } from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/authMiddleare.js";

const userRouter = express.Router() 

userRouter.get('/get-info', verifyToken, getUserInfo)
userRouter.put('/settings',verifyToken, updateSettings)

export default userRouter;