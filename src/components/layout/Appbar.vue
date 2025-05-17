<template>
  <v-app-bar elevation="0" color="surface">
    <v-toolbar-title id="custom-toolbar-title" class="ma-0 pa-0">
      <v-icon>mdi-view-dashboard</v-icon>
      <span class="ml-2"><b>모빌카드 관리자</b></span>
    </v-toolbar-title>
    <nav>
      <template v-for="(item, idx) in menuStore.mainMenu" :key="item.id">
        <v-btn
          :color="menuStore.currentMainMenu === item.id ? 'primary' : 'accent'"
          :variant="menuStore.currentMainMenu === item.id ? 'flat' : 'text'"
          @click="changeMainMenu(item.id)"
        >
          {{ item.title }}
        </v-btn>
        <span v-if="idx < menuStore.mainMenu.length - 1" class="divider">|</span>
      </template>
    </nav>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon color="on-primary" v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { useMenuStore } from "../../stores/menuStore";

const menuStore = useMenuStore();

const changeMainMenu = (menuId) => {
  menuStore.setMainMenu(menuId);
  const mainMenu = menuStore.mainMenu.find((item) => item.id === menuId);
  if (mainMenu && mainMenu.subMenu.length > 0) {
    const firstSubMenu = mainMenu.subMenu[0];
    menuStore.setSubMenu(firstSubMenu.id);
  }
};

const logout = () => {
  // 실제 로그아웃 처리 로직으로 교체하세요
  alert("로그아웃 되었습니다!");
  window.location.href = "/login";
};
</script>

<style scoped>
#custom-toolbar-title {
  min-width: 279px;
  max-width: 279px;
  text-align: center;
}

.v-app-bar {
  min-width: 1000px;
}

.nav {
  display: flex;
  align-items: center;
  height: 64px;
}

.divider {
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 18px;
  user-select: none;
}
</style>
