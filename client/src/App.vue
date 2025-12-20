<script setup>
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import ChatRoomPage from "./components/ChatRoomPage.vue";
import { ref } from "vue";

const page = ref("Login");
</script>

<template>
  <LoginPage />
</template>

<style scoped></style>
