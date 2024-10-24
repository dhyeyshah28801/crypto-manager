<template>
  <v-data-table-server
    hide-default-footer
    :headers="headers"
    :items="pfData"
    item-value="name"
    @update:options="fetchData()"
    class="border-xl"
  >
    <template v-slot:[`item.perChange`]="{ item }">
      <v-col>
        <v-chip
          :color="
            parseFloat(
              (
                ((item.currPrice - item.buyPrice) / item.buyPrice) *
                100
              ).toString(),
            ) > 0
              ? 'green'
              : 'red'
          "
        >
          {{
            parseFloat(
              (
                ((item.currPrice - item.buyPrice) / item.buyPrice) *
                100
              ).toString(),
            ).toFixed(2)
          }}%
        </v-chip>
      </v-col>
    </template>
  </v-data-table-server>
</template>
<script lang="ts">
import { Portfolio } from "@/models/porfolioModel";
import { getPFDetails } from "@/services/portfolioServices";
import { tryOnBeforeMount } from "@vueuse/core";
import { ref, Ref } from "vue";
interface Props {
  isDialogOpen?: boolean;
}
export default {
  name: "UserPortfolioTable",
  props: [],
  setup() {
    const pfData: Ref<Portfolio[]> = ref([]);
    const headers = ref([
      { title: "Name", key: "name", sortable: false, align: "center" },
      { title: "Price", key: "currPrice", sortable: false, align: "center" },
      { title: "Buy Price", key: "buyPrice", sortable: false, align: "center" },
      {
        title: "Quantity",
        key: "quantity",
        sortable: false,
        align: "center",
      },
      {
        title: "% Change",
        key: "perChange",
        sortable: false,
        align: "center",
      },
    ]);
    tryOnBeforeMount(async () => {
      await fetchData();
    });

    async function fetchData() {
      pfData.value = await getPFDetails();
      console.log(pfData.value);
    }

    return {
      pfData,
      headers,
      fetchData,
    };
  },
};
</script>
