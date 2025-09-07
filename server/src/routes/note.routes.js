import express from "express"
import { verifyToken } from "../middleware/authMiddleare.js"
import { createNote, deleteNote, getNotes, getTags, updateNote } from "../controllers/note.controllers.js"

const noteRouter = express.Router()

noteRouter.get("/tags", verifyToken, getTags)
noteRouter.get("/", verifyToken, getNotes)
noteRouter.post("/", verifyToken, createNote)
noteRouter.put("/:noteId", verifyToken, updateNote)
noteRouter.delete("/:noteId", verifyToken, deleteNote)

export default noteRouter