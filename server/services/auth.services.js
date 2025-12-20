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

// export async function login(req, res) {
//   res.json({ message: "login not implemented yet" });
// }
