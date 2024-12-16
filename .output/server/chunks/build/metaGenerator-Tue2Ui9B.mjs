import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';

function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k2, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k2, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}
function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (typeof resolved !== "undefined")
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}
const p = (p2) => ({ keyValue: p2, metaKey: "property" });
const k = (p2) => ({ keyValue: p2 });
const MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)}=${value}`;
      }
    }
  },
  articleExpirationTime: p("article:expiration_time"),
  articleModifiedTime: p("article:modified_time"),
  articlePublishedTime: p("article:published_time"),
  bookReleaseDate: p("book:release_date"),
  charset: {
    metaKey: "charset"
  },
  contentSecurityPolicy: {
    unpack: {
      entrySeparator: "; ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)} ${value}`;
      }
    },
    metaKey: "http-equiv"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  fbAppId: p("fb:app_id"),
  msapplicationConfig: k("msapplication-Config"),
  msapplicationTileColor: k("msapplication-TileColor"),
  msapplicationTileImage: k("msapplication-TileImage"),
  ogAudioSecureUrl: p("og:audio:secure_url"),
  ogAudioUrl: p("og:audio"),
  ogImageSecureUrl: p("og:image:secure_url"),
  ogImageUrl: p("og:image"),
  ogSiteName: p("og:site_name"),
  ogVideoSecureUrl: p("og:video:secure_url"),
  ogVideoUrl: p("og:video"),
  profileFirstName: p("profile:first_name"),
  profileLastName: p("profile:last_name"),
  profileUsername: p("profile:username"),
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      resolve({ key, value }) {
        if (key === "seconds")
          return `${value}`;
      }
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        if (typeof value === "boolean")
          return `${fixKeyCase(key)}`;
        else
          return `${fixKeyCase(key)}:${value}`;
      }
    }
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  }
};
const openGraphNamespaces = /* @__PURE__ */ new Set([
  "og",
  "book",
  "article",
  "profile"
]);
function resolveMetaKeyType(key) {
  var _a;
  const fKey = fixKeyCase(key);
  const prefixIndex = fKey.indexOf(":");
  if (openGraphNamespaces.has(fKey.substring(0, prefixIndex)))
    return "property";
  return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.metaKey) || "name";
}
function resolveMetaKeyValue(key) {
  var _a;
  return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.keyValue) || fixKeyCase(key);
}
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const prefixIndex = updated.indexOf("-");
  const fKey = updated.substring(0, prefixIndex);
  if (fKey === "twitter" || openGraphNamespaces.has(fKey))
    return key.replace(/([A-Z])/g, ":$1").toLowerCase();
  return updated;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry) => changeKeyCasingDeep(entry));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const key in input) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) {
      continue;
    }
    output[fixKeyCase(key)] = changeKeyCasingDeep(input[key]);
  }
  return output;
}
function resolvePackedMetaObjectValue(value, key) {
  const definition = MetaPackingSchema[key];
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(
    changeKeyCasingDeep(value),
    {
      keyValueSeparator: "=",
      entrySeparator: ", ",
      resolve({ value: value2, key: key2 }) {
        if (value2 === null)
          return "";
        if (typeof value2 === "boolean")
          return `${key2}`;
      },
      ...definition == null ? void 0 : definition.unpack
    }
  );
}
const ObjectArrayEntries = /* @__PURE__ */ new Set(["og:image", "og:video", "og:audio", "twitter:image"]);
function sanitize(input) {
  const out = {};
  for (const k2 in input) {
    if (!Object.prototype.hasOwnProperty.call(input, k2)) {
      continue;
    }
    const v = input[k2];
    if (String(v) !== "false" && k2)
      out[k2] = v;
  }
  return out;
}
function handleObjectEntry(key, v) {
  const value = sanitize(v);
  const fKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fKey);
  if (ObjectArrayEntries.has(fKey)) {
    const input = {};
    for (const k2 in value) {
      if (!Object.prototype.hasOwnProperty.call(value, k2)) {
        continue;
      }
      input[`${key}${k2 === "url" ? "" : `${k2[0].toUpperCase()}${k2.slice(1)}`}`] = value[k2];
    }
    return unpackMeta(input).sort((a, b) => {
      var _a, _b;
      return (((_a = a[attr]) == null ? void 0 : _a.length) || 0) - (((_b = b[attr]) == null ? void 0 : _b.length) || 0);
    });
  }
  return [{ [attr]: fKey, ...value }];
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  for (const key in input) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) {
      continue;
    }
    const value = input[key];
    if (!Array.isArray(value)) {
      if (typeof value === "object" && value) {
        if (ObjectArrayEntries.has(fixKeyCase(key))) {
          extras.push(...handleObjectEntry(key, value));
          continue;
        }
        primitives[key] = sanitize(value);
      } else {
        primitives[key] = value;
      }
      continue;
    }
    for (const v of value) {
      extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
    }
  }
  const meta = unpackToArray(primitives, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      return resolveMetaKeyValue(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object")
        return resolvePackedMetaObjectValue(value, key);
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].map((m) => {
    if (m.content === "_null")
      m.content = null;
    return m;
  });
}
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
const useMetaGenerator = () => {
  const config = {
    appName: "Sheffield Steel Systems",
    url: "https://dev.sheffieldafrica.com",
    locale: "en",
    locales: ["en", "fr"],
    defaultImage: "/assets/images/logo.png",
    styles: [
      "/assets/css/bootstrap.min.css",
      "/assets/css/plugins/owl-carousel/owl.carousel.css",
      "/assets/css/plugins/jquery.countdown.css",
      "/assets/css/style.css",
      "/assets/css/skins/skin-demo-14.css",
      "/assets/css/demos/demo-14.css",
      "/assets/css/demos/demo-4.css"
    ]
  };
  const cleanDescription = (description, maxLength = 160) => {
    let cleanText = description.replace(/<[^>]*>/g, "");
    cleanText = cleanText.replace(/&[^;]+;/g, "");
    return cleanText.length > maxLength ? cleanText.substring(0, maxLength) + "..." : cleanText;
  };
  const generateSeoMeta = (metaTags, route) => {
    return {
      title: metaTags.title,
      titleTemplate: `%s - ${config.appName}`,
      description: metaTags.description,
      keywords: metaTags.keywords,
      // Open Graph
      ogTitle: metaTags.ogTitle,
      ogDescription: metaTags.ogDescription,
      ogImage: metaTags.primaryImage,
      ogUrl: `${config.url}${route.fullPath}`,
      ogType: "website",
      ogSiteName: config.appName,
      ogLocale: config.locale,
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: metaTags.ogTitle,
      twitterDescription: metaTags.ogDescription,
      twitterImage: metaTags.primaryImage,
      twitterSite: "@sheffield_afric",
      // Additional meta
      author: config.appName,
      applicationName: config.appName,
      robots: "index, follow"
    };
  };
  const generateHeadInput = (route, schemas = []) => {
    const schemaScripts = Array.isArray(schemas) ? schemas : [schemas];
    return {
      htmlAttrs: {
        lang: config.locale,
        prefix: "og: https://ogp.me/ns#"
      },
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        { rel: "canonical", href: `${config.url}${route.fullPath}` },
        ...config.styles.map((href) => ({ rel: "stylesheet", href }))
      ],
      script: schemaScripts.map((schema) => ({
        type: "application/ld+json",
        children: JSON.stringify(schema)
      }))
    };
  };
  const getDefaultMetaTags = () => ({
    title: `${config.appName} | Commercial Kitchen, Laundry & Steel Solutions`,
    description: "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions, coldrooms, steel fabrication.",
    ogTitle: "Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities",
    ogDescription: "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
    primaryImage: config.url + "/assets/images/logo.png",
    keywords: "Commercial Kitchen, Laundry, Steel Solutions, Coldrooms, Steel Fabrication, East Africa, Kenya, Nairobi,commercial kitchen equipment kenya, industrial kitchen supplier east africa, commercial kitchen manufacturer africa, coldroom installation nairobi, industrial refrigeration kenya, cold storage solutions east africa, steel fabrication kenya, custom steel work nairobi, metal fabrication east africa,commercial kitchen equipment, industrial kitchen design, kitchen installation services,commercial refrigeration systems, walk-in coldrooms, blast freezers, chillers,stainless steel counters, steel fixtures, custom fabrication,industrial laundry equipment, commercial washing machines, industrial dryers,restaurant kitchen equipment, hotel kitchen solutions, hospital kitchen systems,school cafeteria equipment, industrial canteen setup, food processing equipment,bakery equipment, butchery equipment, supermarket installations,commercial ovens, industrial cookers, professional grills,food prep stations, commercial fridges, freezer rooms,dishwashing systems, ventilation hoods, cooking ranges,kitchen consultancy, project management, maintenance services,equipment repair, spare parts supply, warranty services,kitchen design, layout optimization, workflow planning,HACCP compliant kitchens, food safety equipment, hygiene systems,energy-efficient solutions, sustainable kitchen design, green technologies,kitchen automation, monitoring systems, smart kitchen solutions,Java House kitchen systems, KFC equipment supplier, Carrefour installations,Sarova Hotels kitchen partner, Big Square equipment, Artcaffe solutions,Nairobi Hospital systems, AKUH installations, Karen Hospital equipment, Kenya Airways catering, Hilton Hotels supplier, Radisson installations,Kenchic industrial, Standard Chartered facilities, Naivas solutions,Gertrudes Hospital, MP Shah equipment, Muthaiga Country Club,Karen Country Club, Capital Club, Vetlab Club installations,East African Breweries, Strathmore University, USIU facilities,nairobi commercial kitchens, mombasa restaurant equipment,kisumu kitchen installations, eldoret coldroom solutions,nakuru steel fabrication, nyeri kitchen equipment,kampala uganda installations, dar es salaam solutions,kigali rwanda equipment, arusha tanzania systems,juba south sudan partner, bujumbura burundi supplier,hotel kitchen equipment, restaurant solutions, hospital systems,school cafeteria installations, industrial kitchen setups,supermarket refrigeration, butchery equipment, bakery solutions,commercial kitchen maintenance, equipment repair services,spare parts supplier, warranty support, technical assistance,project consulting, kitchen design services, layout planning,industrial cooking equipment, commercial food prep,kitchen storage solutions, ventilation systems,food service equipment, catering solutions,coldroom installation, freezer room setup,blast chiller systems, refrigeration solutions,temperature control systems, cold storage,stainless steel fabrication, custom metal work,steel kitchen equipment, metalwork solutions,custom countertops, steel fixtures,laundry equipment, commercial washers,industrial dryers, laundry solutions,cleaning equipment systems,restaurant chain solutions, hotel group equipment,hospital kitchen systems, school catering equipment,industrial facility solutions, commercial setups",
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@graph": [
        // Main Organization Schema
        {
          "@type": "Organization",
          "@id": `${config.url}/#organization`,
          name: "Sheffield Steel Systems Limited",
          url: config.url,
          logo: {
            "@type": "ImageObject",
            url: assetsSync("/assets/images/logo.png"),
            contentUrl: assetsSync("/assets/images/logo.png"),
            caption: "Sheffield Steel Systems Logo"
          },
          description: "East Africa's premier commercial kitchen equipment manufacturer, coldroom specialist, and stainless steel fabricator, serving major brands across hospitality, healthcare, education, and retail sectors since 2003.",
          foundingDate: "2003",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+254 722 200 282",
              contactType: "customer service",
              areaServed: "East Africa",
              availableLanguage: ["English", "Swahili"]
            },
            {
              "@type": "ContactPoint",
              telephone: "+254 722 200 282",
              contactType: "sales",
              areaServed: "East Africa",
              availableLanguage: ["English", "Swahili"]
            }
          ],
          sameAs: [
            "https://www.facebook.com/sheffieldafrica",
            "https://twitter.com/sheffield_afric",
            "https://www.linkedin.com/company/sheffield-steel-systems-ltd",
            "https://www.youtube.com/@sheffieldafrica315"
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressRegion: "Nairobi",
            postalCode: "00100",
            streetAddress: "Mombasa Road, Saku Business Park, Block C, 2nd Floor",
            addressCountry: "KE"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "-1.3232",
            longitude: "36.9272"
          },
          openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-17:00"],
          areaServed: [
            {
              "@type": "Country",
              name: "Kenya",
              identifier: "KE"
            },
            {
              "@type": "Country",
              name: "Uganda",
              identifier: "UG"
            },
            {
              "@type": "Country",
              name: "Tanzania",
              identifier: "TZ"
            },
            {
              "@type": "Country",
              name: "Rwanda",
              identifier: "RW"
            },
            {
              "@type": "Country",
              name: "Burundi",
              identifier: "BI"
            }
          ],
          memberOf: [
            {
              "@type": "Organization",
              name: "Kenya Association of Manufacturers"
            },
            {
              "@type": "Organization",
              name: "Kenya Private Sector Alliance"
            }
          ]
        },
        // Main Services/Products Schema
        {
          "@type": "Service",
          "@id": `${config.url}/#services`,
          name: "Commercial Kitchen Solutions",
          provider: {
            "@type": "Organization",
            "@id": `${config.url}/#organization`
          },
          serviceType: [
            "Commercial Kitchen Equipment",
            "Industrial Laundry Solutions",
            "Cold Storage Systems",
            "Steel Fabrication"
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Sheffield Services Catalog",
            itemListElement: [
              {
                "@type": "OfferCatalog",
                name: "Commercial Kitchen Equipment",
                itemListElement: [
                  {
                    "@type": "Service",
                    name: "Kitchen Design & Installation",
                    description: "Complete commercial kitchen design and installation services"
                  },
                  {
                    "@type": "Service",
                    name: "Equipment Supply",
                    description: "Supply of professional kitchen equipment and appliances"
                  },
                  {
                    "@type": "Service",
                    name: "Maintenance Services",
                    description: "Regular maintenance and repair of kitchen equipment"
                  }
                ]
              },
              {
                "@type": "OfferCatalog",
                name: "Cold Storage Solutions",
                itemListElement: [
                  {
                    "@type": "Service",
                    name: "Coldroom Installation",
                    description: "Design and installation of commercial coldrooms"
                  },
                  {
                    "@type": "Service",
                    name: "Freezer Systems",
                    description: "Industrial freezer and chiller solutions"
                  }
                ]
              }
            ]
          }
        },
        // Customer Reviews/Ratings Schema
        {
          "@type": "AggregateRating",
          "@id": `${config.url}/#aggregateRating`,
          itemReviewed: {
            "@type": "Organization",
            "@id": `${config.url}/#organization`
          },
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "500",
          reviewCount: "350"
        },
        // Brand Schema
        {
          "@type": "Brand",
          "@id": `${config.url}/#brand`,
          name: "Sheffield Steel Systems",
          slogan: "Transforming Ideas into Sustainable Realities",
          logo: assetsSync("/assets/images/logo.png"),
          description: "East Africa's leading commercial kitchen and steel solutions provider",
          brand: {
            "@type": "Organization",
            "@id": `${config.url}/#organization`
          }
        },
        // faqs Schema
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What commercial kitchen equipment services does Sheffield provide?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sheffield provides complete commercial kitchen solutions including design, equipment supply, installation, maintenance, and custom fabrication. We serve restaurants, hotels, hospitals, schools, and industrial facilities."
              }
            },
            {
              "@type": "Question",
              name: "Which areas does Sheffield serve in East Africa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sheffield serves all major cities in East Africa including Nairobi, Mombasa, Kisumu, Kampala, Dar es Salaam, and Kigali, with additional coverage across Kenya, Uganda, Tanzania, and Rwanda."
              }
            }
          ]
        }
      ]
    }
  });
  const generateContentMetaTags = (contentData) => {
    const defaultMetaTags = getDefaultMetaTags();
    if (!contentData) {
      return defaultMetaTags;
    }
    const { content, type } = contentData;
    switch (type) {
      case "blogs":
        return {
          title: `${content.name}  Blog`,
          description: cleanDescription(content.content),
          ogTitle: content.name,
          ogDescription: cleanDescription(content.content),
          keywords: `${content.keywords}, ${content.name}, Sheffield Steel Systems Blog`,
          primaryImage: content.main_image_path ? assetsSync(content.main_image_path) : config.defaultImage,
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: content.name,
            image: content.main_image_path ? [assetsSync(content.main_image_path)] : [config.defaultImage],
            datePublished: content.created_at,
            dateModified: content.updated_at,
            author: content.author ? {
              "@type": "Person",
              name: content.author.name,
              url: content.author.profile_url || `/author/${content.author.id}`
            } : {
              "@type": "Organization",
              name: "Sheffield Steel Systems Limited",
              url: config.url
            }
          }
        };
      case "product":
        return {
          title: `${content.name} `,
          description: cleanDescription(content.description || ""),
          ogTitle: `${content.name} - Sheffield Steel Systems`,
          ogDescription: cleanDescription(content.description || ""),
          keywords: `${content.keywords}, ${content.name}, Sheffield Steel Systems`,
          primaryImage: content.main_image_path ? assetsSync(content.main_image_path) : config.defaultImage,
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "Product",
            name: content.name,
            description: cleanDescription(content.description || ""),
            image: content.main_image_path ? assetsSync(content.main_image_path) : config.defaultImage,
            brand: {
              "@type": "Brand",
              name: "Sheffield Steel Systems"
            }
          }
        };
      case "video":
        return {
          title: `${content.title} `,
          description: cleanDescription(content.description || ""),
          ogTitle: `${content.title} - Sheffield Steel Systems`,
          ogDescription: cleanDescription(content.description || ""),
          keywords: `${content.keywords}, ${content.title}, Sheffield Steel Systems`,
          primaryImage: content.thumbnail || config.defaultImage,
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: content.title,
            description: content.description,
            thumbnailUrl: content.thumbnail || config.defaultImage,
            uploadDate: content.created_at
          }
        };
      default:
        return {
          title: `${content.name.toUpperCase()} `,
          description: cleanDescription(content.description || ""),
          ogTitle: `${content.name} - Sheffield Steel Systems`,
          ogDescription: cleanDescription(content.description || ""),
          keywords: `${content.keywords}, ${content.name}, Sheffield Steel Systems`,
          primaryImage: content.main_image_path ? assetsSync(content.main_image_path) : config.defaultImage,
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: content.name,
            description: cleanDescription(content.description || ""),
            image: content.main_image_path ? assetsSync(content.main_image_path) : config.defaultImage
          }
        };
    }
  };
  return {
    generateSeoMeta,
    generateHeadInput,
    generateContentMetaTags,
    getDefaultMetaTags,
    config
  };
};

export { useMetaGenerator as a, useSeoMeta as u };
//# sourceMappingURL=metaGenerator-Tue2Ui9B.mjs.map
