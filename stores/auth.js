import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authenticated: false,
    user: {},
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
    auth: (state) => state,
  },
  actions: {
    async login() {
      const { $api } = useNuxtApp();
      try {
        const { data } = await $api.get("/api/user");
        this.setUser(data);
        this.setAuthenticated(true);
      } catch (error) {
        this.setUser({});
        this.setAuthenticated(false);
      }
    },
    async fetchUser() {
      try {
        const { data } = await api.get("/api/user");
        if (data.success) {
          this.setUser(data.data);
          this.setAuthenticated(true);
        }
      } catch (error) {
        this.setUser({});
        this.setAuthenticated(false);
      }
    },
    logout() {
      this.setUser({});
      this.setAuthenticated(false);
    },
    setUser(user) {
      this.user = user;
    },
    setAuthenticated(value) {
      this.authenticated = value;
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
