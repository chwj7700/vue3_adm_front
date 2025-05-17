<template>
  <section id="main-top-bar" class="d-flex justify-space-between">
    <v-label id="main-top-bar-title">{{ title }}</v-label>
    <v-label id="main-top-bar-path"><v-icon>mdi-home</v-icon> > {{ path.replaceAll("/", " > ") }}</v-label>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
  path: String,
});
</script>

<style scoped>
#main-top-bar {
  background-color: rgb(var(--v-theme-background));
  min-width: 100%;
  align-items: center;
  padding: 20px 12px 12px 12px;
}

#main-top-bar-title {
  font-weight: bold;
  font-size: 24px;
}

#main-top-bar-path {
  font-size: 12px;
}
</style>
