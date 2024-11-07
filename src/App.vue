<template>
  <v-app>
    <side-bar v-if="sessionStore.user" />
    <tool-bar v-if="sessionStore.user" class="top-0" />
    <v-container style="height: 40px; padding: 0">
      <router-view id="pageContent" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import SideBar from "./components/global/SideBar.vue";
import ToolBar from "./components/global/ToolBar.vue";
import { useSessionStore } from "./stores/sessionState";

const sessionStore = useSessionStore();
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-left: 75px;
  color: #2c3e50;
}
.v-data-table-header__content {
  font-weight: bolder;
  font-size: 16px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
