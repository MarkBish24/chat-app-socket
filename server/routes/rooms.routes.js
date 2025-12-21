import express from "express";
import {
  createRoom,
  getRooms,
  deleteRoom,
} from "../controllers/rooms.controller.js";

const router = express.Router();

router.post("/", createRoom);

router.get("/", getRooms);

router.delete("/:room_id", deleteRoom);

export default router;
