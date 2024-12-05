import axios from "axios";

export default function useAxios() {
  const rtConfig = useRuntimeConfig();
  const url = rtConfig.public.API_URL || "https://sheffieldafrica.com";

  let api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  const loading = ref(null);

  api.interceptors.request.use(
    function (config) {
      loading.value = true;
      return config;
    },
    function (error) {
      loading.value = false;
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      loading.value = false;
      return response;
    },
    function (error) {
      loading.value = false;
      return Promise.reject(error);
    }
  );

  async function csrf() {
    return await api.get("/sanctum/csrf-cookie");
  }

  return {
    api,
    csrf,
    loading,
    API_URL: url,
  };
}
