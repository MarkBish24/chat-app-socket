import { getMessagesByRoom } from "../services/messages.services.js";

// Old Message path
// export async function createMessage(req, res) {
//   try {
//     const { user_id, room_id, message } = req.body;
//     const newMessage = await saveMessage({ user_id, room_id, message });
//     res.status(201).json({ message: newMessage });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

export async function fetchMessagesByRoom(req, res) {
  try {
    const { room_id } = req.params;
    const messages = await getMessagesByRoom({ room_id });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
