export function assets(path) {
  if (!path) return null;

  const { API_URL } = useAxios();

  // Custom encode function to preserve slashes
  const encodePath = (path) => {
    return path.split("/").map(encodeURIComponent).join("/");
  };

  path = encodePath(path);
  return `${API_URL}/storage/${path}`;
}
