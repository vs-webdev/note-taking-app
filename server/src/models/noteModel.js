import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  tags: [String],

  content: {
    type: String,
  },

  isArchived: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastEdited: {
    type: Date,
    default: Date.now,
  }
})

const noteModel = mongoose.model("note", noteSchema)
export default noteModel