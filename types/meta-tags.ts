export interface MetaTagsInterface {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    primaryImage: string
    jsonLdSchema: any
}

export interface ContentDataInterface {
    content: ContentInterFace
    type: string
}

export const getDefaultMetaTags = (): MetaTagsInterface => {
    return {
        title: 'Sheffield Steel Systems | Commercial Kitchen, Laundry & Steel Solutions',
        description: "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions, coldrooms, steel fabrication.",
        ogTitle: 'Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities',
        ogDescription: "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
        primaryImage: '/assets/images/logo.png',
        jsonLdSchema: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Sheffield Steel Systems Limited',
            'url': '/'
        }
    };
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