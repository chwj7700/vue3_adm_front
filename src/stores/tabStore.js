import { defineStore } from "pinia";

export const useTabStore = defineStore("tab", {
  state: () => ({
    tabs: [
      {
        id: "main",
        title: "메인",
        component: "views/Dashboard",
        to: "/",
      },
    ],
    activeTab: "main",
  }),

  actions: {
    addTab(tab) {
      if (!this.tabs.find((t) => t.id === tab.id)) {
        this.tabs.push(tab);
      }
      this.activeTab = tab.id;
    },

    closeTab(tabId) {
      const index = this.tabs.findIndex((tab) => tab.id === tabId);
      if (index > -1) {
        this.tabs.splice(index, 1);
        if (this.activeTab === tabId) {
          this.activeTab = this.tabs[0].id;
        }
      }
    },

    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
  },
});
