// middleware/product.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { id } = to.params;
  const { fetchProduct, setProduct } = useProduct();
  const productId = Array.isArray(id) ? id[0] : id;
  if (!id) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  try {
    const product = await fetchProduct(productId);
    setProduct(product);

    // Generate the correct link
    const link = getProductLink(product);

    // Redirect to the correct URL if the slug is incorrect
    if (to.fullPath !== link) {
      return navigateTo(link, {
        redirectCode: 301,
      });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }
});
