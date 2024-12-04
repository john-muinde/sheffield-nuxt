<!-- Enhanced Organization Schema -->
<script type="application/ld+json">
{
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Commercial Solutions Catalog",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Commercial Products",
        "itemListElement": [
          @foreach($productsForSchema as $product)
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": {!! json_encode($product->name) !!},
              "description": {!! json_encode(Str::limit($product->description ?? 'Product description not available', 160)) !!},
              "image": [
                {!! json_encode($product->main_image_path ? url('storage/' . $product->main_image_path) : '') !!},
                @foreach($product->productImages as $image)
                {!! json_encode($image->name ? url('storage/' . $image->name) : '') !!}{{ !$loop->last ? ',' : '' }}
                @endforeach
              ],
              "brand": {
                "@type": "Brand",
                "name": {!! json_encode($product->productBrand->name ?? 'Sheffield Steel Systems') !!}
              },
              "category": {!! json_encode($product->productCategories->first()->name ?? 'Uncategorized') !!},
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": {{$product->review_rating ?? 4.9}},
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": {!! json_encode($product->review_author ?? 'Anonymous') !!}
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": {{ $product->review_rating ?? 4.9 }},
                "reviewCount": {{ $product->review_count ?? 100 }}
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "KES",
                "price": {!! json_encode($product->cost_price ?? 1) !!},
                "priceValidUntil": {!! json_encode($product->price_valid_until ?? '2024-11-20') !!},
                "availability": "https://schema.org/InStock",
                "url": {!! json_encode(request()->is('product/' . $product->id . '/*') ? request()->url() : url('/') . '/kitchen/product/' . $product->id . '/' . Str::slug($product->name)) !!},
                "sku": {!! json_encode($product->sku ?? 'SSS' . $product->id) !!},
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingDestination": {
                        "@type": "DefinedRegion",
                        "addressCountry": "KE"
                    },
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": {!! json_encode($product->shipping_cost ?? 0) !!},
                        "currency": "KES"
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 1,
                            "unitCode": "DAY"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue":  {!! json_encode($product->min_delivery_time ?? 1) !!},
                            "maxValue": {!! json_encode($product->max_delivery_time ?? 7) !!},
                            "unitCode": "DAY"
                        }
                    }
                },
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "KE",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 60,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                }
              }
            }
          }{{ !$loop->last ? ',' : '' }}
          @endforeach
        ]
      }
    ]
  },
  "offers": [
    @foreach($productsForSchema as $product)
    {
      "@type": "Offer",
      "name": {!! json_encode($product->name) !!},
      "description": {!! json_encode(Str::limit($product->description ?? 'Product description not available', 160)) !!},
      "image": [
        {!! json_encode($product->main_image_path ? url('storage/' . $product->main_image_path) : '') !!}
      ],
      "priceCurrency": "KES",
      "price": {!! json_encode($product->price ?? 1) !!},
      "priceValidUntil": {!! json_encode($product->price_valid_until ?? '2024-11-20') !!},
      "availability": "https://schema.org/InStock",
      "url": {!! json_encode(request()->is('product/' . $product->id . '/*') ? request()->url() : url('/') . '/kitchen/product/' . $product->id . '/' . Str::slug($product->name)) !!},
      "brand": {
        "@type": "Brand",
        "name": {!! json_encode($product->productBrand->name ?? 'Sheffield Steel Systems') !!}
      }
    }{{ !$loop->last ? ',' : '' }}
    @endforeach
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
}
</script>


<!-- Client Success Stories Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Article",
          "name": "Java House Success Story",
          "description": "Complete kitchen solution implementation across multiple branches"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Article",
          "name": "Nairobi Hospital Project",
          "description": "State-of-the-art kitchen and laundry installation"
        }
      }
    ]
  }
</script>


<!-- Schema.org markup for Google -->

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sheffield Steel Systems Limited",
    "description": "East Africa's leading commercial kitchen equipment manufacturer and steel fabricator",
    "url": "{{ url('/') }}",
    "areaServed": ["Kenya", "Uganda", "Tanzania", "Rwanda", "East Africa"],
    "serviceType": [
      "Commercial Kitchen Equipment",
      "Cold Storage Solutions",
      "Stainless Steel Fabrication",
      "Industrial Laundry Equipment"
    ]
  }
</script>

<!-- Service Areas Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Kitchen Solutions",
    "provider": {
      "@type": "Organization",
      "name": "Sheffield Steel Systems Limited"
    },
    "areaServed": [{
        "@type": "City",
        "name": "Nairobi"
      },
      {
        "@type": "City",
        "name": "Mombasa"
      },
      {
        "@type": "City",
        "name": "Kisumu"
      },
      {
        "@type": "City",
        "name": "Kampala"
      },
      {
        "@type": "City",
        "name": "Dar es Salaam"
      },
      {
        "@type": "City",
        "name": "Kigali"
      }
    ]
  }
</script>

<!-- FAQ Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
        "@type": "Question",
        "name": "What commercial kitchen equipment services does Sheffield provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sheffield provides complete commercial kitchen solutions including design, equipment supply, installation, maintenance, and custom fabrication. We serve restaurants, hotels, hospitals, schools, and industrial facilities."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas does Sheffield serve in East Africa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sheffield serves all major cities in East Africa including Nairobi, Mombasa, Kisumu, Kampala, Dar es Salaam, and Kigali, with additional coverage across Kenya, Uganda, Tanzania, and Rwanda."
        }
      }
    ]
  }
</script>

<!-- Video Content Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Sheffield Commercial Kitchen Solutions Overview",
    "description": "Comprehensive overview of our commercial kitchen equipment and services",
    "thumbnailUrl": [
        "https://img.youtube.com/vi/YvhZ9lOAnSc/maxresdefault.jpg"
    ],
    "embedUrl": "https://www.youtube.com/embed/YvhZ9lOAnSc?si=YtlSNqwiWkdyi7zC",
    "uploadDate": "2021-07-12T08:00:00+03:00",
    "contentUrl": "https://www.youtube.com/watch?v=YvhZ9lOAnSc",
    "duration": "PT2M23S"
  }
</script>
