import express from "express";
import multer from "multer";
import {
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  toggleLike,
  addComment,
} from "../controllers/note.controller.js";
import { createNote } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

//Multer Set up
const upload = multer({ dest: "uploads/" });

router.post("/notes", authMiddleware, upload.single("file"), createNote);
router.get("/notes", authMiddleware, getNotes);
router.get("/notes/:id", authMiddleware, getNoteById);
router.put("/notes/:id", authMiddleware, upload.single("file"), updateNote);
router.delete("/notes/:id", authMiddleware, deleteNote);
router.post("/notes/:id/like", authMiddleware, toggleLike);
router.post("/notes/:id/comments", authMiddleware, addComment);

export default router;
