import showToast from "./notification";
import { ref, computed } from "vue";
import { APP_SEGMENTS } from "./api";
import axios from "axios";

export const stripHtml = (html: string) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').substring(0, 160)
}

export function getSegment(slug: string | string[]) {
  if (typeof slug == 'string' && slug.includes('/')) {
    slug = slug.split('/')[0];
  }
  slug = Array.isArray(slug) ? slug[0] : slug;
  return APP_SEGMENTS.find((item) =>
    [item.slug, ...(item.slugs || [])].includes(
      slug
    )
  );
}

export const getSolutionLink = (id: number, name: string, segment: any) => {
  const transformedName = name
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/${segment.slug}/solutions/${id}/${transformedName}`;
};

export const transformName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[\s/]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/^-+|-+$/g, '');
}

export function getProductLink(product: any = {}): string {
  if (!product) return `/${APP_SEGMENTS[0].slug}`;

  const { id, name, model_number, categories_json: categories } = product;

  const firstPart = getSegment(categories?.[0]?.parent_name_with_slashes?.split("/")[0])?.slug;

  // Replace spaces with dashes
  const transformedName = transformName(name);
  const transformedModelNumber = transformName(model_number);

  return firstPart
    ? `/${firstPart}/product/${id}/${transformedName}-${transformedModelNumber}`
    : `/product/${id}/${transformedName}-${transformedModelNumber}`;
}

const isAdding = ref(false);
const url = process.env.API_URL;

export const addToCartText = computed(() => {
  return isAdding.value ? "Adding..." : "Add to Cart";
});

export function addToCart(product: any) {
  if (isAdding.value) return;
  isAdding.value = true;
  const store = useCartStore();
  try {
    store.addToCart(product);
    showToast("Item added to cart", "success");
  } catch (error) {
    console.error(error);
    showToast("An error occurred. Please try again", "error");
  } finally {
    isAdding.value = false;
  }
}

export const getCategoryLink = (
  id: number,
  name: string,
  page?: string,
  segment?: any
): string => {
  if (!segment || !segment.slug) {
    const route = useRoute();
    segment = getSegment(route.params.segment);
  }

  const transformedName = transformName(name);

  if (page) {
    return segment
      ? `/${segment.slug}/${id}/${transformedName}/page/${page}`
      : `/product/${id}/${transformedName}/page/${page}`;
  }

  return segment
    ? `/${segment.slug}/${id}/${transformedName}`
    : `/product/${id}/${transformedName}`;
};



export function removeFromCart(index: number) {
  const store = useCartStore();
  store.removeFromCart(index);
}

export function formatPrice(price: string | number) {
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  return new Intl.NumberFormat("en-KE").format(price);
}

export function calculateDiscount(original: number, discounted: number) {
  return Math.round(((original - discounted) / original) * 100);
}

export function capitalizeMainWords(str: string) {
  const excludeWords = ["and", "the", "of", "in", "on", "at", "to", "a", "an"];
  return str
    .split(" ")
    .map((word) => {
      if (excludeWords.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Function to generate solution routes
export async function generateSolutionRoutes() {
  const routes: string[] = [];
  console.log("🚀 Starting Solution Routes Generation");
  console.log(`Base URL: ${url}`);
  console.log(`Total Segments to Process: ${APP_SEGMENTS.length}`);

  for (const [index, segment] of APP_SEGMENTS.entries()) {
    console.log(
      `\n🔍 Processing Segment ${index + 1}/${APP_SEGMENTS.length}: ${segment.name
      }`
    );

    try {
      console.log(`Fetching solutions for segment: ${segment.id}`);
      const response = await axios.get(`/api/get-solutions/${segment.id}`, {
        baseURL: url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
        withXSRFToken: true,
      });

      const data = response.data.data;
      console.log(`Received ${data.length} solutions for ${segment.name}`);

      const solutionRoutes = data.map((solution: any) => {
        const transformedName = solution.name
          .toLowerCase()
          .replace(/[\s/]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const route = `/${segment.slug}/solutions/${solution.id}/${transformedName}`;
        console.log(`Generated Route: ${route}`);
        return route;
      });

      routes.push(...solutionRoutes);
      console.log(`✅ Successfully processed ${segment.name}`);
    } catch (error) {
      console.error(`❌ Error fetching solutions for ${segment.name}:`, error);
      console.warn(`Continuing to next segment despite error...`);
    }
  }

  console.log(`\n🏁 Solution Routes Generation Complete`);
  console.log(`Total Routes Generated: ${routes.length}`);
  return routes;
}

// Function to generate category routes
export async function generateCategoryRoutes() {
  const routes: string[] = [];
  console.log("🚀 Starting Category Routes Generation");
  console.log(`Base URL: ${url}`);
  console.log(`Total Segments to Process: ${APP_SEGMENTS.length}`);

  for (const [index, segment] of APP_SEGMENTS.entries()) {
    console.log(
      `\n🔍 Processing Segment ${index + 1}/${APP_SEGMENTS.length}: ${segment.name
      }`
    );

    try {
      console.log(`Fetching categories for segment: ${segment.id}`);
      const response = await axios.get(
        `/api/get-main-categories/${segment.id}`,
        {
          baseURL: url,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );

      const data = response.data.data;
      console.log(`Received ${data.length} categories for ${segment.name}`);

      const categoryRoutes = data.map((category: any) => {
        let transformedName = category.name
          .replace(/ /g, "-")
          .replace(/\//g, "-")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase();

        const route = `/${segment.slug}/${category.id}/${transformedName}`;
        console.log(`Generated Route: ${route}`);
        return route;
      });

      routes.push(...categoryRoutes);
      console.log(`✅ Successfully processed ${segment.name}`);
    } catch (error) {
      console.error(`❌ Error fetching categories for ${segment.name}:`, error);
      console.warn(`Continuing to next segment despite error...`);
    }
  }

  console.log(`\n🏁 Category Routes Generation Complete`);
  console.log(`Total Routes Generated: ${routes.length}`);
  return routes;
}
