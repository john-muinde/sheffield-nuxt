import { ref, computed } from 'vue';
import { s as storages, A as APP_SEGMENTS, f as useRoute } from './server.mjs';
import { defineStore } from 'pinia';

const useCartStore = defineStore("cart-store", {
  state: () => ({
    stateCartItems: []
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.stateCartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        product.quantity = 1;
        this.stateCartItems.push(product);
      }
    },
    removeFromCart(index) {
      this.stateCartItems.splice(index, 1);
    },
    clearCart() {
      this.stateCartItems = [];
    }
  },
  getters: {
    cartItems: (state) => state.stateCartItems,
    total: (state) => state.stateCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  },
  persist: {
    storage: storages.sessionStorage()
  }
});
function getSegment(slug) {
  if (typeof slug == "string" && slug.includes("/")) {
    slug = slug.split("/")[0];
  }
  slug = Array.isArray(slug) ? slug[0] : slug;
  return APP_SEGMENTS.find(
    (item) => [item.slug, ...item.slugs || []].includes(
      slug
    )
  );
}
const getSolutionLink = (id, name, segment) => {
  const transformedName = name.toLowerCase().replace(/[\s/]+/g, "-").replace(/^-+|-+$/g, "");
  return `/${segment.slug}/solutions/${id}/${transformedName}`;
};
const transformName = (name) => {
  return name.toLowerCase().replace(/[\s/]+/g, "-").replace(/[^\w-]+/g, "").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
};
function getProductLink(product = {}) {
  var _a, _b, _c;
  if (!product) return `/${APP_SEGMENTS[0].slug}`;
  const { id, name, model_number, categories_json: categories } = product;
  const firstPart = (_c = getSegment((_b = (_a = categories == null ? void 0 : categories[0]) == null ? void 0 : _a.parent_name_with_slashes) == null ? void 0 : _b.split("/")[0])) == null ? void 0 : _c.slug;
  const transformedName = transformName(name);
  const transformedModelNumber = transformName(model_number);
  return firstPart ? `/${firstPart}/product/${id}/${transformedName}-${transformedModelNumber}` : `/product/${id}/${transformedName}-${transformedModelNumber}`;
}
const isAdding = ref(false);
process.env.API_URL;
const addToCartText = computed(() => {
  return isAdding.value ? "Adding..." : "Add to Cart";
});
const getCategoryLink = (id, name, page, segment) => {
  if (!segment || !segment.slug) {
    const route = useRoute();
    segment = getSegment(route.params.segment);
  }
  const transformedName = transformName(name);
  if (page) {
    return segment ? `/${segment.slug}/${id}/${transformedName}/page/${page}` : `/product/${id}/${transformedName}/page/${page}`;
  }
  return segment ? `/${segment.slug}/${id}/${transformedName}` : `/product/${id}/${transformedName}`;
};
function formatPrice(price) {
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  return new Intl.NumberFormat("en-KE").format(price);
}
function calculateDiscount(original, discounted) {
  return Math.round((original - discounted) / original * 100);
}
function capitalizeMainWords(str) {
  const excludeWords = ["and", "the", "of", "in", "on", "at", "to", "a", "an"];
  return str.split(" ").map((word) => {
    if (excludeWords.includes(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

export { getSolutionLink as a, getCategoryLink as b, capitalizeMainWords as c, getProductLink as d, calculateDiscount as e, formatPrice as f, getSegment as g, addToCartText as h, useCartStore as u };
//# sourceMappingURL=functions-D-pjxz_N.mjs.map
