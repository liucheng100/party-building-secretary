import { defineStore } from "pinia";

export const useIsMobileStore = defineStore("isMobile", {
  state: () => ({
    isMobile: window.innerWidth <= 768,
  }),
  actions: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  }
});