import type { MetaTagsInterface } from '~/types/meta-tags'

export const useMetaGenerator = () => {
    // Configuration similar to Laravel blade config
    const config = {
        appName: "Sheffield Steel Systems",
        locale: "en", // You can dynamically set this
        locales: ["en", "fr"], // Add your supported locales
    };

    const getDefaultMetaTags = (): MetaTagsInterface => ({
        title: `${config.appName} | Commercial Kitchen, Laundry & Steel Solutions`,
        description: "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions, coldrooms, steel fabrication.",
        ogTitle: 'Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities',
        ogDescription: "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
        primaryImage: '/assets/images/logo.png',
        jsonLdSchema: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Sheffield Steel Systems Limited',
            'url': '/',
            'logo': '/assets/images/logo.png',
            'contactPoint': [{
                '@type': 'ContactPoint',
                'telephone': '+254 722 200 282',
                'contactType': 'customer service'
            }],
            'sameAs': [
                'https://www.facebook.com/sheffieldafrica',
                'https://twitter.com/sheffield_afric',
                'https://www.linkedin.com/company/sheffield-steel-systems-ltd',
                'https://www.youtube.com/@sheffieldafrica315'
            ],
            'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Nairobi',
                'addressRegion': 'Nairobi',
                'postalCode': '00100',
                'streetAddress': 'Mombasa Road, Saku Business Park, Block C, 2nd Floor'
            },
            'openingHours': 'Mo,Tu,We,Th,Fr,Sa 08:00-17:00',
            'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '-1.3232',
                'longitude': '36.9272'
            },
        }
    })

    const generateMetaTags = (contentData?: any): MetaTagsInterface => {
        const defaultMetaTags = getDefaultMetaTags()

        if (!contentData) {
            return defaultMetaTags
        }

        const content = contentData.content
        const type = contentData.type

        const cleanDescription = (description: string, maxLength = 160): string => {
            let cleanText = description.replace(/<[^>]*>/g, '')
            cleanText = cleanText.replace(/&[^;]+;/g, '')

            if (cleanText.length > maxLength) {
                cleanText = cleanText.substring(0, maxLength) + '...'
            }

            return cleanText
        }

        let generatedMetaTags: MetaTagsInterface

        switch (type) {
            case 'blogs':
                generatedMetaTags = {
                    title: `${content.name} | Sheffield Steel Systems Blog`,
                    description: cleanDescription(content.content),
                    ogTitle: content.name,
                    ogDescription: cleanDescription(content.content),
                    primaryImage: content.main_image_path
                        ? `/storage/${content.main_image_path}`
                        : '/assets/images/logo.png',
                    jsonLdSchema: {
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        'headline': content.name,
                        'image': [`/storage/${content.main_image_path}`],
                        'datePublished': content.created_at,
                        'dateModified': content.updated_at,
                        'author': content.author
                            ? [{
                                '@type': 'Person',
                                'name': content.author.name,
                                'url': content.author.profile_url || `/author/${content.author.id}`
                            }]
                            : [{
                                '@type': 'Organization',
                                'name': 'Sheffield Steel Systems Limited',
                                'url': '/'
                            }]
                    }
                }
                break

            case 'product':
                generatedMetaTags = {
                    title: `${content.name} | Sheffield Steel Systems`,
                    description: cleanDescription(content.description || ''),
                    ogTitle: `${content.name} - Sheffield Steel Systems`,
                    ogDescription: cleanDescription(content.description || ''),
                    primaryImage: content.main_image_path
                        ? `/storage/${content.main_image_path}`
                        : '/assets/images/logo.png',
                    jsonLdSchema: null
                }
                break

            case 'video':
                generatedMetaTags = {
                    title: `${content.title} | Sheffield Steel Systems`,
                    description: cleanDescription(content.description || ''),
                    ogTitle: `${content.title} - Sheffield Steel Systems`,
                    ogDescription: cleanDescription(content.description || ''),
                    primaryImage: content.thumbnail || '/assets/images/logo.png',
                    jsonLdSchema: {
                        '@context': 'https://schema.org',
                        '@type': 'VideoObject',
                        'name': content.title,
                        'description': content.description,
                        'thumbnailUrl': content.thumbnail || '/assets/images/logo.png',
                        'uploadDate': content.created_at
                    }
                }
                break

            default:
                generatedMetaTags = defaultMetaTags
        }

        // Merge default meta tags with generated meta tags
        return {
            ...defaultMetaTags,
            ...generatedMetaTags,
            jsonLdSchema: {
                ...defaultMetaTags.jsonLdSchema,
                ...generatedMetaTags.jsonLdSchema
            }
        }
    }

    return {
        generateMetaTags,
        getDefaultMetaTags,
        config
    }
}