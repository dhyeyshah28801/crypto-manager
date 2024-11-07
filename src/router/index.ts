import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useSessionStore } from "@/stores/sessionState";
import constants from "@/constants";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      allowedRoleId: [ constants.ADMIN, constants.USER]
    }
  },
  {
    path: "/home",
    name: "home",
    beforeEnter: validateAuth,
    component: HomeView,
    meta: {
      allowedRoleId: [ constants.ADMIN, constants.USER]
    }
  },
  
  {
    path: "/user",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserView.vue"),
    beforeEnter: validateAuth,
    meta: {
      allowedRoleId: [ constants.ADMIN ]
    }
  },

    {
    path: "/audit",
    name: "audit",
    component: () =>
      import("../views/AuditView.vue"),
    beforeEnter: validateAuth,
    meta: {
      allowedRoleId: [ constants.ADMIN ]
    }
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
  if(useSessionStore().user){
    if( (to.meta.allowedRoleId as Array<1 | 2 | 3 | undefined>)?.includes(useSessionStore().user?.userRoleId)){
      next()
    }
  } else {
    router.replace(from.path)
  }
}

export default router;
