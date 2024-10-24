import { createApp } from "vue";

// Pinia
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: false,
        variables: {},
        colors: {
          background: "#ffffff",
          surface: "#ffffff",
          primary: "#1976d3",
          "primary-darken-1": "#3700B3",
          secondary: "#03DAC5",
          "secondary-darken-1": "#03DAC5",
          error: "#E53935",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
