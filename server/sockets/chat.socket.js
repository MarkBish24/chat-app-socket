import { saveMessage } from "../services/messages.services.js";

export function chatSocket(io, socket) {
  let currentRoom = null;

  //When user joins a room
  socket.on("joinRoom", ({ room_id }) => {
    if (currentRoom) {
      console.log(`Socket ${socket.id} left room ${currentRoom}`);
      socket.leave(`room:${currentRoom}`);
    }

    currentRoom = room_id;
    socket.join(`room:${room_id}`);
    console.log(`Socket ${socket.id} joined room ${room_id}`);
  });

  //Check Typing
  socket.on("typing", ({ room_id, username }) => {
    if (currentRoom !== room_id) return;

    console.log(`${username} is typing in room ${room_id}`);
    socket.to(`room:${room_id}`).emit("userTyping", { username });
  });

  socket.on("stopTyping", ({ room_id, username }) => {
    if (currentRoom !== room_id) return;

    console.log(`${username} stopped typing in room ${room_id}`);
    socket.to(`room:${room_id}`).emit("userStoppedTyping", { username });
  });

  // Chat socket for sending messages
  socket.on("sendMessage", async ({ user_id, room_id, message }) => {
    const saved = await saveMessage({ user_id, room_id, message });

    io.to(`room:${room_id}`).emit("newMessage", saved);
  });

  socket.on("leaveRoom", ({ room_id }) => {
    socket.leave(`room:${room_id}`);
  });

  // Checking Online Status
  const onlineUsers = new Map();

  socket.on("userOnline");
}
