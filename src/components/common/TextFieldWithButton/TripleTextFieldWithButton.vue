<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="5" class="d-flex pr-0">
        <v-text-field
          v-bind="textField1Props"
          :model-value="modelValue1"
          @update:modelValue="(val) => $emit('update:modelValue1', val)"
          class="mr-2"
          density="comfortable"
          variant="outlined"
        />
        <v-btn
          v-if="!buttonProps.hide"
          class="pa-0 mr-0"
          color="primary"
          min-width="48"
          height="48"
          v-bind="buttonProps"
          @click="openDialog"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <v-col class="pl-2">
        <v-text-field
          v-bind="textField2Props"
          :model-value="modelValue2"
          @update:modelValue="(val) => $emit('update:modelValue2', val)"
          density="comfortable"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-text-field
          v-bind="textField3Props"
          :model-value="modelValue3"
          @update:modelValue="(val) => $emit('update:modelValue3', val)"
          density="comfortable"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <CommonDialog
      v-if="dialogProps.openComponent"
      v-model="dialog"
      :max-width="dialogProps.maxWidth"
      :title="dialogProps.dialogTitle"
      @confirm="onSelectRow"
    >
      <template #default="{ onSelect, setSelected }">
        <component :is="dialogProps.openComponent" @selected="onSelect" @selectionChanged="setSelected" />
      </template>
    </CommonDialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CommonDialog from "../CommonDialog.vue";

const props = defineProps({
  textField1Props: {
    type: Object,
    default: () => ({
      label: "주소",
      placeholder: "주소를 입력하세요",
      type: "text",
      modelValue: "",
    }),
  },
  textField2Props: {
    type: Object,
    default: () => ({
      label: "우편번호",
      placeholder: "우편번호를 입력하세요",
      type: "text",
      modelValue: "",
    }),
  },
  textField3Props: {
    type: Object,
    default: () => ({
      label: "상세주소",
      placeholder: "상세주소를 입력하세요",
      type: "text",
    }),
  },
  buttonProps: {
    type: Object,
    default: () => ({
      hide: false,
    }),
  },
  dialogProps: {
    type: Object,
    default: () => ({
      openComponent: null,
      maxWidth: 800,
      dialogTitle: "공통 팝업",
      displayField1: "address",
      displayField2: "zipCode",
      displayField3: "addressDetail",
      buttonColor: "primary",
    }),
  },
  modelValue1: String,
  modelValue2: String,
  modelValue3: String,
});

const emit = defineEmits(["update:modelValue1", "update:modelValue2", "update:modelValue3"]);

const dialog = ref(false);

function openDialog() {
  dialog.value = true;
}

function onSelectRow(row) {
  emit("update:modelValue1", row[props.dialogProps.displayField1] || "");
  emit("update:modelValue2", row[props.dialogProps.displayField2] || "");
  emit("update:modelValue3", row[props.dialogProps.displayField3] || "");
  dialog.value = false;
}
</script>

<style scoped>
.v-btn {
  height: 48px;
}
</style>
