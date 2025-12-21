<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";
const router = useRouter();

const username = ref("");
let socket;

onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    username.value = user.username;
  }

  socket = io("http://localhost:9000");

  socket.emit("joinRoom", { username: username.value });

  socket.on("message", (msg) => {
    messages.value.push(msg);
  });
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
  <div>
    <h2>Chat Room {{ username }}</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>
