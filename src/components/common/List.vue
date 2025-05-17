<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field v-model="newRow.name" label="Name" color="primary" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="newRow.age" label="Age" type="number" color="primary" />
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn color="primary" @click="addRow" variant="flat">Add Row</v-btn>
        <v-btn color="error" class="ml-4" @click="deleteSelectedRow" variant="outlined">Delete Row</v-btn>
      </v-col>
    </v-row>

    <ag-grid-vue
      class="ag-theme-alpine"
      style="width: 100%; height: 500px; border-radius: 12px"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :pagination="true"
      :paginationPageSize="paginationPageSize"
      :paginationPageSizeSelector="paginationPageSizeSelector"
      :modules="modules"
      @grid-ready="onGridReady"
      :gridOptions="gridOptions"
    ></ag-grid-vue>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { PaginationModule } from "ag-grid-community";
import { RowSelectionModule } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ClientSideRowModelApiModule } from "ag-grid-community";
import { ValidationModule } from "ag-grid-community"; // <-- 추가 !!!
import "ag-grid-community/styles/ag-theme-alpine.css";

const modules = [ClientSideRowModelModule, ClientSideRowModelApiModule, ValidationModule, PaginationModule, RowSelectionModule]; // <-- 추가 !!!

const columnDefs = [
  { headerName: "ID", field: "id" },
  { headerName: "Name", field: "name" },
  { headerName: "Age", field: "age" },
];

const rowData = ref([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Tom", age: 28 },
]);

const newRow = ref({
  name: "",
  age: null,
});

const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 50, 100];
const gridApi = ref(null);

const gridOptions = ref({
  rowSelection: {
    mode: "multiRow",
    checkboxes: true, //default true
  },
});

// 그리드 준비 완료 시 호출
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const addRow = () => {
  const id = rowData.value.length + 1;
  const name = newRow.value.name?.trim();
  const age = parseInt(newRow.value.age);

  const newEntry = { id, name, age };

  if (name && typeof age === "number") {
    rowData.value.push(newEntry);
    gridApi.value.applyTransaction({ add: [newEntry] }); // grid에도 추가
    newRow.value.name = "";
    newRow.value.age = null;
  }
};

const deleteSelectedRow = () => {
  const selectedRows = gridApi.value.getSelectedRows();

  if (selectedRows.length === 0) return;
  gridApi.value.applyTransaction({ remove: selectedRows }); // grid에서도 삭제
};
</script>

<style></style>
