import showToast from "./notification";
import { ref, computed } from "vue";
import { APP_SEGMENTS } from "./api";

export function getProductLink(id: number, name: string, model_number: string, main_second_parent_cat: string) {
  const firstPart = main_second_parent_cat?.split("/")[0];
  // Replace spaces with dashes
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  // Remove consecutive dashes
  transformedName = transformedName.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  // Convert to lowercase
  transformedName = transformedName.toLowerCase();

  let transformedModelNumber = model_number
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\//g, "-");
  // Remove consecutive dashes
  transformedModelNumber = transformedModelNumber.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedModelNumber = transformedModelNumber.replace(/^-+|-+$/g, "");

  return firstPart
    ? `/${firstPart}/product/${id}/${transformedName}-${transformedModelNumber}`
    : `/product/${id}/${transformedName}-${transformedModelNumber}`;
}

const isAdding = ref(false);

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

  for (const segment of APP_SEGMENTS) {
    try {
      // Simulate your API call - you'll need to replace this with actual data fetching
      const response = await fetch(
        `https://sheffieldafrica.com/api/get-solutions/${segment.id}`
      );
      const data = await response.json();

      const solutionRoutes = data.data.map((solution: any) => {
        const transformedName = solution.name
          .toLowerCase()
          .replace(/[\s/]+/g, "-")
          .replace(/^-+|-+$/g, "");

        return `/${segment.slug}/solutions/${solution.id}/${transformedName}`;
      });

      routes.push(...solutionRoutes);
    } catch (error) {
      console.error(`Error fetching solutions for ${segment.name}:`, error);
    }
  }

  return routes;
};

// Function to generate category routes
export async function generateCategoryRoutes() {
  const routes: string[] = [];

  for (const segment of APP_SEGMENTS) {
    try {
      // Simulate your API call - you'll need to replace this with actual data fetching
      const response = await fetch(
        `https://sheffieldafrica.com/api/get-main-categories/${segment.id}`
      );
      const data = await response.json();

      const categoryRoutes = data.data.map((category: any) => {
        let transformedName = category.name
          .replace(/ /g, "-")
          .replace(/\//g, "-")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase();

        return `/${segment.slug}/${category.id}/${transformedName}`;
      });

      routes.push(...categoryRoutes);
    } catch (error) {
      console.error(`Error fetching categories for ${segment.name}:`, error);
    }
  }

  return routes;
};
