import { loginUser } from "../services/auth.services.js";

export async function login(req, res) {
  try {
    const user = await loginUser(req.body);
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function register(req, res) {
  res.json({ message: "register not implemented yet" });
}

export async function logout(req, res) {
  res.json({ message: "logout not implemented yet" });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
