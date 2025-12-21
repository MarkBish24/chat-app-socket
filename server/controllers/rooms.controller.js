import { getAllRooms, saveRoom, removeRoom } from "../services/rooms.services";

export async function createRoom(req, res) {
  try {
    const { name } = req.body;
    const newMessage = await saveRoom({ name });
    res.status(201).json({ message: newMessage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getRooms(req, res) {
  try {
    const rooms = await getAllRooms();
    res.status(200).json({ rooms: rooms });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteRoom(req, res) {
  try {
    const { room_id } = req.params;
    const room = await removeRoom({ room_id });
    res.status(200).json({ room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// export async function createMessage(req, res) {
//   try {
//     const { user_id, room_id, message } = req.body;
//     const newMessage = await saveMessage({ user_id, room_id, message });
//     res.status(201).json({ message: newMessage });
//   } catch (err) {
//     res.status(r00).json({ error: err.message });
//   }
// }
