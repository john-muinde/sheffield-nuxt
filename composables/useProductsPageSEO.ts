import type { SegmentInterface } from "~/types/meta-tags";

export const useProductsPageSEO = (
  pageData: any,
  segment: SegmentInterface
) => {
  const route = useRoute();
  const {
    generateSeoMeta,
    generateHeadInput,
    generateContentMetaTags,
    config,
  } = useMetaGenerator();

  // Generate dynamic meta description based on filters
  const getMetaDescription = () => {
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

  // Generate meta tags
  const metaTags = computed(() =>
    generateContentMetaTags({
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
    })
  );

  // Generate product list schema
  const productListSchema = computed(() => ({
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
  }));

  // Generate breadcrumb schema
  const breadcrumbSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": config.url + route.fullPath,
          name: pageData.value?.theCategory?.name,
        },
      },
    ],
  }));

  // Generate filter schema
  const filterSchema = computed(() => ({
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
  }));

  return {
    metaTags,
    productListSchema,
    breadcrumbSchema,
    filterSchema,
  };
};
