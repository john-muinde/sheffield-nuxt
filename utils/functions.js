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

  return `/${firstPart}/product/${id}/${transformedName}-${transformedModelNumber}`;
}

export const addToCartText = computed(() => {
  return isAdding.value ? "Adding..." : "Add to Cart";
});

export function addToCart(product) {
  if (isAdding.value) return;
  isAdding.value = true;
  try {
    const toast = window.Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 4000,
      padding: "2em",
    });
    $store.dispatch("cart/addToCart", product);
    toast.fire({
      icon: "success",
      title: "Item added to cart",
      padding: "2em",
      customClass: {
        title: "swal-title-class",
      },
    });
  } catch (error) {
    console.error(error);
    toast.fire({
      icon: "error",
      title: "Failed to add item to cart",
      padding: "2em",
      customClass: {
        title: "swal-title-class",
      },
    });
  } finally {
    isAdding.value = false;
  }
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-KE").format(price);
}

export function calculateDiscount(original, discounted) {
  return Math.round(((original - discounted) / original) * 100);
}

export function removeFromCart(index) {
  $store.dispatch("cart/removeFromCart", index);
}
