<script setup></script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style scoped>
#main-container {
  padding: 64px 0 0 280px;
  max-width: 100%;
  width: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
