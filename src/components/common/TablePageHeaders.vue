<template>
  <div height="100px">
    <v-card class="ma-5 pa-5 rounded-xl" elevation="20px">
      <v-row align="center" class="mb-5">
        <v-col :cols="3">
          <span style="font-size: 30px; margin-left: 5px; font-weight: bolder">
            {{ pageTitle }}
          </span>
        </v-col>
        <v-col :cols="9">
          <slot name="search"></slot>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row justify="space-between">
            <slot name="filtersAndActionBtn"></slot>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
interface Props {
  title?: string;
}
export default {
  props: ["title"],
  setup(props: Props) {
    return { pageTitle: props.title };
  },
};
</script>
