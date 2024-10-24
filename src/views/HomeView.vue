<template>
  <v-row style="max-height: 70dvh">
    <!-- CryptoCurrency Table -->
    <v-col :cols="8">
      <v-text class="text-h3"> Cryptocurrency Prices Today </v-text>
      <v-data-table-server
        class="mt-3"
        v-model:items-per-page="itemPerPageVar"
        :headers="tableHeaders"
        :fixed-header="true"
        height="70dvh"
        density="compact"
        :items="cryptoData"
        :items-length="totalItemLengthCount"
        :loading="false"
        item-value="id"
        :items-per-page-options="itemsPerPageOptions"
        @update:options="updatePagination"
      >
        <!-- Refactored Columns -->
        <template v-slot:[`item.name`]="{ item }">
          <v-col>
            <v-img :src="item.image_url" alt="logo" height="50px"></v-img>

            <span>
              {{ item.name }}
            </span>
          </v-col>
        </template>

        <template v-slot:[`item.percent_change_24h`]="{ item }">
          <v-chip
            :color="item.percent_change_24h.startsWith('+') ? 'green' : 'red'"
          >
            {{ item.percent_change_24h }}
          </v-chip>
        </template>

        <template v-slot:[`item.percent_change_7d`]="{ item }">
          <v-chip
            :color="item.percent_change_7d.startsWith('+') ? 'green' : 'red'"
          >
            {{ item.percent_change_7d }}
          </v-chip>
        </template>

        <template v-slot:[`item.percent_change_30d`]="{ item }">
          <v-chip
            :color="item.percent_change_30d.startsWith('+') ? 'green' : 'red'"
          >
            {{ item.percent_change_30d }}
          </v-chip>
        </template>
      </v-data-table-server>
    </v-col>
    <!-- Portfolio Details -->
    <v-col :cols="4">
      <v-card
        :elevation="10"
        style="
          min-height: 70%;
          max-height: 90%;
          padding: 20px;
          background-color: bisque;
          margin-right: 10px;
          margin-top: 10px;
          padding-bottom: 20px;
        "
      >
        <!-- Heading and Chart Area -->
        <v-row style="min-height: 90%">
          <v-col>
            <v-row>
              <v-text style="width: 100%" class="mt-2 my-3 text-h5">
                {{
                  sessionStore.user?.userRoleId === constants.ADMIN
                    ? "General"
                    : "User"
                }}
                Portfolio
              </v-text>
            </v-row>
            <v-row>
              <div style="width: 100%; height: 10pc">
                <Doughnut :data="data" :options="options" />
              </div>
            </v-row>
          </v-col>
        </v-row>

        <!-- Portfolio Table Using Component -->
        <v-row class="mt-5">
          <UserPortfolioTable></UserPortfolioTable>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UserPortfolioTable from "@/components/special/UserPortfolioTable.vue";
import constants from "@/constants";
import { Crypto } from "@/models/cryptoModel";
import { fetchCryptos } from "@/services/cryptoServices";
import { useSessionStore } from "@/stores/sessionState";
import { tryOnBeforeMount } from "@vueuse/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Ref, ref } from "vue";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

//Store Initializations
const sessionStore = useSessionStore();

// Table Variables
let cryptoData: Ref<Array<Crypto>> = ref([]);
let totalItemLengthCount = ref(0);
const tableHeaders: Array<object> = [
  {
    title: "#",
    key: "rank",
    sortable: false,
    align: "center",
  },
  {
    title: "Name",
    key: "name",
    sortable: false,
    align: "center",
  },
  {
    title: "Price",
    key: "price",
    sortable: false,
    align: "center",
  },
  {
    title: "Percent Change (24 Hours)",
    key: "percent_change_24h",
    sortable: false,
    align: "center",
  },
  {
    title: "Percent Change (7 Days)",
    key: "percent_change_7d",
    sortable: false,
    align: "center",
  },
  {
    title: "Percent Change (30 Days)",
    key: "percent_change_30d",
    sortable: false,
    align: "center",
  },
  {
    title: "Market Cap",
    key: "market_cap",
    sortable: false,
    align: "center",
  },
  {
    title: "Volume (24 Hours)",
    key: "volume_24h",
    sortable: false,
    align: "center",
  },
];
const itemsPerPageOptions = constants.TABLE_FOOTER_ITEMS_PER_PAGE_OPTIONS;
let itemPerPageVar = ref(10);

// Chart Variables
const data = {
  labels: ["Bitcoin", "Ethereum", "Tether", "BNB"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [60, 40, 5, 20],
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
};

//Functions
tryOnBeforeMount(async () => {
  cryptoData.value = await fetchCryptos();
});

function updatePagination(data: any) {
  fetchData(data);
}

async function fetchData(data?: any) {
  cryptoData.value = await fetchCryptos();

  totalItemLengthCount.value = cryptoData.value.length;
  if (data) {
    const { itemsPerPage, page } = data;
    cryptoData.value = cryptoData.value.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage,
    );
  }
}
</script>
