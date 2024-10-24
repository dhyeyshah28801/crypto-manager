import { defineStore } from "pinia";

interface SideBarState {
  isActive: boolean;
}

export const useSideBarStore = defineStore({
  id: "sidebar",
  state: (): SideBarState => ({
    isActive: false,
  }),
  persist: true,
  getters: {
    getSideBarState: (state: SideBarState) => state.isActive,
  },
  actions: {
    toggleState() {
      this.isActive = !this.isActive;
    },
  },
});
