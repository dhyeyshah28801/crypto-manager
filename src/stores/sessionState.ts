import { defineStore } from "pinia";

interface SessionState {
  user? : {
    firstName: string;
    lastName: string;
    email: string;
    userRoleId: 1 | 2 | 3 
  }
}

export const useSessionStore = defineStore({
  id: "session",
  state: (): SessionState => ({
    user: undefined,
  }),
  persist: true,
  getters: {
    getSessionState: (state: SessionState) => state,
  },
  actions: {},
});
