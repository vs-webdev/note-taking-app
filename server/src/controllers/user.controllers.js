import userModel from "../models/userModel.js"

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const userInfo = await userModel.findById(userId).select('-password')
    // console.log('user info', userInfo)
    return res.status(200).json({success: true, message: "User info fetched successfully", userInfo})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const updateSettings = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(req.body)
    const updateSettings = await userModel.findByIdAndUpdate(
      userId, 
      {$set: {
        "settings.theme": req.body.theme,
        "settings.font": req.body.font,
      }}, 
      {new: true}
    ).select("-password")
    return res.status(200).json({success: true, message: "Setting updated Successfully", updateSettings})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}