import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { generateNotes } from '../controllers/generate.controller.js'
import { getMyNotes, getSingleNotes, regenerateNotes } from '../controllers/notes.controller.js'
const notesRouter=express.Router()
notesRouter.post("/generatenotes",isAuth,generateNotes)
notesRouter.get("/getnotes",isAuth,getMyNotes)
notesRouter.get("/:id",isAuth,getSingleNotes)
notesRouter.post("/regenerate/:id", isAuth, regenerateNotes)
export default notesRouter