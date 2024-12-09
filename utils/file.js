export function assets(path) {
  if (!path) return null;

  let API_URL;

  try {
    const nuxtApp = useNuxtApp();

    const { useAxios } = nuxtApp.useAxios();
  } catch (error) {
    // Fallback URL if Nuxt instance doesn't exist
    API_URL = "https://sheffieldafrica.com";
  }

  // Custom encode function to preserve slashes
  const encodePath = (path) => {
    return path.split("/").map(encodeURIComponent).join("/");
  };

  path = encodePath(path);
  return `${API_URL}/storage/${path}`;
}
