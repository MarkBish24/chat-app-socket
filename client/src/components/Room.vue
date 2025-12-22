<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  room: Object,
  active: Boolean,
});

const emit = defineEmits(["select"]);
</script>

<template>
  <div :class="['room-icon', { active }]" @click="$emit('select', room)">
    {{ props.room.name }}
  </div>
</template>

<style scoped>
.room-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #2c2c3a;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.room-icon:hover {
  background-color: #3c3c4f;
}

.room-icon.active {
  background-color: #4caf50;
  transition: background-color 0.3s ease;
}

.room-icon.active:hover {
  background-color: #4ebf52;
}
</style>
