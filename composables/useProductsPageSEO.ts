import type { SegmentInterface } from "~/types/meta-tags";

export const useProductsPageSEO = (
  pageData: any,
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

  // Generate dynamic meta description based on content type
  const getMetaDescription = () => {
    if (isSingleProduct) {
      return (
        pageData.value?.description
          ?.replace(/<[^>]*>/g, "")
          .substring(0, 160) ||
        `${
          pageData.value?.name
        } - Professional ${segment?.name.toLowerCase()} solution by Sheffield Steel Systems`
      );
    }

    const brandNames = pageData.value?.brands
      ?.map((b: any) => b.product_brand?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");

    const categoryName = pageData.value?.theCategory?.name;
    const segmentName = segment?.name;

    return `Explore our selection of ${categoryName} products in the ${segmentName} category. 
            Browse top brands like ${brandNames} and more. 
            Professional ${segmentName.toLowerCase()} solutions by Sheffield Steel Systems in East Africa.`;
  };

  // Generate meta tags based on content type
  const metaTags = computed(() => {
    if (isSingleProduct) {
      return generateContentMetaTags({
        type: "product",
        content: {
          name: pageData.value?.name,
          description: getMetaDescription(),
          keywords: `${segment?.keywords}, 
                    ${pageData.value?.categories_json
                      ?.map((cat: any) => cat.name)
                      .join(", ")},
                    ${pageData.value?.name},
                    ${pageData.value?.brand_name || "Sheffield Steel Systems"}`,
          main_image_path: pageData.value?.main_image_path,
          created_at: pageData.value?.created_at,
          updated_at: pageData.value?.updated_at,
        },
      });
    }

    if (
      !Array.isArray(pageData.value?.products) ||
      !pageData.value?.products.length
    ) {
      return generateContentMetaTags({
        type: "product",
        content: {
          name: pageData.value?.theCategory?.name,
          description: "No products found in this category",
          keywords: segment?.keywords,
          main_image_path: config.defaultImage,
        },
      });
    }

    return generateContentMetaTags({
      type: "productList",
      content: {
        name: `${pageData.value?.theCategory?.name} - ${segment?.name} Products`,
        description: getMetaDescription(),
        keywords: `${segment?.keywords}, 
                  ${pageData.value?.theCategory?.name}, 
                  ${pageData.value?.brands
                    ?.map((b: any) => b.product_brand?.name)
                    .join(", ")},
                  ${pageData.value?.products
                    ?.map((p: any) => p.name)
                    .join(", ")}`,
        main_image_path: pageData.value?.products?.[0]?.main_image_path,
      },
    });
  });

  // Generate single product schema
  const productSchema = computed(() => {
    if (!isSingleProduct) return null;

    const product = pageData.value;
    if (!product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description:
        product.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
      image:
        product.product_images?.map((img: any) => assetsSync(img.name)) || [],
      brand: {
        "@type": "Brand",
        name: product.brand_name || "Sheffield Steel Systems",
      },
      category: product.categories_json?.[0]?.name || "Uncategorized",
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.review_rating || 4.9,
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: product.review_author || "Sheffield Steel Systems",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.review_rating || 4.9,
        reviewCount: product.review_count || 100,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "KES",
        price: product.cost_price || 1,
        priceValidUntil: product.price_valid_until || "2024-11-20",
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
            value: product.shipping_cost || 0,
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
              minValue: product.min_delivery_time || 1,
              maxValue: product.max_delivery_time || 7,
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

  // Generate product list schema (only for product listings)
  const productListSchema = computed(() => {
    if (isSingleProduct) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${pageData.value?.theCategory?.name} Products by Sheffield Steel Systems`,
      description: getMetaDescription(),
      numberOfItems: pageData.value?.total || 0,
      itemListElement:
        pageData.value?.products?.map((product: any, index: number) => ({
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
            category: pageData.value?.theCategory?.name,
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

  // Generate breadcrumb schema
  const breadcrumbSchema = computed(() => {
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

    if (isSingleProduct) {
      // Add category
      if (pageData.value?.categories_json?.[0]) {
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
          name: pageData.value?.name,
        },
      });
    } else {
      // Add category for listing page
      breadcrumbs.push({
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": config.url + route.fullPath,
          name: pageData.value?.theCategory?.name,
        },
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  });

  return {
    metaTags,
    productSchema,
    productListSchema,
    breadcrumbSchema,
    filterSchema: !isSingleProduct
      ? computed(() => ({
          "@context": "https://schema.org",
          "@type": "FilterList",
          name: `Filters for ${pageData.value?.theCategory?.name}`,
          itemListElement: [
            {
              "@type": "FilterSection",
              name: "Categories",
              filterOptions: pageData.value?.categories?.map((cat: any) => ({
                "@type": "FilterOption",
                name: cat.name,
                value: cat.id,
              })),
            },
            {
              "@type": "FilterSection",
              name: "Brands",
              filterOptions: pageData.value?.brands?.map((brand: any) => ({
                "@type": "FilterOption",
                name: brand.product_brand?.name,
                value: brand.product_brand?.id,
              })),
            },
          ],
        }))
      : null,
  };
};
