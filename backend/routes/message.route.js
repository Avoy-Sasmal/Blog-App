import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getConversation,
  getInbox,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/messages", authMiddleware, sendMessage);
router.get("/messages", authMiddleware, getInbox);
router.get("/messages/with/:withUser", authMiddleware, getConversation);

export default router;
