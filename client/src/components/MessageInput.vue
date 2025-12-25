<script>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  socket: Object,
  room: Object,
  username: String,
});

const message = ref("");
let typingTimeout = null;
const typingUsers = ref(new Set());

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

onMounted(() => {
  if (!props.socket) return;

  props.socket.on("userTyping", ({ username }) => {
    typingUsers.value.add(username);
  });

  props.socket.on("userStoppedTyping", ({ username }) => {
    typingUsers.value.delete(username);
  });
});
</script>

<template>
  <div>
    <div v-if="typingUsers && typingUsers.size > 0">
      <div v-if="typingUsers && typingUsers.size > 0">
        {{ [...typingUsers].join(", ") }} typing…
      </div>
    </div>
    <div class="chat-input">
      <textarea
        ref="textarea"
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
</style>
