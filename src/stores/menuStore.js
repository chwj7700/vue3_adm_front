import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    mainMenu: [
      {
        title: "템플릿",
        icon: "mdi-view-dashboard",
        active: false,
        id: "templates",
        subMenu: [
          {
            title: "목록",
            icon: "mdi-format-list-bulleted",
            active: false,
            component: "common/List",
            id: "entity-types",
          },
          {
            title: "등록템플릿",
            icon: "mdi-plus-box",
            active: false,
            component: "views/AddForm",
            id: "AddForm",
          },
          {
            title: "목록조회",
            icon: "mdi-account-multiple",
            active: false,
            component: "views/templates/MemberCardList",
            id: "MemberCardList",
          },
        ],
      },
      {
        title: "Reports",
        icon: "mdi-file-document-outline",
        active: false,
        id: "reports",
        subMenu: [
          {
            title: "Report 1",
            icon: "mdi-file-chart",
            active: false,
            component: "Counter",
            id: "report-1",
          },
          {
            title: "Report 2",
            icon: "mdi-file-chart-outline",
            active: false,
            component: "Counter",
            id: "report-2",
          },
        ],
      },
      {
        title: "Dataset",
        icon: "mdi-database",
        active: false,
        id: "dataset",
        subMenu: [
          {
            title: "Dataset 1",
            icon: "mdi-database-search",
            active: false,
            component: "Counter",
            id: "dataset-1",
          },
          {
            title: "Dataset 2",
            icon: "mdi-database-import",
            active: false,
            component: "Counter",
            id: "dataset-2",
          },
        ],
      },
      {
        title: "Clients",
        icon: "mdi-account-group",
        active: false,
        id: "clients",
        subMenu: [
          {
            title: "Client 1",
            icon: "mdi-account",
            active: false,
            component: "Counter",
            id: "client-1",
          },
          {
            title: "Client 2",
            icon: "mdi-account-outline",
            active: false,
            component: "Counter",
            id: "client-2",
          },
        ],
      },
    ],
    currentMainMenu: "templates",
    currentSubMenu: "dashboard",
  }),

  actions: {
    setMainMenu(menuId) {
      this.currentMainMenu = menuId;
      this.mainMenu.forEach((item) => {
        item.active = item.id === menuId;
      });
    },

    setSubMenu(menuId) {
      this.currentSubMenu = menuId;
      this.mainMenu.forEach((mainItem) => {
        mainItem.subMenu.forEach((subItem) => {
          subItem.active = subItem.id === menuId;
        });
      });
    },
  },
});
