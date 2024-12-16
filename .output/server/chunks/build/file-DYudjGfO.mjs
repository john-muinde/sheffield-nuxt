const config = {
  API_URL: "https://sheffieldafrica.com",
  BASE_URL: "https://dev.sheffieldafrica.com",
  STORAGE_PATH: "/storage/",
  DEFAULT_IMAGE: "/assets/images/logo.png",
  PLACEHOLDER_IMAGE: "/assets/images/placeholder.jpg",
  SUPPORTED_FORMATS: ["webp", "jpeg", "png", "avif"],
  MAX_IMAGE_SIZE: 5e3,
  DEFAULT_QUALITY: 80
};
function validateTransform(transform) {
  if (!transform) return "";
  const params = [];
  if (transform.width) {
    if (transform.width > config.MAX_IMAGE_SIZE) {
      console.warn(
        `Width ${transform.width} exceeds maximum allowed ${config.MAX_IMAGE_SIZE}`
      );
      transform.width = config.MAX_IMAGE_SIZE;
    }
    params.push(`w=${transform.width}`);
  }
  if (transform.height) {
    if (transform.height > config.MAX_IMAGE_SIZE) {
      console.warn(
        `Height ${transform.height} exceeds maximum allowed ${config.MAX_IMAGE_SIZE}`
      );
      transform.height = config.MAX_IMAGE_SIZE;
    }
    params.push(`h=${transform.height}`);
  }
  if (transform.fit) {
    params.push(`fit=${transform.fit}`);
  }
  if (transform.position) {
    params.push(`pos=${transform.position}`);
  }
  return params.length ? `?${params.join("&")}` : "";
}
function processImageOptions(path, options) {
  let processedPath = path;
  if (options.format && options.format !== "original") {
    if (!config.SUPPORTED_FORMATS.includes(options.format)) {
      console.warn(
        `Unsupported format ${options.format}. Using original format.`
      );
    } else {
      processedPath = processedPath.replace(/\.[^/.]+$/, `.${options.format}`);
    }
  }
  if (options.quality) {
    if (options.quality < 1 || options.quality > 100) {
      console.warn("Quality must be between 1 and 100. Using default quality.");
      options.quality = config.DEFAULT_QUALITY;
    }
  }
  return processedPath;
}
function customEncodePath(path, encode = true) {
  if (!encode) return path;
  return path.split("/").map((segment) => segment.split(",").map(encodeURIComponent).join(",")).join("/");
}
function assetsSync(path, options = {
  append: true,
  encode: true,
  local: false,
  quality: config.DEFAULT_QUALITY
}) {
  try {
    if (!path) return `${config.API_URL}${config.DEFAULT_IMAGE}`;
    if (path.startsWith("http")) return path;
    if (options.local || path.startsWith("/") && !options.append) {
      return `${config.BASE_URL}${path}`;
    }
    let processedPath = customEncodePath(path, options.encode);
    processedPath = processImageOptions(processedPath, options);
    const finalUrl = options.append ? `${config.API_URL}${config.STORAGE_PATH}${processedPath}` : `${config.API_URL}${processedPath}`;
    return finalUrl + validateTransform(options.transform);
  } catch (error) {
    console.error("Error processing asset:", error);
    return `${config.BASE_URL}${config.PLACEHOLDER_IMAGE}`;
  }
}

export { assetsSync as a };
//# sourceMappingURL=file-DYudjGfO.mjs.map
