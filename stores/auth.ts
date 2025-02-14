import type { LoginForm, RegisterForm, User, RawUser } from "~/types/auth";
import { transformUser } from "~/types/auth";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authenticated: false,
    user: null as User | null,
    token: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
    auth: (state) => state,
    isAdmin: (state) => state.user?.isAdmin || false,
  },

  actions: {
    async login(postData: LoginForm) {
      try {
        const data = await apiRequest("post", "/login", postData);
        const transformedUser = transformUser(data.user as RawUser);
        this.setUser(transformedUser);
        this.setToken(data.token);
        this.setAuthenticated(true);
      } catch (error) {
        this.setUser(null);
        this.setAuthenticated(false);
        throw error;
      }
    },

    async register(postData: RegisterForm) {
      try {
        const { data } = await apiRequest("post", "/register", postData);
        if (data.user) {
          const transformedUser = transformUser(data.user as RawUser);
          this.setUser(transformedUser);
          this.setAuthenticated(true);
        }
      } catch (error) {
        this.setUser(null);
        this.setAuthenticated(false);
        throw error;
      }
    },

    async fetchUser() {
      try {
        const data = await apiRequest("get", "/api/user");
        const transformedUser = transformUser(data.user as RawUser);
        this.setUser(transformedUser);
        this.setToken(data.token);
        this.setAuthenticated(true);
      } catch (error) {
        this.setUser(null);
        this.setAuthenticated(false);
        this.setToken(null);
        throw error;
      }
    },

    async logout() {
      try {
        const { api } = useAxios();
        await api.get("/logout");
        this.setUser(null);
        this.setAuthenticated(false);
        this.setToken(null);
      } catch (error) {
        throw error;
      }
    },

    setUser(user: User | null) {
      this.user = user;
    },

    setAuthenticated(value: boolean) {
      this.authenticated = value;
    },

    setToken(token: string | null) {
      this.token = token;
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
