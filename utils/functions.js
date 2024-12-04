import showToast from "./notification";

export function getProductLink(id, name, model_number, main_second_parent_cat) {
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

export function addToCart(product) {
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

export function removeFromCart(index) {
  const store = useCartStore();
  store.removeFromCart(index);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-KE").format(price);
}

export function calculateDiscount(original, discounted) {
  return Math.round(((original - discounted) / original) * 100);
}

export function capitalizeMainWords(str) {
  const excludeWords = ["and", "the", "of", "in", "on", "at", "to", "a", "an"];
  return str
    .split(" ")
    .map((word) => {
      if (excludeWords.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
