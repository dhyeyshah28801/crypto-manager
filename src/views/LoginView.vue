<template>
  <v-row style="max-height: 90dvh; margin-left: -75px; padding: -10%">
    <!-- Left Part of the Login Screen -->
    <v-col
      :cols="8"
      style="background-color: white"
      class="d-flex align-center justify-center"
    >
      <v-img
        :src="require('../assets/images/loginLogo.png')"
        width="100%"
      ></v-img>
    </v-col>

    <!-- Right Part of the Login Screen -->
    <v-col
      :cols="4"
      style="background-color: white"
      class="d-flex align-center justify-center"
    >
      <v-card
        :elevation="7"
        class="d-flex align-center justify-center pa-3 rounded-xl"
        min-height="400"
        min-width="90%"
      >
        <v-col>
          <v-row style="text-align: center">
            <v-container min-height="100%">
              <v-img
                src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035"
                height="100px"
              ></v-img>
            </v-container>
          </v-row>
          <v-card elevation="0" class="rounded-xl mt-5" color="#8CFFEC">
            <v-row class="mx-2 mt-5">
              <v-text-field
                rounded
                variant="solo"
                class="mt-5"
                label="Enter Email"
              ></v-text-field>
            </v-row>
            <v-row class="mx-2 mt-n4 mb-1">
              <v-text-field
                variant="solo"
                rounded
                class="mt-5 mb-5"
                label="Enter Password"
              ></v-text-field>
            </v-row>
          </v-card>
          <v-btn
            rounded
            min-height="60px"
            variant="elevated"
            class="loginBtn"
            color="blue"
            v-on:click="
              () => {
                router.push('/home');
                // Here we would make the API call to check username and password and
                // The backend would send user data and JWT token with expiry
                sessionStore.user = {
                  firstName: 'Dhyey',
                  lastName: 'Shah',
                  email: 'dxs240020@utdallas.edu',
                  userRoleId: 2,
                };
              }
            "
          >
            Login
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
    <div
      class="position-absolute top-0 right-0 bg-primary rounded-lg pa-3 mr-5 mt-9"
    >
      <v-btn
        v-on:click="
          () => {
            router.push('/home');
            // Here we would make the API call to check username and password and
            // The backend would send user data and JWT token with expiry
            sessionStore.user = {
              firstName: 'Dhyey',
              lastName: 'Shah',
              email: 'dxs240020@utdallas.edu',
              userRoleId: 1,
            };
          }
        "
      >
        Login As Admin</v-btn
      >
    </div>
  </v-row>
</template>

<script setup lang="ts">
import router from "@/router";
import { useSessionStore } from "@/stores/sessionState";
import { tryOnMounted } from "@vueuse/core";
const sessionStore = useSessionStore();

tryOnMounted(() => {
  sessionStore.user = undefined;
});
</script>
<style lang="css">
.text-h3 {
  margin-top: -15px;
  margin-bottom: 30px;
}

.loginBtn {
  width: 100%;
  margin-top: 40px;
}
</style>
