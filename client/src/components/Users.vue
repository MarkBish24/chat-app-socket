<script setup>
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  socket: Object,
  user: Object,
});

const users = ref([]);

watch(
  () => props.socket,
  async (newSocket) => {
    if (!newSocket) return;
    try {
      const res = await fetch(`http://localhost:9000/api/auth/get-all-users`);
      const data = await res.json();
      users.value = data.users;

      console.log(users.value);
    } catch (err) {
      console.error("Error Fetching Online Users", err);
    }
  }
);
</script>

<template>
  <div class="users">
    <h3 class="title">Users</h3>
    <ul class="users-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <span class="status-dot"></span>
        <span class="username">{{ user.username }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.users {
  width: 100%;
  background-color: rgb(70, 70, 80);
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
}

.title {
  margin: 0 0 6px 0;
  font-size: 13px;
  font-weight: 600;
  color: #ddd;
  text-align: center;
}

.users-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px;
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  cursor: default;
}

.user-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3ba55d; /* online green */
  flex-shrink: 0;
}

.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
