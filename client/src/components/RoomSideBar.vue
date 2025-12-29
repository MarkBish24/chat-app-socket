<script setup>
import { defineProps } from "vue";

import Users from "./Users.vue";
import VoiceChats from "./VoiceChats.vue";

const props = defineProps({
  socket: Object,
  room: Object,
  user: Object,
});
</script>
<template>
  <div class="main">
    <Users :socket="socket" :user="user" />
    <VoiceChats />
  </div>
</template>
<style scoped>
.main {
  width: 150px;
  height: 100%;
  background-color: red;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  padding: 5px;
  box-sizing: border-box;
}
</style>
