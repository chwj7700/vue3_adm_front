<template>
  <v-container fluid class="pa-0">
    <Appbar />
    <LeftNavigation />
    <v-container id="main-container">
      <v-tabs v-model="tabStore.activeTab" density="compact" mobile-breakpoint="xs">
        <v-tab
          v-for="tab in tabStore.tabs"
          :key="tab.id"
          :value="tab.id"
          @click="tabStore.setActiveTab(tab.id)"
          :color="tabStore.activeTab === tab.id ? 'primary' : 'default'"
          :variant="tabStore.activeTab === tab.id ? 'flat' : 'text'"
        >
          <v-icon v-if="tab.id === 'main'">mdi-home</v-icon>
          <b>{{ tab.title }}</b>
          <v-btn v-if="tab.id !== 'main'" variant="plain" icon="mdi-close" size="small" @click.stop="tabStore.closeTab(tab.id)"></v-btn>
        </v-tab>
      </v-tabs>

      <v-window v-model="tabStore.activeTab">
        <v-window-item v-for="tab in tabStore.tabs" :key="tab.id" :value="tab.id">
          <Title :title="tab.title" :path="tab.component" />
          <v-container id="main-component-container">
            <component id="main-component" :is="getComponent(tab.component)" />
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </v-container>
</template>

<script setup>
import { useTabStore } from "../../stores/tabStore";
import LeftNavigation from "./LeftNavigation.vue";
import Appbar from "./Appbar.vue";
import Title from "./Title.vue";

const modules = import.meta.glob("../../**/*.vue", { eager: true });

const components = {};
for (const path in modules) {
  const key = path.replace(/^(\.\.\/)+/, "").replace(/\.vue$/, "");
  components[key] = modules[path].default;
}
console.log("등록된 컴포넌트:", Object.keys(components)); // 디버깅용

const tabStore = useTabStore();

const getComponent = (componentKey) => {
  return components[componentKey];
};
</script>

<style scoped>
#main-container {
  position: fixed;
  z-index: 1004;
  top: 64px;
  left: 280px;
  margin: 0px;
  padding: 0px 0px 0px 0px;
  width: calc(100% - 280px);
  height: calc(100% - 64px);
  min-width: 600px;
}
.v-tabs {
  background-color: rgb(var(--v-theme-surface));
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  padding: 0px 0px 0px 4px;
}

.v-tabs .v-tab {
  justify-content: left;
  text-transform: none;
  border-radius: 4px 4px 0px 0px !important;
  border-top: 1px solid rgb(var(--v-theme-border)) !important;
  border-left: 1px solid rgb(var(--v-theme-border)) !important;
  border-right: 1px solid rgb(var(--v-theme-border)) !important;
  margin-right: 4px;
  padding: 0px 8px;
  min-width: 50px;
  background-color: rgb(var(--v-theme-surface));
}

.v-tabs .v-tab .v-btn {
  width: 20px;
  height: 20px;
}

.v-window {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.v-window-item {
  height: calc(100% - 68px - 36px);
}

.v-window-item > .v-container {
  overflow-y: auto;
  height: 100%;
}

#main-component {
  padding: 12px;
}
</style>
