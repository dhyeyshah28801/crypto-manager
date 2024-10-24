import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useSessionStore } from "@/stores/sessionState";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    beforeEnter: validateAuth,
    component: HomeView,
  },
  
  {
    path: "/user",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

async function validateAuth(
  to : RouteLocation,
  from: RouteLocation,
  next: () => void
){
  useSessionStore().user ? next() : router.replace(from.path)
}

export default router;
