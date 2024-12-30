// middleware/product.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { $product } = useNuxtApp() as unknown as {
    $product: {
      getProduct: (id: string) => Promise<any>;
    };
  };

  const { id } = to.params;

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  try {
    const productId = Array.isArray(id) ? id[0] : id;
    const product = await $product.getProduct(productId);

    // Handle missing product
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Product Not Found",
      });
    }

    const correctLink = getProductLink(product);

    if (to.fullPath !== correctLink) {
      return navigateTo(correctLink, {
        redirectCode: 301,
        replace: true,
      });
    }
  } catch (error) {
    console.error("Error in product middleware:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }
});
