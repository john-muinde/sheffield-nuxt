// Extended interfaces for richer type definitions
interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": string;
    name: string;
  };
  category: string;
  review?: {
    "@type": string;
    reviewRating: {
      "@type": string;
      ratingValue: number;
      bestRating: string;
    };
    author: {
      "@type": string;
      name: string;
    };
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    reviewCount: number;
  };
  offers: {
    "@type": string;
    priceCurrency: string;
    price: number;
    priceValidUntil: string;
    availability: string;
    url: string;
    sku: string;
    shippingDetails?: any; // Detailed shipping type can be more specific
    hasMerchantReturnPolicy?: any; // Detailed return policy type can be more specific
  };
}

interface ProductListSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  numberOfItems: number;
  itemListElement: Array<{
    "@type": string;
    position: number;
    item: {
      "@type": string;
      name: string;
      image: string;
      url: string;
      brand: {
        "@type": string;
        name: string;
      };
      category: string;
      description: string;
      manufacturer: {
        "@type": string;
        name: string;
        "@id": string;
      };
      offers: {
        "@type": string;
        availability: string;
        seller: {
          "@type": string;
          name: string;
          "@id": string;
        };
      };
    };
  }>;
}

interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    item: {
      "@id": string;
      name: string;
    };
  }>;
}

interface FilterSchema {
  "@context": string;
  "@type": string;
  name: string;
  itemListElement: Array<{
    "@type": string;
    name: string;
    filterOptions: Array<{
      "@type": string;
      name: string;
      value: number | string;
    }>;
  }>;
}

export type {
  ProductSchema,
  ProductListSchema,
  BreadcrumbSchema,
  FilterSchema,
};
