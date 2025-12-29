import { pool } from "../db.js";

export async function loginUser({ username, password }) {
  try {
    const result = await pool.query(
      "SELECT * FROM public.users WHERE username = $1 AND password = $2",
      [username, password]
    );
    const user = result.rows[0];

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser({ username, password }) {
  try {
    const existing = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existing.rows.length > 0) {
      throw new Error("Username Already Exists");
    }

    const result = await pool.query(
      `INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username, created_at`,
      [username, password]
    );

    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logoutUser() {
  try {
    return { message: "Logged out successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getAllUsers() {
  try {
    const result = await pool.query(`
      SELECT id, username FROM users
    `);

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  }
}
