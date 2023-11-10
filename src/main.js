import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import CalendarPage from "./components/CalendarPage.vue";
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import ProfileInfo from "./components/ProfileInfo.vue";
import AddEvent from "./components/AddCalendarEvent.vue";
import axios from "axios";

const routes = [
  { path: "/calendar", component: CalendarPage },
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/main", name: "MainPage", component: Main },
  { path: "/profileInfo", name: "ProfileInfo", component: ProfileInfo },
  { path: "/addevent", name: "AddEvent", component: AddEvent },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.config.globalProperties.$axios = axios;

app.mount("#app");
