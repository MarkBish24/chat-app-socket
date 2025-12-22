import express from "express";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import roomRoutes from "./routes/rooms.routes.js";

import { chatSocket } from "./sockets/chat.socket.js";

connectDB().then(() => {
  console.log("DB connected, starting server...");

  // Set Up Express
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Set up Socket.IO
  const server = app.listen(9000, () => {
    console.log("Express server listening on port 9000");
  });

  // Attach socket.io
  const io = new SocketIOServer(server, { cors: { origin: "*" } });

  // Use Auth, Messages, and Room Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/rooms", roomRoutes);

  // store io in express
  app.set("io", io);

  // set up connection
  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);

    chatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("client disconnected:", socket.id);
    });
  });
});
