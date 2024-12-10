import { a as assets } from './file-Dd0R4TFQ.mjs';
import { d as getProductLink } from './functions-D-pjxz_N.mjs';

const useSchemas = (options = { baseUrl: "" }) => {
  const createProductSchema = (product) => {
    var _a, _b, _c, _d;
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: ((_a = product.description) == null ? void 0 : _a.replace(/<[^>]*>/g, "").substring(0, 160)) || "",
      image: ((_b = product.product_images) == null ? void 0 : _b.map((img) => assets(img.name))) || [],
      brand: {
        "@type": "Brand",
        name: product.brand_name || "Sheffield Steel Systems"
      },
      category: ((_d = (_c = product.categories_json) == null ? void 0 : _c[0]) == null ? void 0 : _d.name) || "Uncategorized",
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.review_rating || 4.9,
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: product.review_author || "Sheffield Steel Systems"
        }
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.review_rating || 4.9,
        reviewCount: product.review_count || 100
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
            addressCountry: "KE"
          },
          shippingRate: {
            "@type": "MonetaryAmount",
            value: product.shipping_cost || 0,
            currency: "KES"
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY"
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: product.min_delivery_time || 1,
              maxValue: product.max_delivery_time || 7,
              unitCode: "DAY"
            }
          }
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "KE",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 60,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn"
        }
      }
    };
  };
  const createOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sheffield Steel Systems Limited",
      "alternateName": [
        "Sheffield Africa",
        "Sheffield Commercial Kitchens",
        "Sheffield Coldrooms",
        "Sheffield Steel Fabrication",
        "Sheffield Kitchen Solutions",
        "Sheffield Industrial Equipment"
      ],
      "description": "East Africa's premier commercial kitchen equipment manufacturer, coldroom specialist, and stainless steel fabricator, serving major brands across hospitality, healthcare, education, and retail sectors since 2003.",
      "foundingDate": "2003",
      "areaServed": [
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "-1.3553028",
            "longitude": "36.9004438"
          },
          "geoRadius": "3000",
          "description": "East Africa Region"
        }
      ],
      "serviceArea": [
        "Kenya",
        "Uganda",
        "Tanzania",
        "Rwanda",
        "Burundi",
        "South Sudan",
        "Ethiopia",
        "Somalia",
        "Democratic Republic of Congo"
      ],
      "knowsAbout": [
        "Commercial Kitchen Equipment Manufacturing",
        "Industrial Refrigeration Systems",
        "Stainless Steel Fabrication",
        "Commercial Laundry Solutions",
        "Coldroom Installation",
        "Custom Metalwork",
        "Kitchen Consultancy",
        "Project Management",
        "Maintenance Services",
        "Commercial Kitchen",
        "Laundry Equipment",
        "Cold Storage Systems",
        "Industrial Kitchen Design",
        "Commercial Kitchen Maintenance",
        "Kitchen Project Management",
        "Food Service Equipment",
        "HACCP Compliance",
        "Energy Efficient Solutions",
        "Sustainable Kitchen Design"
      ],
      "slogan": "Transforming Ideas into Sustainable Realities",
      "expertise": [
        "Commercial Kitchen Design",
        "Coldroom Installation",
        "Stainless Steel Fabrication",
        "Industrial Laundry Systems",
        "Kitchen Maintenance",
        "Project Consultancy"
      ],
      "brand": {
        "@type": "Brand",
        "name": "Sheffield Steel Systems",
        "slogan": "Excellence in Commercial Solutions",
        "description": "Leading provider of commercial kitchen and refrigeration solutions in East Africa"
      },
      "award": [
        "ISO 9001:2015 Certified",
        "Leading Commercial Kitchen Equipment Provider in East Africa",
        "Top Coldroom Installation Specialist",
        "Premier Stainless Steel Fabricator"
      ],
      "memberOf": [
        "Kenya Association of Manufacturers",
        "Kenya Private Sector Alliance",
        "East African Business Council",
        "Kenya Chamber of Commerce"
      ],
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.8",
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "Industry Standards Review"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5"
      }
    };
  };
  const createVideoSchema = (video) => {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.name,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      embedUrl: video.embedUrl,
      uploadDate: video.uploadDate,
      contentUrl: video.contentUrl,
      duration: video.duration
    };
  };
  const createBlogListingSchema = (articles) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: article.name,
          description: article.description
        }
      }))
    };
  };
  const createFAQSchema = (faqs) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  };
  const createServiceAreasSchema = (cities) => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Commercial Kitchen Solutions",
      provider: {
        "@type": "Organization",
        name: "Sheffield Steel Systems Limited"
      },
      areaServed: cities.map((city) => ({
        "@type": "City",
        name: city
      }))
    };
  };
  return {
    createProductSchema,
    createOrganizationSchema,
    createVideoSchema,
    createBlogListingSchema,
    createFAQSchema,
    createServiceAreasSchema
  };
};

export { useSchemas as u };
//# sourceMappingURL=useSchemas-DrxAXi_A.mjs.map
