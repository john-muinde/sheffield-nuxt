import type { SegmentInterface } from "~/types/meta-tags";
import showToast from "./notification";

// src/utils/api.js
export const apiRequest = async (
  method: string,
  url: string,
  data = null,
  config = {}
) => {
  const { logoutAdmin } = useAuth();
  const { api } = useAxios();
  try {
    if (method === "put") {
      method = "post";
      url += "?_method=PUT";
    }
    const response = await api.request({ method, url, data, ...config });

    return response.data?.data || response.data;
  } catch (error: any) {
    const validationErrors = error.response?.data?.errors || {};
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    validationErrors.message = message;
    showToast(message, "error");

    // if 401 and admin use logoutadmin othwerwise logout
    if (error.response.status === 401) {
      if (window.location.pathname.includes("admin")) {
        logoutAdmin();
      }
    }
    throw validationErrors;
  }
};

export const APP_SEGMENTS: SegmentInterface[] = [
  {
    id: 301,
    active: true,
    name: "Cold Storage",
    slug: "cold-storage",
    slugs: [],
    keywords: `cold storage solutions east africa, coldroom installation nairobi, 
      industrial refrigeration kenya, commercial refrigeration systems, walk-in coldrooms, 
      blast freezers, chillers, freezer rooms, cold storage, temperature control systems, 
      refrigeration solutions, blast chiller systems, commercial fridges, 
      supermarket refrigeration, industrial freezers, cold chain solutions, 
      food storage systems, pharmaceutical cold storage, commercial cold rooms, 
      dairy cooling systems, meat storage solutions, frozen food storage, 
      cold storage maintenance, cold room design, industrial cooling systems, 
      modular cold rooms, refrigerated warehousing, cold storage installation, 
      cold chain equipment, temperature monitoring systems, frozen storage solutions, 
      cold storage consultancy, commercial freezer rooms, cold storage maintenance, 
      cold room repair services, refrigeration equipment east africa, 
      industrial cold storage kenya, commercial cooling solutions, 
      food preservation systems, cold chain logistics, temperature-controlled storage, 
      cold storage facility design, industrial refrigeration maintenance, 
      supermarket cooling systems, restaurant cold storage, hotel cold rooms, 
      hospital cold storage, pharmaceutical refrigeration, laboratory cold storage, 
      food processing cold rooms, butchery cold storage, fishery cold rooms, 
      agricultural cold storage, dairy cold rooms, beverage cooling systems, 
      ice cream storage solutions, vaccine storage systems, blood bank refrigeration`,
    color: "#3d62ad",
    image: "/assets/images/homepage/cold_storage_page.jpg",
    icon: "/assets/images/menu-icons/cold-room.png",
  },
  {
    id: 247,
    active: true,
    name: "Laundry",
    slug: "laundry",
    slugs: [],
    keywords: `industrial laundry equipment east africa, commercial washing machines kenya, 
      industrial dryers, laundry solutions, commercial laundry systems, 
      hotel laundry equipment, hospital laundry solutions, industrial washers, 
      commercial dryers, laundromat equipment, dry cleaning machines, 
      industrial ironers, commercial pressing equipment, laundry automation systems, 
      industrial laundry installation, commercial laundry maintenance, 
      laundry equipment suppliers, industrial washing solutions, 
      commercial laundry consultancy, hotel laundry systems, hospital laundry equipment, 
      school laundry solutions, industrial laundry design, laundry facility planning, 
      commercial washer extractors, industrial tumble dryers, finishing equipment, 
      flatwork ironers, laundry folding machines, garment conveyor systems, 
      ozone laundry systems, wet cleaning solutions, commercial laundry chemicals, 
      laundry water recycling, energy-efficient laundry, industrial pressing machines, 
      laundry management systems, commercial laundry software, laundry trolleys, 
      industrial laundry carts, laundry sorting systems, stain removal equipment, 
      commercial fabric care, industrial textile cleaning, laundry automation controls, 
      commercial laundry parts, laundry equipment service, industrial laundry repair, 
      laundry facility design, commercial laundry planning, industrial cleaning solutions`,
    color: "#7ab337",
    image: "/assets/images/homepage/laundry_page.jpg",
    icon: "/assets/images/menu-icons/laundry.png",
  },
  {
    id: 21,
    active: true,
    name: "Commercial Kitchen",
    slug: "commercial-kitchen",
    slugs: ["kitchen"],
    keywords: `commercial kitchen equipment kenya, industrial kitchen supplier east africa, 
      commercial kitchen manufacturer africa, restaurant kitchen equipment, 
      hotel kitchen solutions, hospital kitchen systems, school cafeteria equipment, 
      industrial canteen setup, food processing equipment, bakery equipment, 
      butchery equipment, supermarket installations, commercial ovens, 
      industrial cookers, professional grills, food prep stations, 
      dishwashing systems, ventilation hoods, cooking ranges, kitchen consultancy, 
      project management, kitchen maintenance services, equipment repair, 
      spare parts supply, warranty services, kitchen design, layout optimization, 
      workflow planning, HACCP compliant kitchens, food safety equipment, 
      hygiene systems, energy-efficient solutions, sustainable kitchen design, 
      green technologies, kitchen automation, monitoring systems, 
      smart kitchen solutions, commercial food preparation, industrial cooking equipment, 
      professional kitchen supplies, restaurant equipment installation, 
      hotel kitchen design, catering equipment solutions, commercial refrigeration, 
      food service equipment, industrial kitchen maintenance, cooking equipment repair, 
      kitchen ventilation systems, commercial kitchen consulting, food prep equipment, 
      industrial food processors, commercial mixers, food warming equipment, 
      kitchen storage solutions, stainless steel equipment, commercial kitchen parts, 
      kitchen equipment service, industrial kitchen planning, restaurant solutions, 
      cafe equipment setup, fast food kitchen systems, industrial kitchen design`,
    color: "#c02434",
    image: "/assets/images/homepage/commercial_kitchen.jpg",
    icon: "/assets/images/menu-icons/kitchen.png",
  },
  {
    id: 370,
    get active() {
      return globalState.promotions.length > 0 || true;
    },
    name: "Promotional Solutions",
    slug: "promotional-solutions",
    slugs: ["promotions"],
    keywords: `kitchen equipment promotions kenya, commercial kitchen deals east africa, 
      laundry equipment offers, cold storage discounts, industrial kitchen promotions, 
      commercial equipment sales, restaurant equipment deals, hotel supplies offers, 
      catering equipment promotions, industrial machinery discounts, seasonal offers, 
      equipment lease promotions, commercial kitchen packages, laundry system bundles, 
      cold storage solutions deals, business equipment promotions, year-end sales, 
      commercial appliance discounts, industrial equipment offers, kitchen setup packages, 
      restaurant startup deals, hotel equipment bundles, hospital equipment promotions, 
      school cafeteria packages, industrial kitchen deals, commercial refrigeration offers, 
      laundry installation promotions, equipment financing offers, maintenance package deals, 
      spare parts promotions, warranty extension offers, equipment upgrade deals, 
      trade-in promotions, bulk purchase discounts, commercial kitchen specials, 
      industrial equipment sales, professional kitchen deals, business expansion offers, 
      equipment replacement promotions, installation service deals, maintenance contract offers, 
      equipment rental promotions, leasing package deals, commercial solutions bundles, 
      business equipment packages, industrial machinery offers, seasonal equipment deals, 
      promotional equipment packages, limited time offers, special equipment deals`,
    color: "#f4a261",
    image: "/assets/images/events/december-promo.jpg",
    icon: "/assets/images/menu-icons/promotions.webp",
  },
];
