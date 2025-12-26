import express from "express";
import {
  fetchMessageById,
  fetchMessagesByRoom,
} from "../controllers/messages.controller.js";

const router = express.Router();

// Old Message Path
// router.post("/", createMessage);

router.get("/:room_id", fetchMessagesByRoom);

router.get("/message/:message_id", fetchMessageById);

export default router;
