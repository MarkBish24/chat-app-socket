import { pool } from "../db.js";

export async function saveRoom({ name }) {
  try {
    const result = await pool.query(
      `
      INSERT INTO rooms (name)
      VALUES ($1)
      RETURNING id, name, created_at
      `,
      [name]
    );

    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getAllRooms() {
  try {
    const result = await pool.query(`
      SELECT * FROM rooms ORDER BY created_at ASC
      `);

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function removeRoom({ room_id }) {
  try {
    await pool.query(`DELETE FROM messages WHERE room_id = $1`, [room_id]);

    const result = await pool.query(
      `DELETE FROM rooms
       WHERE id = $1
       RETURNING id, name`,
      [room_id]
    );

    if (result.rowCount === 0) {
      throw new Error("Room not found");
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
}
