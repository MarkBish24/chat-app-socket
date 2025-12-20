import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ChatRoomPage from "../pages/ChatRoomPage.vue";

const routes = [
  { path: "/", name: "Login", component: LoginPage },
  { path: "/chat", name: "Chat", component: ChatRoomPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
