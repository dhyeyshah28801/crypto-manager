<template>
  <!-- Component to set Filter, Search and Add User  -->
  <TablePageHeaders :title="'User Management'">
    <template v-slot:search>
      <v-text-field
        :loading="false"
        v-model="userNameSearchString"
        append-inner-icon="mdi-magnify"
        label="Search users"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="fetchUsers()"
      ></v-text-field>
    </template>

    <template v-slot:filtersAndActionBtn>
      <v-select
        :items="roleNameArray"
        label="User Role"
        variant="solo"
        v-model="userRoleVar"
        class="mx-5"
        @update:model-value="fetchUsers()"
      ></v-select>

      <v-select
        :items="statusNameArray"
        label="User Status"
        variant="solo"
        v-model="userStatusVar"
        class="mx-5"
        @update:model-value="fetchUsers()"
      >
      </v-select>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            size="large"
            variant="elevated"
            class="mt-1 mx-5"
            color="primary"
            v-bind="props"
            @click="
              () => {
                isDialogOpen = true;
              }
            "
          >
            Add User
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <FormDialog
            :isDialogOpen="isDialogOpen"
            @closeAppDialog="closeDialog, (isActive.value = false)"
          >
            <template v-slot:header> Add User </template>
            <template v-slot:body>
              <v-form @submit.prevent="() => {}" v-model="isUserValid">
                <v-text-field
                  label="Username"
                  :rules="nameRules"
                  variant="solo"
                  required
                ></v-text-field>
                <v-text-field
                  label="Email"
                  :rules="userEmailRules"
                  variant="solo"
                  required
                ></v-text-field>
                <v-select
                  :items="roleNameArray"
                  label="User Role"
                  item-title="text"
                  variant="solo"
                  item-value="value"
                ></v-select>
                <v-select
                  :items="statusNameArray"
                  label="User Status"
                  item-title="text"
                  item-value="value"
                  variant="solo"
                ></v-select>
              </v-form>
            </template>
            <template v-slot:footer>
              <v-btn color="error" variant="elevated" @click="closeDialog">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                variant="elevated"
                color="primary"
                :disabled="!isUserValid"
                @click="() => {}"
              >
                Submit
              </v-btn>
            </template>
          </FormDialog>
        </template>
      </v-dialog>
    </template>
  </TablePageHeaders>

  <!-- Table -->
  <v-data-table-server
    v-model:items-per-page="itemPerPageVar"
    :headers="tableHeaders"
    :items="userData"
    :items-length="totalItemLengthCount"
    :loading="false"
    item-value="id"
    :items-per-page-options="itemsPerPageOptions"
    @update:options="updatePagination"
  >
    <!-- Refactored Columns -->
    <template v-slot:[`item.status`]="{ item }">
      <span>
        {{ item.status === 1 ? "Active" : "Inactive" }}
      </span>
    </template>

    <template v-slot:[`item.userRoleId`]="{ item }">
      <span>
        {{ item.userRoleId === 1 ? "Admin" : "User" }}
      </span>
    </template>
    <!-- TODO: Here we add action buttons to edit and delete user -->
  </v-data-table-server>
</template>

<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import TablePageHeaders from "@/components/common/TablePageHeaders.vue";
import constants from "@/constants";
import { User } from "@/models/userModel";
import {
  getUsers,
  roleConvertor,
  statusConvertor,
} from "@/services/userServices";
import { tryOnBeforeMount } from "@vueuse/core";
import { Ref, ref } from "vue";

// Filter Values
let statusNameArray = ["All", "Active", "Inactive"];
let roleNameArray = ["All", "Admin", "User"];

// Filter Initial Values
let userNameSearchString = ref("");
let userRoleVar = ref("All");
let userStatusVar = ref("All");

// Table Variables
let userData: Ref<Array<User>> = ref([]);
let totalItemLengthCount = ref(0);
const tableHeaders: Array<object> = [
  { title: "Name", key: "name", sortable: false, align: "center" },
  { title: "Email", key: "email", sortable: false, align: "center" },
  { title: "User Role", key: "userRoleId", sortable: false, align: "center" },
  { title: "Status", key: "status", sortable: false, align: "center" },
  // TODO: Add Column for Action Buttons
];
const itemsPerPageOptions = constants.TABLE_FOOTER_ITEMS_PER_PAGE_OPTIONS;
let itemPerPageVar = ref(5);

// Dialog Variables (Activators, Functions and Rules)
let isUserValid = ref(false);
const isDialogOpen = ref(false);
const closeDialog = () => {
  isDialogOpen.value = false;
};
const nameRules = [
  (v: string) => !!v || "Name is required",
  (v: string) => v.length <= 30 || "Name must be less than 31 characters",
  (v: string) => v.length >= 3 || "Name must be greater than 2 characters",
];
const userEmailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) =>
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
    "E-mail must be valid",
];

// Functions
tryOnBeforeMount(() => {
  fetchUsers();
});

function updatePagination(data: any) {
  console.log(data);
  fetchUsers(data);
}

function fetchUsers(data?: any) {
  userData.value = getUsers({
    searchString: userNameSearchString.value,
    userRole: roleConvertor(userRoleVar.value),
    status: statusConvertor(userStatusVar.value),
  });

  totalItemLengthCount.value = userData.value.length;
  if (data) {
    const { itemsPerPage, page, sortBy } = data;
    // Here we manually paginate data whereas we would receive paginated data from the backend itself
    userData.value = userData.value.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage,
    );
  }
}
</script>
