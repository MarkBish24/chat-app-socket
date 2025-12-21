import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ChatRoomPage from "../pages/ChatRoomPage.vue";

const routes = [
  { path: "/", name: "Login", component: LoginPage },
  {
    path: "/chat",
    name: "Chat",
    component: ChatRoomPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Auth guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  if (to.meta.requiresAuth && !user) {
    next("/");
  } else {
    next();
  }
});

export default router;
