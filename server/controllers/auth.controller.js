import {
  loginUser,
  registerUser,
  logoutUser,
  getAllUsers,
} from "../services/auth.services.js";

export async function login(req, res) {
  try {
    const user = await loginUser(req.body);
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.json({ message: "registration successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function logout(req, res) {
  try {
    const user = await logoutUser(req.body);
    res.json({ message: "logout successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function fetchAllUsers(req, res) {
  try {
    const users = await getAllUsers(req.body);
    res.json({ message: "fetching users successful", users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
