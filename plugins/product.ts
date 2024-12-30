// plugins/product.ts
export default defineNuxtPlugin((nuxtApp) => {
  const productCache = useState("productCache", () => new Map());
  const isLoading = useState("isLoading", () => false);

  return {
    provide: {
      product: {
        async getProduct(id: string, force = false) {
          // Check cache first unless forced refresh
          if (!force && productCache.value.has(id)) {
            return productCache.value.get(id);
          }

          const { api } = useAxios();
          isLoading.value = true;
          try {
            const response = await api.get("/api/get-product", {
              params: { product_id: id },
            });
            const product = response.data.data;

            // Cache the result
            productCache.value.set(id, product);
            return product;
          } catch (error) {
            console.error("Error fetching product:", error);
            return null;
          } finally {
            isLoading.value = false;
          }
        },

        getCachedProduct(id: string) {
          return productCache.value.get(id);
        },

        isLoading() {
          return isLoading.value;
        },
      },
    },
  };
});
