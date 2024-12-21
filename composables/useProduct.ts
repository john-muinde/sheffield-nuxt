// composables/useProduct.ts
export const useProduct = () => {
  const product = useState<any | null>("currentProduct", () => null);
  const loading = useState<boolean>("productLoading", () => false);
  const error = useState<any | null>("productError", () => null);
  const { api } = useAxios();

  const fetchProduct = async (productId: string | number) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.get("/api/get-product", {
        params: { product_id: productId },
      });

      if (data.data) {
        product.value = data.data;
        return data.data;
      }
      throw new Error("Product not found");
    } catch (err: Error | any) {
      console.error("Error fetching product:", err);
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setProduct = (newProduct: any) => {
    product.value = newProduct;
  };

  return {
    product: readonly(product),
    loading: readonly(loading),
    error: readonly(error),
    fetchProduct,
    setProduct,
  };
};
