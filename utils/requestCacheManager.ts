// requestCacheManager.ts
import { type AxiosInstance } from "axios";

// Extend axios config type to include our custom properties
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    cached?: boolean;
    cache?: boolean | CacheConfig;
    skipCache?: boolean; // New property to explicitly skip cache
  }
}

interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
  url: string; // Store URL for LRU tracking
}

interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries in cache
  invalidateOnMutation?: boolean; // Whether to invalidate cache on POST/PUT/DELETE
}

class RequestCacheManager {
  private static instance: RequestCacheManager;
  private cache: Map<string, CacheEntry> = new Map();
  private lruList: string[] = []; // Track LRU order
  private defaultConfig: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes default TTL
    maxSize: 10, // Default to 10 most recent requests
    invalidateOnMutation: true,
  };
  private urlPatterns: Map<string, CacheConfig> = new Map();

  private constructor() {}

  static getInstance(): RequestCacheManager {
    if (!RequestCacheManager.instance) {
      RequestCacheManager.instance = new RequestCacheManager();
    }
    return RequestCacheManager.instance;
  }

  // Add URL pattern with specific configuration
  addCachePattern(urlPattern: string, config: Partial<CacheConfig>): void {
    this.urlPatterns.set(urlPattern, {
      ...this.defaultConfig,
      ...config,
    });
  }

  // Update LRU order
  private updateLRU(url: string): void {
    this.lruList = this.lruList.filter((item) => item !== url);
    this.lruList.push(url);

    // Remove oldest entries if we exceed maxSize
    while (this.lruList.length > (this.defaultConfig.maxSize || 10)) {
      const oldestUrl = this.lruList.shift();
      if (oldestUrl) {
        this.cache.delete(oldestUrl);
      }
    }
  }

  // Check if URL matches any specific patterns
  private matchUrlPattern(url: string): CacheConfig | null {
    for (const [pattern, config] of this.urlPatterns.entries()) {
      if (new RegExp(pattern).test(url)) {
        return config;
      }
    }
    return this.defaultConfig; // Return default config instead of null
  }

  // Get cached response if valid
  getCachedResponse(url: string): any | null {
    const entry = this.cache.get(url);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(url);
      return null;
    }

    this.updateLRU(url); // Update LRU on cache hit
    return entry.data;
  }

  // Cache response with configuration
  cacheResponse(url: string, response: any, config: CacheConfig): void {
    const entry: CacheEntry = {
      data: response,
      timestamp: Date.now(),
      expiresAt: Date.now() + config.ttl,
      url,
    };

    this.cache.set(url, entry);
    this.updateLRU(url);
  }

  // Clear cache entries matching a pattern
  clearCache(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      this.lruList = [];
      return;
    }

    const regex = new RegExp(pattern);
    for (const [url] of this.cache) {
      if (regex.test(url)) {
        this.cache.delete(url);
        this.lruList = this.lruList.filter((item) => item !== url);
      }
    }
  }

  // Setup axios interceptors for automatic caching
  setupAxiosInterceptors(api: AxiosInstance): void {
    // Request interceptor
    api.interceptors.request.use(async (config) => {
      const method = config.method?.toLowerCase();
      const url = config.url;

      if (!url || config.skipCache) return config;

      // Skip cache for non-GET requests
      if (method !== "get") return config;

      // Allow explicit cache control through config
      if (config.cache === false) return config;

      // Get cache configuration
      const cacheConfig =
        config.cache && typeof config.cache === "object"
          ? { ...this.defaultConfig, ...config.cache }
          : this.matchUrlPattern(url);

      // Check cache
      const cachedResponse = this.getCachedResponse(url);
      if (cachedResponse) {
        console.log("Cache hit:", url);
        return Promise.resolve({
          ...config,
          data: cachedResponse,
          cached: true,
        });
      }

      return config;
    });

    // Response interceptor
    api.interceptors.response.use((response) => {
      const { config, data } = response;
      const method = config.method?.toLowerCase();
      const url = config.url;

      if (!url || config.skipCache) return response;

      // Cache GET responses
      if (method === "get" && !config.cached) {
        const cacheConfig =
          config.cache && typeof config.cache === "object"
            ? { ...this.defaultConfig, ...config.cache }
            : this.matchUrlPattern(url) || this.defaultConfig;

        this.cacheResponse(url, data, cacheConfig);
      }

      // Invalidate cache on mutations if configured
      if (
        ["post", "put", "delete", "patch"].includes(method || "") &&
        this.defaultConfig.invalidateOnMutation
      ) {
        this.clearCache();
      }

      return response;
    });
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      lruOrder: this.lruList,
      entries: Array.from(this.cache.entries()).map(([url, entry]) => ({
        url,
        expiresIn:
          Math.round((entry.expiresAt - Date.now()) / 1000) + " seconds",
      })),
    };
  }
}

export default RequestCacheManager;
