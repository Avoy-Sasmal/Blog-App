import express from "express";
import multer from "multer"
import {
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { createNote } from "../controllers/blog.controller.js"; 

const router = express.Router();

//Multer Set up 
const upload = multer({ dest: "uploads/" });

router.post("/notes", upload.single("file"),createNote);
router.get("/notes", getNotes);
router.get("/notes/:id", getNoteById);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;
