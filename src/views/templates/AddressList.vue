<template>
  <v-container>
    <v-container id="search-container" class="mb-8">
      <v-row class="">
        <v-col cols="12" md="4">
          <v-text-field density="compact" v-model="search.address" label="주소" color="primary" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field density="compact" v-model="search.addressDetail" label="상세주소" color="primary" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field density="compact" v-model="search.zipCode" label="우편번호" color="primary" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" @click="onSearch" variant="flat">조회</v-btn>
          <v-btn class="ml-2" color="primary" @click="onReset" variant="outlined">초기화</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <AgGridVue
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
      @rowDoubleClicked="onRowDblClicked"
      @rowClicked="onRowClicked"
      @selectionChanged="onSelectionChanged"
    ></AgGridVue>
  </v-container>
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
  { headerName: "주소", field: "address" },
  { headerName: "상세주소", field: "addressDetail" },
  { headerName: "우편번호", field: "zipCode" },
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
    mode: "singleRow",
    checkboxes: true,
  },
});

const onGridReady = (params) => {
  gridApi.value = params.api;
};

// 실제 API 연동
const fetchData = async () => {
  try {
    let { data } = await axios.get("/api/addresses", {
      params: {
        address: search.value.address,
        addressDetail: search.value.addressDetail,
        zipCode: search.value.zipCode,
      },
    });
    data = [
      { address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층", addressDetail: "테헤란로 14길 6 남도빌딩 2층", zipCode: "123456" },
      { address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층", addressDetail: "테헤란로 14길 6 남도빌딩 2층", zipCode: "123456" },
      { address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층", addressDetail: "테헤란로 14길 6 남도빌딩 2층", zipCode: "123456" },
    ];
    rowData.value = data;
  } catch (e) {
    alert("데이터 조회에 실패했습니다.");
    rowData.value = [];
  }
};

const onSearch = () => {
  fetchData();
};

const onReset = () => {
  search.value = { address: "", addressDetail: "", zipCode: "" };
  fetchData();
};

// 최초 진입 시 자동 조회
onMounted(() => {
  fetchData();
});

const emit = defineEmits(["selected", "selectionChanged"]);

const onRowClicked = (event) => {
  // console.log("클릭 이벤트:", event);
  // emit('select-address', event.data.address);
};

const onRowDblClicked = (event) => {
  emit("selected", event.data);
};

const onSelectionChanged = (event) => {
  emit("selectionChanged", event.api.getSelectedRows()[0]);
};
</script>

<style scoped></style>
