import mongoose from "mongoose"
import noteModel from "../models/noteModel.js"

export const getNotes = async (req, res) => {
  try {
    const userId = req.userId
    const notes = await noteModel.find({userId}).sort({lastEdited: -1})
    res.status(200).json({success: true, notes})
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const createNote = async (req, res) => {
  const {title, content, tags} = req.body
  const userId = req.userId

  if (!title || !content || !tags) return res.status(400).json({success: false, message: 'Please fill in the required field'})

  try {
    const newNote = new noteModel({
      userId,
      title,
      content,
      tags
    })

    await newNote.save()

    res.status(201).json({success: true, message: "Note saved successfully", newNote})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const getTags = async (req, res) => {
  try {
    const userId = req.userId;

    const tags = await noteModel.aggregate([
      {$match: {userId: new mongoose.Types.ObjectId(userId)}},
      {$unwind: "$tags"},
      {$group: {_id: "$tags"}}
    ])

    const uniqueTags = tags.map(tag => tag._id)

    return res.status(200).json({success: true, message: "Tags fetched successfully", tags: uniqueTags})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId
    const {title, content, tags, isArchived} = req.body;
    const userId = req.userId

    const updatedNote = await noteModel.findOneAndUpdate(
      {_id: noteId, userId},
      {title, content, tags, isArchived, lastEdited: new Date()},
      {new: true}
    )

    if (!updatedNote){
      return res.status(404).json({success: false, message: "Note not found"})
    }

    return res.status(200).json({success: true, message: "Note updated successfully", updatedNote})
    
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId
    const userId = req.userId

    const deleteNote = await noteModel.findOneAndDelete(
      {_id: noteId, userId}
    )

    if (!deleteNote){
      return res.status(404).json({success: false, message: "Note not found"})
    }
    
    return res.status(200).json({success: true, message: "Note deleted successfully", deleteNote})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}