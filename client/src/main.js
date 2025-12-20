import { createApp } from "vue";
import App from "./App.vue";
import { io } from "socket.io-client";
import router from "./router/routes.js";

const socket = io("http://localhost:9000");

const app = createApp(App);
app.provide("socket", socket);
app.use(router);
app.mount("#app");
