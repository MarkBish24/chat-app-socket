import express from "express";
import { createRoom, getRooms } from "../controllers/rooms.controller";

const router = express.Router();

router.post("/", createRoom);

router.get("/", getRooms);

export default router;
