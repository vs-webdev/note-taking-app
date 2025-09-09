import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    theme: {
      type: String,
      enum: ["Light", "Dark"],
      default: "Light"
    },
    font: {
      type: String,
      enum: ["Sans-serif", "Serif", "Monospace"],
      default: "Sans-serif"
    }
  }
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel