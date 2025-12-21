<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const username = ref("");

onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    username.value = user.username;
  }
});

const logout = async () => {
  try {
    const res = await fetch("http://localhost:9000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
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
