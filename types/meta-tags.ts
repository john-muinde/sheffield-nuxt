export interface MetaTagsInterface {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  primaryImage: string;
  jsonLdSchema: any;
  keywords: string;
}

export interface ContentDataInterface {
  content: ContentInterFace;
  type: string;
}

export interface ContentInterFace {
  content: string;
  main_image_path: string;
  name?: string;
  created_at: string;
  updated_at: string;
  author?: Object;
  description?: string;
  title?: string;
  thumbnail?: string;
}

export interface SegmentInterface {
  id: number;
  active: boolean;
  name: string;
  slug: string;
  slugs: string[];
  color: string;
  image: string;
  icon: string;
  keywords: string;
}

export interface SolutionInterface {

  id: number;
  name: string;
  description: string;
  is_published: number;
  created_by: any;
  created_at: string;
  updated_at: string;
  solution_category: number;
  main_image_path: string;
  order_index: number;

}
