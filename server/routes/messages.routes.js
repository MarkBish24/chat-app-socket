import express from "express";
import { fetchMessagesByRoom } from "../controllers/messages.controller.js";

const router = express.Router();

// Old Message Path
// router.post("/", createMessage);

router.get("/:room_id", fetchMessagesByRoom);

export default router;
