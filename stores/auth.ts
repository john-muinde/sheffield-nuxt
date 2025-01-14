export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authenticated: false,
    user: {} as any,
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
    auth: (state) => state,
  },
  actions: {
    async login() {
      try {
        const { api } = useAxios();
        const { data } = await api.get("/api/user");
        this.setUser(data);
        this.setAuthenticated(true);
      } catch (error) {
        this.setUser({});
        this.setAuthenticated(false);
      }
    },
    async fetchUser() {
      try {
        const { api } = useAxios();
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
    setUser(user: any) {
      this.user = user;
    },
    setAuthenticated(value: any) {
      this.authenticated = value;
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
