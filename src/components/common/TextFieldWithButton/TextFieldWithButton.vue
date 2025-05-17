<template>
  <div>
    <div class="d-flex">
      <v-text-field
        v-bind="textFieldProps"
        :model-value="modelValue"
        @update:modelValue="(val) => $emit('update:modelValue', val)"
        class="mr-2"
        density="comfortable"
        variant="outlined"
      />
      <v-btn v-if="!buttonProps.hide" class="pa-0 ma-0" color="primary" min-width="48" height="48" v-bind="buttonProps" @click="openDialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <CommonDialog
      v-if="dialogProps.openComponent"
      v-model="dialog"
      :max-width="dialogProps.maxWidth"
      :title="dialogProps.dialogTitle"
      @confirm="onConfirm"
    >
      <template #default="{ onSelect, setSelected }">
        <component :is="dialogProps.openComponent" @selected="onSelect" @selectionChanged="setSelected" />
      </template>
    </CommonDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommonDialog from "../CommonDialog.vue";

const props = defineProps({
  textFieldProps: {
    type: Object,
    default: () => ({
      label: "",
      placeholder: "",
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
      displayField: "address",
    }),
  },
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const dialog = ref(false);

function openDialog() {
  dialog.value = true;
}

function onConfirm(row) {
  emit("update:modelValue", row[props.dialogProps.displayField] || "");
}
</script>
