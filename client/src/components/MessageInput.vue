<script setup>
import { ref, defineProps, watch, onUnmounted } from "vue";

const props = defineProps({
  socket: Object,
  room: Object,
  username: String,
});

const message = ref("");
const typingUsers = ref([]);
let typingTimeout = null;

const handleTyping = () => {
  if (!props.room || !props.socket) return;

  props.socket.emit("typing", {
    room_id: props.room.id,
    username: props.username,
  });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    props.socket.emit("stopTyping", {
      room_id: props.room.id,
      username: props.username,
    });
  }, 1000);
};

// store what the emits do in variables
let userTypingHandler, userStoppedHandler;

// Watch for socket to become available
watch(
  () => props.socket,
  (newSocket) => {
    if (!newSocket) return;

    console.log("Socket available, attaching typing listeners");

    userTypingHandler = ({ username }) => {
      console.log("userTyping received:", username);
      if (username === props.username) return;
      if (!typingUsers.value.includes(username))
        typingUsers.value.push(username);
    };

    userStoppedHandler = ({ username }) => {
      console.log("userStoppedTyping received:", username);
      typingUsers.value = typingUsers.value.filter((u) => u !== username);
    };

    //create new emits
    newSocket.on("userTyping", userTypingHandler);
    newSocket.on("userStoppedTyping", userStoppedHandler);
  },
  { immediate: true }
);

onUnmounted(() => {
  if (!props.socket) return;
  props.socket.off("userTyping", userTypingHandler);
  props.socket.off("userStoppedTyping", userStoppedHandler);
});

const sendMessage = () => {
  if (!message.value.trim() || !props.socket || !props.room) return;

  props.socket.emit("sendMessage", {
    room_id: props.room.id,
    message: message.value,
    username: props.username,
  });

  message.value = "";

  props.socket.emit("stopTyping", {
    room_id: props.room.id,
    username: props.username,
  });
};
</script>

<template>
  <div>
    <div class="typing-indicator" v-if="typingUsers.length > 0">
      {{ typingUsers.join(", ") }} typing…
    </div>
    <div class="chat-input">
      <textarea
        v-model="message"
        placeholder="Message #general"
        rows="1"
        @input="handleTyping"
        @keydown.enter.exact.prevent="sendMessage"
      />
    </div>
  </div>
</template>

<style>
.chat-input {
  padding: 10px;
  background: #21212d;
  border-top: 1px solid #21212d;
}

.chat-input textarea {
  width: 100%;
  box-sizing: border-box;
  resize: none;
  border: none;
  outline: none;
  background: #373748;
  color: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.4;
}

.chat-input textarea::placeholder {
  color: #b5bac1;
}

.typing-indicator {
  padding: 4px 10px;
  font-size: 13px;
  color: #b5bac1;
  font-style: italic;
}
</style>
