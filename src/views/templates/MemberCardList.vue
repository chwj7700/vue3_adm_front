<template>
  <v-container id="search-container">
    <v-row class="">
      <v-col cols="12" md="3">
        <v-text-field v-model="search.name" label="성명" color="primary" density="comfortable" />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model="search.memberNo" label="회원번호" color="primary" density="comfortable" />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model="search.cardNo" label="카드번호" color="primary" density="comfortable" />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model="search.phone" label="핸드폰번호" color="primary" density="comfortable" />
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="onSearch" variant="flat">조회</v-btn>
        <v-btn class="ml-2" color="accent" @click="onReset" variant="outlined">초기화</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import { PaginationModule } from "ag-grid-community";
import { RowSelectionModule } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ClientSideRowModelApiModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";

const modules = [ClientSideRowModelModule, ClientSideRowModelApiModule, PaginationModule, RowSelectionModule];

const columnDefs = [
  { headerName: "성명", field: "name" },
  { headerName: "회원번호", field: "memberNo" },
  { headerName: "카드번호", field: "cardNo" },
  { headerName: "핸드폰번호", field: "phone" },
];

const rowData = ref([]);

const search = ref({
  name: "",
  memberNo: "",
  cardNo: "",
  phone: "",
});

const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 50, 100];
const gridApi = ref(null);

const gridOptions = ref({
  rowSelection: {
    mode: "multiRow",
    checkboxes: true,
  },
});

const onGridReady = (params) => {
  gridApi.value = params.api;
};

// 실제 API 연동
const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/member-cards", {
      params: {
        name: search.value.name,
        memberNo: search.value.memberNo,
        cardNo: search.value.cardNo,
        phone: search.value.phone,
      },
    });
    rowData.value = data;
    if (gridApi.value) {
      gridApi.value.setRowData(data);
    }
  } catch (e) {
    alert("데이터 조회에 실패했습니다.");
    rowData.value = [];
    if (gridApi.value) {
      gridApi.value.setRowData([]);
    }
  }
};

const onSearch = () => {
  fetchData();
};

const onReset = () => {
  search.value = { name: "", memberNo: "", cardNo: "", phone: "" };
  fetchData();
};

// 최초 진입 시 자동 조회
onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
