import axios from "axios";

export default function useAxios() {
  const rtConfig = useRuntimeConfig();
  const url = rtConfig.public.API_URL || "https://sheffieldafrica.com";

  let api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  async function csrf() {
    return await api.get("/sanctum/csrf-cookie");
  }

  return {
    api,
    csrf,
    API_URL: url,
  };
}
