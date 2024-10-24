<template>
  <v-navigation-drawer expand-on-hover rail :rail-width="75">
    <template v-slot:prepend>
      <v-toolbar color="primary" :elevation="5">
        <div style="width: 100%" class="d-flex justify-space-between">
          <router-link class="ml-3" to="/">
            <v-img :src="require('@/assets/images/logo.png')" width="50px" />
          </router-link>
        </div>
      </v-toolbar>
    </template>
    <v-divider></v-divider>

    <v-list nav>
      <div v-for="(item, i) in sideBarOptions" :key="i">
        <v-list-item
          class="d-flex ml-2"
          :value="item"
          color="primary"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.href"
          link
        ></v-list-item>
      </div>
      <v-list-item
        class="d-flex ml-2"
        :prepend-icon="'mdi-logout'"
        :title="'Logout'"
        :to="'/'"
        link
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import constants from "@/constants";
import { useSessionStore } from "@/stores/sessionState";
import { computed } from "vue";
// import { useRouter } from "vue-router";
interface routeObj {
  id: number;
  icon: string;
  title: string;
  href: string;
  allowRoleIDs: Array<number>;
}
interface routeObjArr extends routeObj {
  children?: Array<routeObj>;
}
// const router = useRouter();

const menuItem: Array<routeObjArr> = [
  {
    id: 0,
    icon: "mdi-home",
    title: "Home Page",
    href: "/home",
    allowRoleIDs: [constants.ADMIN, constants.USER],
  },
  {
    id: 9,
    icon: "mdi-history",
    title: "Audit Management",
    href: "/audit",
    allowRoleIDs: [constants.ADMIN],
  },
  {
    id: 10,
    icon: "mdi-account-details-outline",
    title: "User Management",
    href: "/user",
    allowRoleIDs: [constants.ADMIN],
  },
];

const sideBarOptions = computed(() => {
  const sessionStore = useSessionStore();
  const user = sessionStore.user;
  if (!user) {
    return [];
  }
  let currentRoleId = user ? Number(user.userRoleId) : 0;
  return menuItem.filter((el) => {
    if (el?.allowRoleIDs && el?.allowRoleIDs !== undefined) {
      return el.allowRoleIDs.includes(currentRoleId);
    }
    return true;
  });
});
// const logOutUser = async () => {
//   router.replace("/logout");
// };
</script>

<style>
.v-toolbar__title {
  color: #fff;
  position: sticky;
}
.v-navigation-drawer .v-navigation-drawer--absolute {
  position: fixed;
}
</style>
