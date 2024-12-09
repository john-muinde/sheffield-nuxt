import axios from 'axios';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { APP_SEGMENTS } from './api';

interface RouteCache {
  timestamp: number;
  routes: string[];
  ids: Set<number>;
}

interface CacheData {
  products: RouteCache;
  solutions: RouteCache;
  categories: RouteCache;
}

export class RouteGenerator {
  private readonly cacheFile: string;
  private readonly cachePath: string;
  private readonly cacheDuration: number;
  private readonly baseURL: string;
  private cache: CacheData;

  constructor(baseURL: string, cachePath = './cache', cacheDurationHours = 24) {
    this.baseURL = baseURL;
    this.cachePath = cachePath;
    this.cacheFile = path.join(cachePath, 'routes-cache.json');
    this.cacheDuration = cacheDurationHours * 60 * 60 * 1000;
    this.initializeCache();
    this.cache = {
      products: { timestamp: 0, routes: [], ids: new Set() },
      solutions: { timestamp: 0, routes: [], ids: new Set() },
      categories: { timestamp: 0, routes: [], ids: new Set() }
    };
  }

  private async initializeCache(): Promise<void> {
    try {
      await mkdir(this.cachePath, { recursive: true });
      if (!existsSync(this.cacheFile)) {
        await writeFile(this.cacheFile, JSON.stringify({
          products: { timestamp: 0, routes: [], ids: [] },
          solutions: { timestamp: 0, routes: [], ids: [] },
          categories: { timestamp: 0, routes: [], ids: [] }
        }));
      }
    } catch (error) {
      console.error('Cache initialization error:', error);
    }
  }

  private async loadCache(): Promise<boolean> {
    console.log('Loading cache...');
    if (!existsSync(this.cacheFile)) {
      console.log('Cache file not found');
      return false;
    }

    try {
      const data = JSON.parse(await readFile(this.cacheFile, 'utf-8'));
      const age = Date.now() - data.timestamp;

      if (age > this.cacheDuration) return false;

      this.cache = {
        products: { ...data.products, ids: new Set(data.products.ids) },
        solutions: { ...data.solutions, ids: new Set(data.solutions.ids) },
        categories: { ...data.categories, ids: new Set(data.categories.ids) }
      };
      return true;
    } catch (error) {
      console.error('Cache loading error:', error);
      return false;
    }
  }

  private async saveCache(): Promise<void> {
    const cacheData = {
      products: { ...this.cache.products, ids: Array.from(this.cache.products.ids) },
      solutions: { ...this.cache.solutions, ids: Array.from(this.cache.solutions.ids) },
      categories: { ...this.cache.categories, ids: Array.from(this.cache.categories.ids) }
    };

    try {
      await writeFile(this.cacheFile, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache saving error:', error);
    }
  }

  private transformName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[\s/]+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/^-+|-+$/g, '');
  }

  private async getProductsForSolution(solutionId: number, segment: any): Promise<string[]> {
    const routes: string[] = [];
    try {
      const response = await axios.get('/api/get-solution-category-products', {
        params: { solution_id: solutionId },
        baseURL: this.baseURL,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        withCredentials: true,
        withXSRFToken: true
      });

      for (const product of response.data.products.data) {
        if (!this.cache.products.ids.has(product.id)) {
          routes.push(`/${segment.slug}/product/${product.id}/${this.transformName(product.name)}`);
          this.cache.products.ids.add(product.id);
        }
      }
    } catch (error) {
      console.error(`Error fetching products for solution ${solutionId}:`, error);
    }
    return routes;
  }

  private async getProductsForCategory(categoryId: number, segment: any): Promise<string[]> {
    const routes: string[] = [];
    try {
      const response = await axios.get('/api/get-products', {
        params: { category_id: categoryId },
        baseURL: this.baseURL,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        withCredentials: true,
        withXSRFToken: true
      });

      for (const product of response.data.products.data) {
        if (!this.cache.products.ids.has(product.id)) {
          routes.push(`/${segment.slug}/product/${product.id}/${this.transformName(product.name)}`);
          this.cache.products.ids.add(product.id);
        }
      }
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    }
    return routes;
  }

  async generateAllRoutes(force = false): Promise<string[]> {
    if (!force && await this.loadCache()) {
      return [...this.cache.products.routes, ...this.cache.solutions.routes, ...this.cache.categories.routes];
    }

    const allRoutes: string[] = [];

    for (const segment of APP_SEGMENTS) {
      // Generate solution routes and their products
      try {
        const solutionsResponse = await axios.get(`/api/get-solutions/${segment.id}`, {
          baseURL: this.baseURL,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          withCredentials: true,
          withXSRFToken: true
        });

        for (const solution of solutionsResponse.data.data) {
          if (!this.cache.solutions.ids.has(solution.id)) {
            const solutionRoute = `/${segment.slug}/solutions/${solution.id}/${this.transformName(solution.name)}`;
            allRoutes.push(solutionRoute);
            this.cache.solutions.ids.add(solution.id);

            // Get products for this solution
            const productRoutes = await this.getProductsForSolution(solution.id, segment);
            allRoutes.push(...productRoutes);
          }
        }
      } catch (error) {
        console.error(`Error processing solutions for segment ${segment.name}:`, error);
      }

      // Generate category routes and their products
      try {
        const categoriesResponse = await axios.get(`/api/get-main-categories/${segment.id}`, {
          baseURL: this.baseURL,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          withCredentials: true,
          withXSRFToken: true
        });

        for (const category of categoriesResponse.data.data) {
          if (!this.cache.categories.ids.has(category.id)) {
            const categoryRoute = `/${segment.slug}/${category.id}/${this.transformName(category.name)}`;
            allRoutes.push(categoryRoute);
            this.cache.categories.ids.add(category.id);

            // Get products for this category
            const productRoutes = await this.getProductsForCategory(category.id, segment);
            allRoutes.push(...productRoutes);
          }
        }
      } catch (error) {
        console.error(`Error processing categories for segment ${segment.name}:`, error);
      }
    }

    // Update cache
    this.cache.products.timestamp = Date.now();
    this.cache.products.routes = allRoutes.filter(route => route.includes('/product/'));
    this.cache.solutions.timestamp = Date.now();
    this.cache.solutions.routes = allRoutes.filter(route => route.includes('/solutions/'));
    this.cache.categories.timestamp = Date.now();
    this.cache.categories.routes = allRoutes.filter(route => !route.includes('/product/') && !route.includes('/solutions/'));

    await this.saveCache();
    return allRoutes;
  }

  async generateSitemap(baseUrl: string): Promise<void> {
    const routes = await this.generateAllRoutes();
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes.map(route => `
        <url>
          <loc>${baseUrl}${route}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`).join('')}
      </urlset>
      `;

    await writeFile('public/sitemap.xml', sitemap);
  }
}