<script setup>
import { defineProps, ref, watch } from "vue";
const props = defineProps({
  room: Object,
});

const messages = ref([]);
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
</script>

<template>
  <div class="box">
    <div v-for="msg in messages" :key="msg.id">
      {{ msg.message }}
    </div>
  </div>
</template>

<style scoped>
.box {
  flex: 1;
  background-color: #2c2c3a;
  overflow-y: auto;
}
</style>
