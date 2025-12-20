import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Connect to Postgres on Port:", process.env.DB_PORT);
    client.release();
  } catch (err) {
    console.error("Posres connection Failes:", err);
  }
};

export { connectDB };
