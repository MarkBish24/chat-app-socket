<script setup>
import { ref } from "vue";


const username = ref("");
const password = ref("");
const error = ref(false);

const login = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    error.value = true;
    return;
  }

  error.value = false;

  try {
    const res = await fetch("http://localhost:9000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || "Login failed";
      return;
    }

    console.log("Logged in user:", data.user);
    alert(`Logged in as ${data.user.username}`);

    localStorage.setItem(
      "user",
      JSON.stringify({ id: data.user.id, username: data.user.username })
    );
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="login">
      <h2>Login</h2>
      <div class="login-form">
        <p>Username</p>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          required
        />
        <p>Password</p>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1e1e2f;
}

.login-card {
  background: #2c2c3a;
  width: 350px;
  height: 400px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-card h2 {
  margin-bottom: 20px;
  color: #fff;
}

.login-card p {
  color: #fff;
  margin-bottom: 10px;
}

.login-card input {
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: none;
  outline: none;
  align-self: stretch;
}

.login-card button {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  align-self: stretch;
  margin-top: 40px;
}

.login-card button:hover {
  background: #45a049;
}

.error {
  color: #ff5555;
  margin-top: 10px;
  text-align: center;
}
</style>
