function assets(path) {
  if (!path) return null;
  let API_URL = "https://sheffieldafrica.com";
  const encodePath = (path2) => {
    return path2.split("/").map(encodeURIComponent).join("/");
  };
  path = encodePath(path);
  return `${API_URL}/storage/${path}`;
}

export { assets as a };
//# sourceMappingURL=file-Dd0R4TFQ.mjs.map
