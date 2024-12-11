export interface MetaTagsInterface {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    primaryImage: string
    jsonLdSchema: any,
    keywords: string,
}

export interface ContentDataInterface {
    content: ContentInterFace
    type: string
}

export interface ContentInterFace {
    content: string,
    main_image_path: string,
    name?: string,
    created_at: string,
    updated_at: string,
    author?: Object,
    description?: string
    title?: string,
    thumbnail?: string,
}