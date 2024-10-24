<template>
  <v-container max-height="90dvh">
    <v-row>
      <v-col :cols="8">
        <v-text class="text-h2"> Cryptocurrency Prices Today </v-text>
        <v-data-table-server
          class="mt-3"
          v-model:items-per-page="itemPerPageVar"
          :headers="tableHeaders"
          :fixed-header="true"
          height="75dvh"
          :items="cryptoData"
          :items-length="totalItemLengthCount"
          :loading="false"
          item-value="id"
          :items-per-page-options="itemsPerPageOptions"
          @update:options="updatePagination"
        >
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
      <v-col :cols="4">
        <v-card
          :elevation="10"
          style="
            min-height: 90%;
            padding: 20px;
            background-color: bisque;
            margin-right: 10px;
            margin-top: 10px;
          "
        >
          <v-row style="min-height: 50%">
            <v-col>
              <v-row>
                <v-text style="width: 100%" class="mt-7 my-3 text-h4">
                  {{
                    sessionStore.user?.userRoleId === constants.ADMIN
                      ? "General"
                      : "User"
                  }}
                  Portfolio
                </v-text>
              </v-row>
              <v-row>
                <div style="width: 100%">
                  <Doughnut :data="data" :options="options" />
                </div>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <UserPortfolioTable></UserPortfolioTable>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

const sessionStore = useSessionStore();

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
