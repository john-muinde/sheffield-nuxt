interface Parent {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  parent_id: string | null; // Changed to string | null since IDs come as strings
  is_published: number;
  description: string;
  created_by: number | null; // Changed to number | null
  main_image_path: string | null;
  order_index: number | null;
  total_products: number;
  parent: Parent | null;
  parent_name_with_dashes?: string;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  parent_id: string;
  is_published: number;
  description: string;
  created_by: number | null;
  main_image_path: string | null;
  order_index: number | null;
  total_products: number;
  category_products_count?: number; // Optional for response categories
  // Fields for product categories_json
  parent_name?: string;
  parent_json?: Parent;
  parent_name_with_dashes?: string;
  parent_parent_name_with_dashes?: string;
  parent_name_with_slashes?: string;
}

interface ProductImage {
  id: number;
  name: string;
  created_at: string;
}

interface ProductBrand {
  id: number;
  name: string;
  is_registered: number;
  slug: string;
  categories: string;
  facebook: string | null; // Added null as possible value
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  created_by: number | null; // Changed to number | null
  created_at: string;
  updated_at: string;
  main_image_path: string;
  is_published: number;
}

interface Product {
  updated_at: any;
  review_rating?: number;
  review_author?: string;
  review_count?: number;
  price_valid_until?: string;
  shipping_cost?: number;
  min_delivery_time?: number;
  max_delivery_time?: number;
  id: number;
  name: string;
  brand: string;
  brand_name: string;
  model_number?: string;
  sku?: string;
  quantity: string | null; // Added null as possible value
  cost_price: string | null; // Added null as possible value
  retail_price: string | null; // Added null as possible value
  weight: number | null; // Added null as possible value
  length: number;
  width: number;
  height: number;
  short_description: string;
  description: string;
  technical_specification: string;
  terms_of_operation: string | null; // Added null as possible value
  is_published: number;
  main_image_path: string;
  document_path: string | null;
  document: string | null;
  product_images: ProductImage[];
  product_brand: ProductBrand;
  categories_json: Category[];
  created_at: string;
}

interface ProductsResponse {
  products: {
    data: Product[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from?: number;
    to?: number;
    next_page_url?: string | null; // Optional for responses with links
    prev_page_url?: string | null; // Optional for responses with links
    links?: PaginationLink[]; // Optional for responses with links
  };
  categories: Category[];
  brands: {
    brand: string;
    product_brand: ProductBrand;
  }[];
  the_category: Parent & {
    children: Parent[];
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export type {
  Category,
  Parent,
  ProductImage,
  ProductBrand,
  Product,
  ProductsResponse,
  PaginationLink,
};
