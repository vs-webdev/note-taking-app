import express from "express"
import { verifyToken } from "../middleware/authMiddleare.js"
import { createNote, deleteNote, getNotes, getTags, updateNote } from "../controllers/note.controllers.js"

const noteRouter = express.Router()

noteRouter.get("/notes", verifyToken, getNotes)
noteRouter.get("/tags", verifyToken, getTags)
noteRouter.post("/notes", verifyToken, createNote)
noteRouter.put("/notes/:noteId", verifyToken, updateNote)
noteRouter.delete("/notes/:noteId", verifyToken, deleteNote)

export default noteRouter