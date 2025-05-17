<template>
  <v-row>
    <v-col cols="6">
      <v-menu v-model="startMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
        <template #activator="{ on, attrs }">
          <v-text-field v-model="startDateProxy" label="시작일" readonly v-bind="attrs" v-on="on" :placeholder="'YYYY-MM-DD'" />
        </template>
        <v-date-picker v-model="startDateProxy" @update:modelValue="startMenu = false" :max="endDateProxy || undefined" />
      </v-menu>
    </v-col>
    <v-col cols="6">
      <v-menu v-model="endMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
        <template #activator="{ on, attrs }">
          <v-text-field v-model="endDateProxy" label="종료일" readonly v-bind="attrs" v-on="on" :placeholder="'YYYY-MM-DD'" />
        </template>
        <v-date-picker v-model="endDateProxy" @update:modelValue="endMenu = false" :min="startDateProxy || undefined" />
      </v-menu>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  startDate: String,
  endDate: String,
});
const emit = defineEmits(["update:startDate", "update:endDate"]);

const startMenu = ref(false);
const endMenu = ref(false);

const startDateProxy = computed({
  get: () => props.startDate,
  set: (val) => emit("update:startDate", val),
});
const endDateProxy = computed({
  get: () => props.endDate,
  set: (val) => emit("update:endDate", val),
});
</script>
