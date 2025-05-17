<template>
  <v-navigation-drawer permanent class="left-navigation" :width="280" color="primary">
    <!-- 로고 섹션 -->
    <div class="pa-4">
      <div class="d-flex align-center">
        <v-icon size="40" color="white" class="mr-2">mdi-account-circle</v-icon>
        <span class="text-h6 font-weight-bold white--text"> 최우중님 안녕하세요.</span>
      </div>
    </div>

    <!-- 서브 메뉴 -->
    <v-list class="pa-4 text-left">
      <v-list-item
        v-for="(item, index) in currentSubMenu"
        :key="index"
        :class="{ 'active-menu-item': item.active }"
        class="mb-2 rounded-lg"
        @click="handleMenuClick(item)"
      >
        <v-list-item-title class="white--text text-uppercase font-weight-bold">
          <v-icon :color="item.active ? 'primary' : 'white'">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useTabStore } from "../../stores/tabStore";
import { useMenuStore } from "../../stores/menuStore";
import { computed } from "vue";

const tabStore = useTabStore();
const menuStore = useMenuStore();

const currentSubMenu = computed(() => {
  const mainMenu = menuStore.mainMenu.find((item) => item.id === menuStore.currentMainMenu);
  return mainMenu ? mainMenu.subMenu : [];
});

const handleMenuClick = (item) => {
  // 메뉴 클릭 이벤트 처리
  menuStore.setSubMenu(item.id);

  // 탭 추가
  tabStore.addTab({
    id: item.id,
    title: item.title,
    component: item.component,
    to: `/${item.id}`,
  });
};
</script>

<style scoped>
.left-navigation {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.active-menu-item {
  background-color: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-primary));
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.2);
}

.v-list-item {
  transition: background-color 0.3s;
}
</style>
