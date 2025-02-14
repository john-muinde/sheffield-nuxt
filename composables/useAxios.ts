import axios from "axios";
import { ref } from "vue";

export default function useAxios() {
  const config = useRuntimeConfig();
  const loading = ref<boolean>(false);
  const API_URL = config.public.API_URL;
  const BASE_URL = process.env.PUBLIC_URL;

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

  // Request interceptor
  api.interceptors.request.use(
    async (config) => {
      loading.value = true;
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
      return Promise.reject(error);
    }
  );

  return {
    api,
    API_URL,
    BASE_URL,
    loading,
  };
}
