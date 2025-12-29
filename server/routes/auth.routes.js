import express from "express";
import {
  login,
  register,
  logout,
  fetchAllUsers,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/get-all-users", fetchAllUsers);

export default router;
