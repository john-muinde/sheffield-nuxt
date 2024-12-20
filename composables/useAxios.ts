import axios, { type AxiosInstance } from "axios";
import { ref } from "vue";

class CsrfTokenManager {
  private static instance: CsrfTokenManager;
  private tokenPromise: Promise<void> | null = null;
  private lastFetchTime: number = 0;
  private readonly TOKEN_VALIDITY_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  private constructor() {}

  static getInstance(): CsrfTokenManager {
    if (!CsrfTokenManager.instance) {
      CsrfTokenManager.instance = new CsrfTokenManager();
    }
    return CsrfTokenManager.instance;
  }

  async refreshToken(api: AxiosInstance): Promise<void> {
    const currentTime = Date.now();

    // If a token refresh is already in progress, return that promise
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // If the token is still valid, don't refresh
    if (currentTime - this.lastFetchTime < this.TOKEN_VALIDITY_DURATION) {
      return Promise.resolve();
    }

    // Create new token refresh promise
    this.tokenPromise = api
      .get("/sanctum/csrf-cookie")
      .then(() => {
        this.lastFetchTime = Date.now();
      })
      .finally(() => {
        this.tokenPromise = null;
      });

    return this.tokenPromise;
  }
}

export default function useAxios() {
  const rtConfig = useRuntimeConfig();
  const url = rtConfig.public.API_URL || "https://dev.sheffieldafrica.com";
  const BASE_URL =
    rtConfig.public.BASE_URL || "https://dev.sheffieldafrica.com";
  const loading = ref<boolean>(false);
  const csrfManager = CsrfTokenManager.getInstance();

  const api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  api.interceptors.request.use(
    async (config) => {
      loading.value = true;

      // Only fetch CSRF token for state-changing requests
      if (
        ["post", "put", "patch", "delete"].includes(
          config.method?.toLowerCase() || ""
        )
      ) {
        await csrfManager.refreshToken(api);
      }

      return config;
    },
    (error) => {
      loading.value = false;
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      loading.value = false;
      return response;
    },
    (error) => {
      loading.value = false;
      return Promise.reject(error);
    }
  );

  // Expose a method to manually refresh CSRF token if needed
  const refreshCsrf = () => csrfManager.refreshToken(api);

  return {
    api,
    refreshCsrf,
    loading,
    BASE_URL,
    API_URL: url,
  };
}
