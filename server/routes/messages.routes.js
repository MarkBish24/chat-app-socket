import express from "express";
import {
  fetchMessagesByRoom,
  createMessage,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.post("/", createMessage);

router.get("/:room_id", fetchMessagesByRoom);

export default router;
