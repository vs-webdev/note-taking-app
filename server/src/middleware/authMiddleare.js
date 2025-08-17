import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token){
    return res.status(401).json({success: false, message: "Access Denied. No token found."})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(403).json({success: false, message: "Invalid or expired token."})
  }
}