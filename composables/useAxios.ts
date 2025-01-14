import axios, { type AxiosInstance } from "axios";
import { ref } from "vue";
import Cookies from "js-cookie";

class CsrfTokenManager {
  private static instance: CsrfTokenManager;
  private tokenPromise: Promise<void> | null = null;
  private lastFetchTime: number = 0;
  private readonly TOKEN_VALIDITY_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

  private constructor() {}

  static getInstance(): CsrfTokenManager {
    if (!CsrfTokenManager.instance) {
      CsrfTokenManager.instance = new CsrfTokenManager();
    }
    return CsrfTokenManager.instance;
  }

  private getXsrfToken(): string | undefined {
    return Cookies.get("XSRF-TOKEN");
  }

  async refreshToken(api: AxiosInstance): Promise<void> {
    const currentTime = Date.now();

    // If a token refresh is already in progress, return that promise
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // Check if we have a valid token
    const currentToken = this.getXsrfToken();
    if (
      currentToken &&
      currentTime - this.lastFetchTime < this.TOKEN_VALIDITY_DURATION
    ) {
      return Promise.resolve();
    }

    // Create new token refresh promise
    this.tokenPromise = api
      .get("/sanctum/csrf-cookie", {
        withCredentials: true,
        baseURL:
          process.env.NUXT_PUBLIC_API_URL || "https://sheffieldafrica.com",
      })
      .then(() => {
        this.lastFetchTime = Date.now();
        const newToken = this.getXsrfToken();
        if (!newToken) {
          throw new Error("CSRF token not set after refresh");
        }
      })
      .finally(() => {
        this.tokenPromise = null;
      });

    return this.tokenPromise;
  }
}

export default function useAxios() {
  const config = useRuntimeConfig();
  const url = config.public.API_URL;
  const loading = ref<boolean>(false);
  const csrfManager = CsrfTokenManager.getInstance();
  const BASE_URL = config.public.PUBLIC_URL;

  const api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      "X-Build-Token": process.env.BUILD_TOKEN || "",
      Accept: "application/json",
    },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
  });

  // Request interceptor
  api.interceptors.request.use(
    async (config) => {
      loading.value = true;

      if (
        ["post", "put", "patch", "delete"].includes(
          config.method?.toLowerCase() || ""
        )
      ) {
        try {
          await csrfManager.refreshToken(api);
          const token = Cookies.get("XSRF-TOKEN");
          if (token) {
            config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
          }
        } catch (error) {
          console.error("Failed to refresh CSRF token:", error);
          throw error;
        }
      }

      return config;
    },
    (error) => {
      loading.value = false;
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      loading.value = false;
      return response;
    },
    async (error) => {
      loading.value = false;

      // If we get a 419 (CSRF token mismatch), try to refresh and retry the request
      if (error.response?.status === 419) {
        try {
          await csrfManager.refreshToken(api);
          // Retry the original request
          return api(error.config);
        } catch (retryError) {
          return Promise.reject(retryError);
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    api,
    refreshCsrf: () => csrfManager.refreshToken(api),
    loading,
    API_URL: url,
    BASE_URL,
  };
}
