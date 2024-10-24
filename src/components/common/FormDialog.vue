<template>
<v-dialog
  v-model="showDialog"
  max-width="700"
>
  <v-card>
    <v-card-title>
      <span
        class="text-h5"
      >
        <slot
          name="header"
        ></slot>
      </span>
    </v-card-title>
    <v-card-text>
      <slot
        name="body"
      ></slot>
    </v-card-text>
    <v-card-actions>
      <slot
        name="footer"
      ></slot>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script lang="ts">
import { ref, watch, onMounted, onUnmounted, SetupContext } from "vue";
interface Props {
  isDialogOpen?: boolean;
}
export default {
  name: "FormDialog",
  props: ["isDialogOpen"],
  setup(props: Props, context: SetupContext) {
    const showDialog = ref(props.isDialogOpen);

    watch(
      () => props.isDialogOpen,
      (newValue) => {
        showDialog.value = newValue;
      }
    );

    watch(showDialog, (newValue) => {
      if (!newValue) {
        context.emit("closeAppDialog");
      }
    });

    onMounted(() => {
      const closeOnUnmount = () => {
        if (!showDialog.value) {
          context.emit("closeAppDialog");
        }
      };

      onUnmounted(() => {
        closeOnUnmount();
      });
    });

    return {
      showDialog,
    };
  },
};
</script>
