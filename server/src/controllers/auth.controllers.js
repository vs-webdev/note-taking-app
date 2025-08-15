import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"

export const userRegister = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password){
    return res.status(400).json({success: false, message: "Invalid Info!"})
  }

  try {
    // Check if User exists
    const isUser = await userModel.findOne({email})
    if (isUser){
      return res.status(400).json({success: false, message: "User already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new userModel({email, password: hashedPassword})
    await user.save()
    return res.status(201).json({success: true, message: "User registered successfully!"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const userLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password){
    return res.status(400).json({success: false, message: "Invalid Info!"})
  }

  try {
    const user = await userModel.findOne({email})
    if (!user){
      return res.status(400).json({success: false, message: "User not found!"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
      return res.status(400).json({success: false, message: "Invalid Password!"})
    }

    return res.status(201).json({success: true, message: "Login Successfully!"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}