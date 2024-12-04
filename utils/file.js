export function assets(path) {
  if (!path) return null;

  const { API_URL } = useAxios();
  return `${API_URL}/${path}`;
}
