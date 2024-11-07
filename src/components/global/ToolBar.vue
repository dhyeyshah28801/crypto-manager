<template>
  <v-toolbar :elevation="5" color="primary" class="mb-3 top-0" dense>
    <v-spacer></v-spacer>
    <v-avatar color="white" size="50" class="mr-5">
      <span class="text-h5"> {{ sessionStore.user.firstName.at(0) }} </span>
    </v-avatar>
  </v-toolbar>
</template>

<script setup ts="lang">
import { useSessionStore } from "@/stores/sessionState";

const sessionStore = useSessionStore();
</script>
