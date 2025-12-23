<script setup>
import { defineProps, ref, watch, onMounted } from "vue";
import MessageInput from "./MessageInput.vue";

const props = defineProps({
  room: Object,
});

const messages = ref([]);
const storedUser = ref(null);

onMounted(() => {
  storedUser.value = JSON.parse(sessionStorage.getItem("user"));
  console.log(storedUser.value);
});

watch(
  () => props.room,
  async (newRoom) => {
    if (!newRoom || !newRoom.id) return; // ✅ prevent fetch if room is not ready
    try {
      const res = await fetch(
        `http://localhost:9000/api/messages/${newRoom.id}`
      );
      const data = await res.json();
      messages.value = data.messages;
      console.log(messages.value);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  },
  { immediate: true }
);

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <div class="container">
    <div
      class="message-wrapper"
      v-for="msg in messages"
      :key="msg.id"
      :class="{ self: msg.username === storedUser.username }"
    >
      <div class="sender" v-if="msg.username !== storedUser?.username">
        {{ msg.username }}
      </div>

      <div class="message-container">
        <div class="message-box">
          <span class="text">{{ msg.message }}</span>
        </div>
        <span class="time">{{ formatTime(msg.created_at) }}</span>
      </div>
    </div>
    <MessageInput />
  </div>
</template>

<style scoped>
.container {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #2c2c3a;
  overflow-y: auto;
  height: 100%;
}

.message-wrapper {
  margin: 2px 10px;
  align-self: flex-start;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-wrapper.self {
  align-self: flex-end;
  align-items: flex-end;
}

.sender {
  margin: 2px 10px;
}

.message-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.message-wrapper.self > .message-container {
  flex-direction: row-reverse;
}

.message-box {
  background-color: #373748;
  color: #fff;
  border-radius: 10px;
  max-width: 300px;
  padding: 8px 12px;

  word-break: break-word;
  display: inline-block;
}
</style>
