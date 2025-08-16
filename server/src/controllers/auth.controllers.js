import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
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

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
      maxAge: 60 * 60 * 1000,
    })

    return res.status(200).json({success: true, message: "Login Successful!"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true, 
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict'
    })

    return res.status(200).json({success: true, message: "Logout Successful!"})
  } catch (error) {
    res.status(500).json({success: false, message: `Logout failed: ${error.message}`})
  }
}