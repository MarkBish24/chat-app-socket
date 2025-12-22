<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";

import ChatBox from "../components/ChatBox.vue";
import Room from "../components/ROom.vue";

const router = useRouter();

const username = ref("");

const rooms = ref([]);
let socket;

onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    username.value = user.username;
  }

  socket = io("http://localhost:9000");

  // Getting all the rooms from the backend

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/rooms");
      const data = await res.json();
      rooms.value = data.rooms;
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  fetchRooms();

  // socket.emit("joinRoom", { username: username.value });

  // socket.on("message", (msg) => {
  //   messages.value.push(msg);
  // });
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});

const logout = async () => {
  try {
    const res = await fetch("http://localhost:9000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    // Always clear local user
    localStorage.removeItem("user");
    router.push("/");
  }
};
</script>

<template>
  <div class="dashboard">
    <div class="rooms-list">
      <Room v-for="room in rooms" :key="room.id" :room="room" />
    </div>
    <div class="header">
      <h2>Chat Room {{ username }}</h2>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* make the header take full width */
  height: 100px;
  padding: 0 20px;
  background-color: #2c2c3a;
  color: #fff;
  box-sizing: border-box;
}
.rooms-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  height: 100vh;
  gap: 10px;
  width: 140px;
}
</style>
