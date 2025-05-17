<template>
  <v-dialog v-model="dialogModel" :max-width="maxWidth">
    <v-card>
      <v-card-title>
        <slot name="title">{{ title }}</slot>
      </v-card-title>
      <v-card-text>
        <slot :onSelect="onSelect" :selected="selected" :setSelected="setSelected">
          {{ message }}
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="onConfirm">확인</v-btn>
        <v-btn color="secondary" @click="close">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: "알림" },
  message: { type: String, default: "" },
  maxWidth: { type: [String, Number], default: 400 },
});
const emit = defineEmits(["update:modelValue", "confirm"]);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const selected = ref([]);
function setSelected(val) {
  selected.value = val;
}

function close() {
  emit("update:modelValue", false);
}

function onSelect(value) {
  emit("confirm", value);
  close();
}

function onConfirm() {
  emit("confirm", selected.value);
  close();
}
</script>
