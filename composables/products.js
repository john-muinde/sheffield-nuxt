import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useProducts() {
  const products = ref([]);
  const productList = ref([]);
  const product = ref({
    name: "",
    parent_id: "",
    description: "",
    is_published: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getProducts = async (
    page = 1,
    search_id = "",
    search_title = "",
    search_parent_id = "",
    search_global = "",
    order_column = "created_at",
    order_direction = "desc"
  ) => {
    try {
      const response = await apiRequest(
        "get",
        `/api/products?page=${page}&search_id=${search_id}
                &search_title=${search_title}
                &search_parent_id=${search_parent_id}
                &search_global=${search_global}
                &order_column=${order_column}
                &order_direction=${order_direction}`
      );
      products.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await apiRequest("get", `/api/products/${id}`);
      product.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeProduct = async (product, files) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();
    const categoryIds = product.categories.map((category) => category.id);

    serializedPost.append("categories", categoryIds);

    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      serializedPost.append("product_gallery[" + i + "]", file);
    }

    for (let item in product) {
      if (product.hasOwnProperty(item) && item !== "categories") {
        serializedPost.append(item, product[item]);
      }
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/products", serializedPost, config);
      router.push({ name: "products.index" });
      // Reset the form values
      product.name = null;
      product.description = null;
      product.parent_id = null;
      product.is_published = null;
      product.model_number = null;
      product.sku = null;
      product.quantity = null;
      product.cost_price = null;
      product.retail_price = null;
      product.weight = null;
      product.length = null;
      product.width = null;
      product.height = null;
      product.short_description = null;
      product.technical_specification = null;
      product.terms_of_operation = null;
      product.main_image = null;
      product.product_gallery = null;
      product.document = null;

      showToast("Product saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateProduct = async (product, files) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();
    const categoryIds = product.categories.map((category) => category.id);

    serializedPost.append("categories", categoryIds);

    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        serializedPost.append("product_gallery[" + i + "]", file);
      }
    }

    for (let item in product) {
      if (product.hasOwnProperty(item) && item !== "categories") {
        let value = product[item];
        if (
          value === null &&
          (item === "weight" ||
            item === "length" ||
            item === "height" ||
            item === "width" ||
            item === "quantity" ||
            item === "cost_price" ||
            item === "retail_price")
        ) {
          value = 0;
        }
        serializedPost.append(item, value);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    serializedPost.append("_method", "put");

    try {
      await apiRequest(
        "post",
        `/api/products/${product.id}`,
        serializedPost,
        config
      );
      router.push({ name: "products.index" });
      showToast("Product updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/products/${id}`).then(() => {
          getProducts();
          router.push({ name: "products.index" });
          showToast("Product deleted successfully", "success");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteProductImage = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/product-images/${id}`).then(() => {
          getProducts();
          router.go(0);
          showToast("Image deleted successfully", "success");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getProductList = async () => {
    try {
      const response = await apiRequest("get", "/api/product-list");
      productList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    productList,
    products,
    product,
    getProducts,
    getProductList,
    getProduct,
    storeProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
    validationErrors,
    isLoading,
  };
}
