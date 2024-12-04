export function assets(path) {
  if (!path) return null;

  const { API_URL } = useAxios();
  // sanitize the path
  path = path.replace(/^\/+/, "").replace(" ", "%20");
  return `${API_URL}/storage/${path}`;
}
