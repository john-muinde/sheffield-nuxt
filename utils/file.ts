// Types for asset options
interface AssetOptions {
  encode?: boolean; // Whether to URL encode the path
  size?: number; // Size for responsive images
  append?: boolean; // Whether to append to storage path
  local?: boolean; // Whether to use local assets
  quality?: number; // Image quality (1-100)
  format?: "original" | "webp" | "jpeg" | "png" | "avif"; // Convert image format
  placeholder?: boolean; // Return placeholder on error
  transform?: {
    width?: number;
    height?: number;
    fit?: "contain" | "cover" | "fill" | "inside" | "outside";
    position?: "center" | "top" | "right" | "bottom" | "left";
  };
}

// Environment configuration
const config = {
  API_URL: "https://sheffieldafrica.com",
  BASE_URL: "https://dev.sheffieldafrica.com",
  STORAGE_PATH: "/storage/",
  DEFAULT_IMAGE: "/assets/images/logo.png",
  PLACEHOLDER_IMAGE: "/assets/images/placeholder.jpg",
  SUPPORTED_FORMATS: ["webp", "jpeg", "png", "avif"] as const,
  MAX_IMAGE_SIZE: 5000,
  DEFAULT_QUALITY: 80,
  DEFAULT_PRODUCT_IMAGE: {
    width: 350,
    height: 350,
    quality: 85,
    format: "webp" as const,
  },
};

/**
 * Validates and processes image transformations
 */
function validateTransform(transform?: AssetOptions["transform"]): string {
  if (!transform) return "";

  const params: string[] = [];

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

/**
 * Processes the image format and quality
 */
function processImageOptions(path: string, options: AssetOptions): string {
  let processedPath = path;

  // Handle format conversion
  if (options.format && options.format !== "original") {
    if (!config.SUPPORTED_FORMATS.includes(options.format)) {
      console.warn(
        `Unsupported format ${options.format}. Using original format.`
      );
    } else {
      processedPath = processedPath.replace(/\.[^/.]+$/, `.${options.format}`);
    }
  }

  // Handle quality
  if (options.quality) {
    if (options.quality < 1 || options.quality > 100) {
      console.warn("Quality must be between 1 and 100. Using default quality.");
      options.quality = config.DEFAULT_QUALITY;
    }
  }

  return processedPath;
}

/**
 * Custom encode function that preserves slashes and special characters
 */
function customEncodePath(path: string, encode: boolean = true): string {
  if (!encode) return path;

  return path
    .split("/")
    .map((segment) => segment.split(",").map(encodeURIComponent).join(","))
    .join("/");
}

/**
 * Checks if the asset exists (can be used with await)
 */
async function assetExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Main asset helper function
 */
export async function assets(
  path: string | undefined,
  options: AssetOptions = {
    append: true,
    encode: true,
    local: false,
    quality: config.DEFAULT_QUALITY,
  }
): Promise<string> {
  // Handle empty path
  if (!path) {
    console.warn("No path provided, returning default image");
    return `${config.API_URL}${config.DEFAULT_IMAGE}`;
  }

  // Handle absolute URLs
  if (path.startsWith("http")) {
    return path;
  }

  // Handle local assets
  if (options.local || (path.startsWith("/") && !options.append)) {
    const localPath = `${config.BASE_URL}${path}`;
    return options.placeholder && !(await assetExists(localPath))
      ? `${config.BASE_URL}${config.PLACEHOLDER_IMAGE}`
      : localPath;
  }

  // Process path
  let processedPath = path;

  // Encode path if needed
  processedPath = customEncodePath(processedPath, options.encode);

  // Process image options
  processedPath = processImageOptions(processedPath, options);

  // Build final URL
  let finalUrl = options.append
    ? `${config.API_URL}${config.STORAGE_PATH}${processedPath}`
    : `${config.API_URL}${processedPath}`;

  // Add transformations
  finalUrl += validateTransform(options.transform);

  // Handle errors
  if (options.placeholder && !(await assetExists(finalUrl))) {
    console.warn(`Asset not found: ${finalUrl}, using placeholder`);
    return `${config.BASE_URL}${config.PLACEHOLDER_IMAGE}`;
  }

  return finalUrl;
}

// Synchronous version for when async isn't needed
export function assetsSync(
  path: string | undefined,
  options: AssetOptions = {
    append: true,
    encode: true,
    local: false,
    quality: config.DEFAULT_QUALITY,
    transform: config.DEFAULT_PRODUCT_IMAGE, // Apply default product image settings
  }
): string {
  try {
    if (!path) return `${config.API_URL}${config.DEFAULT_IMAGE}`;

    if (path.startsWith("http")) return path;

    if (options.local || (path.startsWith("/") && !options.append)) {
      return `${config.BASE_URL}${path}`;
    }

    let processedPath = customEncodePath(path, options.encode);
    processedPath = processImageOptions(processedPath, options);

    const finalUrl = options.append
      ? `${config.API_URL}${config.STORAGE_PATH}${processedPath}`
      : `${config.API_URL}${processedPath}`;

    return finalUrl + validateTransform(options.transform);
  } catch (error) {
    console.error("Error processing asset:", error);
    return `${config.BASE_URL}${config.PLACEHOLDER_IMAGE}`;
  }
}
