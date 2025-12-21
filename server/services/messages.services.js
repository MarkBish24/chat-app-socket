import { pool } from "../db.js";

export async function saveMessage({ user_id, room_id, message }) {
  try {
    const result = await pool.query(
      `
      INSERT INTO messages (user_id, room_id, message)
      VALUES ($1, $2, $3)
      RETURNING id, message, created_at
      `,
      [user_id, room_id, message]
    );

    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getMessagesByRoom({ room_id }) {
  try {
    const messages = await pool.query(
      `
      SELECT m.id, m.message, m.created_at, u.username
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.room_id = $1
      ORDER BY m.created_at ASC
      `,
      [room_id]
    );

    return messages.rows;
  } catch (err) {
    throw new Error(err.message);
  }
}
