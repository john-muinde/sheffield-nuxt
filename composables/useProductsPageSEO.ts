import type { Product, ProductsResponse } from "~/types/ecommerce";
import type { SegmentInterface } from "~/types/meta-tags";
import type {
  ProductSchema,
  ProductListSchema,
  BreadcrumbSchema,
  FilterSchema,
} from "~/types/schemas";

// Type guard to check if the data is a ProductsResponse
function isProductsResponse(data: any): data is ProductsResponse {
  return (
    data &&
    Array.isArray(data.products?.data) &&
    typeof data.the_category === "object"
  );
}

// Type guard to check if the data is a Product
function isProduct(data: any): data is Product {
  return data && typeof data.id === "number" && typeof data.name === "string";
}

export const useProductsPageSEO = (
  pageData: Ref<ProductsResponse | Product | null>,
  segment: SegmentInterface,
  isSingleProduct: boolean = false
) => {
  const route = useRoute();
  const {
    generateSeoMeta,
    generateHeadInput,
    generateContentMetaTags,
    config,
  } = useMetaGenerator();

  // Safely get meta description
  const getMetaDescription = (): string => {
    if (isSingleProduct && isProduct(pageData.value)) {
      return (
        pageData.value.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
        `${
          pageData.value.name
        } - Professional ${segment?.name.toLowerCase()} solution by Sheffield Steel Systems`
      );
    }

    if (!isProductsResponse(pageData.value)) {
      return "No products available";
    }

    const brandNames = pageData.value.brands
      ?.map((b) => b.product_brand?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");

    const categoryName = pageData.value.the_category?.name;
    const segmentName = segment?.name;

    return `Explore our selection of ${categoryName} products in the ${segmentName} category. 
            Browse top brands like ${brandNames} and more. 
            Professional ${segmentName.toLowerCase()} solutions by Sheffield Steel Systems in East Africa.`;
  };

  // Generate meta tags with improved type safety
  const metaTags = computed(() => {
    // Single product meta tags
    if (isSingleProduct && isProduct(pageData.value)) {
      return generateContentMetaTags({
        type: "product",
        content: {
          name: pageData.value.name,
          description: getMetaDescription(),
          keywords: `${segment?.keywords}, 
                    ${pageData.value.categories_json
                      ?.map((cat) => cat.name)
                      .join(", ")},
                    ${pageData.value.name},
                    ${pageData.value.brand_name || "Sheffield Steel Systems"}`,
          main_image_path: pageData.value.main_image_path,
          created_at: pageData.value.created_at,
          updated_at: pageData.value.updated_at,
        },
      });
    }

    // Product list meta tags
    if (!isProductsResponse(pageData.value)) {
      return generateContentMetaTags({
        type: "product",
        content: {
          name: "No Products",
          description: "No products found in this category",
          keywords: segment?.keywords,
          main_image_path: config.defaultImage,
        },
      });
    }

    // Ensure products array exists and has length
    if (!pageData.value.products?.data?.length) {
      return generateContentMetaTags({
        type: "product",
        content: {
          name: "No Products",
          description: "No products found in this category",
          keywords: segment?.keywords,
          main_image_path: config.defaultImage,
        },
      });
    }

    return generateContentMetaTags({
      type: "productList",
      content: {
        name: `${pageData.value.the_category?.name} - ${segment?.name} Products`,
        description: getMetaDescription(),
        keywords: `${segment?.keywords}, 
                  ${pageData.value.the_category?.name}, 
                  ${pageData.value.brands
                    ?.map((b) => b.product_brand?.name)
                    .join(", ")},
                  ${pageData.value.products.data
                    ?.map((p) => p.name)
                    .join(", ")}`,
        main_image_path: pageData.value.products.data?.[0]?.main_image_path,
      },
    });
  });

  // Product Schema with type safety
  const productSchema = computed<ProductSchema | null>(() => {
    if (!isSingleProduct || !isProduct(pageData.value)) return null;

    const product = pageData.value;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description:
        product.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
      image: product.product_images?.map((img) => assetsSync(img.name)) || [],
      brand: {
        "@type": "Brand",
        name: product.brand_name || "Sheffield Steel Systems",
      },
      category: product.categories_json?.[0]?.name || "Uncategorized",
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: (product as Product).review_rating || 4.9,
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: (product as Product).review_author || "Sheffield Steel Systems",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (product as Product).review_rating || 4.9,
        reviewCount: (product as Product).review_count || 100,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "KES",
        price: parseFloat(product.cost_price || "1"),
        priceValidUntil: (product as Product).price_valid_until || "2024-11-20",
        availability: "https://schema.org/InStock",
        url: getProductLink(product),
        sku: product.sku || `SSS${product.id}`,
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "KE",
          },
          shippingRate: {
            "@type": "MonetaryAmount",
            value: (product as Product).shipping_cost || 0,
            currency: "KES",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: (product as Product).min_delivery_time || 1,
              maxValue: (product as Product).max_delivery_time || 7,
              unitCode: "DAY",
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "KE",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 60,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
    };
  });

  // Product List Schema with improved type safety
  const productListSchema = computed<ProductListSchema | null>(() => {
    if (isSingleProduct || !isProductsResponse(pageData.value)) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${pageData.value.the_category?.name} Products by Sheffield Steel Systems`,
      description: getMetaDescription(),
      numberOfItems: pageData.value.products.total || 0,
      itemListElement:
        pageData.value.products.data?.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: assetsSync(product.main_image_path),
            url: getProductLink(product),
            brand: {
              "@type": "Brand",
              name: product.product_brand?.name || "Sheffield Steel Systems",
            },
            category: (pageData.value as ProductsResponse)?.the_category?.name,
            description:
              product.description ||
              `Professional ${product.name} by Sheffield Steel Systems`,
            manufacturer: {
              "@type": "Organization",
              name: "Sheffield Steel Systems",
              "@id": "https://sheffieldafrica.com/#organization",
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Sheffield Steel Systems",
                "@id": "https://sheffieldafrica.com/#organization",
              },
            },
          },
        })) || [],
    };
  });

  // Breadcrumb Schema with type safety
  const breadcrumbSchema = computed<BreadcrumbSchema>(() => {
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": config.url,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${config.url}/${segment?.slug}`,
          name: segment?.name,
        },
      },
    ];

    if (isSingleProduct && isProduct(pageData.value)) {
      // Add category for single product
      if (pageData.value.categories_json?.[0]) {
        breadcrumbs.push({
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": `${config.url}${getCategoryLink(
              pageData.value.categories_json[0].id,
              pageData.value.categories_json[0].name,
              undefined,
              segment
            )}`,
            name: pageData.value.categories_json[0].name,
          },
        });
      }
      // Add product
      breadcrumbs.push({
        "@type": "ListItem",
        position: 4,
        item: {
          "@id": config.url + route.fullPath,
          name: pageData.value.name,
        },
      });
    } else if (isProductsResponse(pageData.value)) {
      // Add category for listing page
      breadcrumbs.push({
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": config.url + route.fullPath,
          name: pageData.value.the_category?.name,
        },
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  });

  // Filter Schema with type safety
  const filterSchema = computed<FilterSchema | null>(() => {
    if (isSingleProduct || !isProductsResponse(pageData.value)) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FilterList",
      name: `Filters for ${pageData.value.the_category?.name}`,
      itemListElement: [
        {
          "@type": "FilterSection",
          name: "Categories",
          filterOptions:
            pageData.value.categories?.map((cat) => ({
              "@type": "FilterOption",
              name: cat.name,
              value: cat.id,
            })) || [],
        },
        {
          "@type": "FilterSection",
          name: "Brands",
          filterOptions:
            pageData.value.brands?.map((brand) => ({
              "@type": "FilterOption",
              name: brand.product_brand?.name || "Unknown Brand",
              value: brand.product_brand?.id || 0,
            })) || [],
        },
      ],
    };
  });

  return {
    metaTags,
    productSchema,
    productListSchema,
    breadcrumbSchema,
    filterSchema,
  };
};
