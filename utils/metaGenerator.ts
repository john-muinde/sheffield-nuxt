import { url } from 'inspector';
import type { MetaTagsInterface } from '~/types/meta-tags'

export const useMetaGenerator = () => {
    // Configuration similar to Laravel blade config
    const config = {
        appName: "Sheffield Steel Systems",
        url: "https://dev.sheffieldafrica.com",
        locale: "en", // You can dynamically set this
        locales: ["en", "fr"], // Add your supported locales
    };

    const getDefaultMetaTags = (): MetaTagsInterface => ({
        title: `${config.appName} | Commercial Kitchen, Laundry & Steel Solutions`,
        description: "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions, coldrooms, steel fabrication.",
        ogTitle: 'Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities',
        ogDescription: "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
        primaryImage: '/assets/images/logo.png',
        keywords: 'Commercial Kitchen, Laundry, Steel Solutions, Coldrooms, Steel Fabrication, East Africa, Kenya, Nairobi,commercial kitchen equipment kenya, industrial kitchen supplier east africa, commercial kitchen manufacturer africa, coldroom installation nairobi, industrial refrigeration kenya, cold storage solutions east africa, steel fabrication kenya, custom steel work nairobi, metal fabrication east africa,commercial kitchen equipment, industrial kitchen design, kitchen installation services,commercial refrigeration systems, walk-in coldrooms, blast freezers, chillers,stainless steel counters, steel fixtures, custom fabrication,industrial laundry equipment, commercial washing machines, industrial dryers,restaurant kitchen equipment, hotel kitchen solutions, hospital kitchen systems,school cafeteria equipment, industrial canteen setup, food processing equipment,bakery equipment, butchery equipment, supermarket installations,commercial ovens, industrial cookers, professional grills,food prep stations, commercial fridges, freezer rooms,dishwashing systems, ventilation hoods, cooking ranges,kitchen consultancy, project management, maintenance services,equipment repair, spare parts supply, warranty services,kitchen design, layout optimization, workflow planning,HACCP compliant kitchens, food safety equipment, hygiene systems,energy-efficient solutions, sustainable kitchen design, green technologies,kitchen automation, monitoring systems, smart kitchen solutions,Java House kitchen systems, KFC equipment supplier, Carrefour installations,Sarova Hotels kitchen partner, Big Square equipment, Artcaffe solutions,Nairobi Hospital systems, AKUH installations, Karen Hospital equipment, Kenya Airways catering, Hilton Hotels supplier, Radisson installations,Kenchic industrial, Standard Chartered facilities, Naivas solutions,Gertrudes Hospital, MP Shah equipment, Muthaiga Country Club,Karen Country Club, Capital Club, Vetlab Club installations,East African Breweries, Strathmore University, USIU facilities,nairobi commercial kitchens, mombasa restaurant equipment,kisumu kitchen installations, eldoret coldroom solutions,nakuru steel fabrication, nyeri kitchen equipment,kampala uganda installations, dar es salaam solutions,kigali rwanda equipment, arusha tanzania systems,juba south sudan partner, bujumbura burundi supplier,hotel kitchen equipment, restaurant solutions, hospital systems,school cafeteria installations, industrial kitchen setups,supermarket refrigeration, butchery equipment, bakery solutions,commercial kitchen maintenance, equipment repair services,spare parts supplier, warranty support, technical assistance,project consulting, kitchen design services, layout planning,industrial cooking equipment, commercial food prep,kitchen storage solutions, ventilation systems,food service equipment, catering solutions,coldroom installation, freezer room setup,blast chiller systems, refrigeration solutions,temperature control systems, cold storage,stainless steel fabrication, custom metal work,steel kitchen equipment, metalwork solutions,custom countertops, steel fixtures,laundry equipment, commercial washers,industrial dryers, laundry solutions,cleaning equipment systems,restaurant chain solutions, hotel group equipment,hospital kitchen systems, school catering equipment,industrial facility solutions, commercial setups',
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
                    keywords: `${content.keywords}, ${content.name}, Sheffield Steel Systems Blog,${cleanDescription(content.content)}`,
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
                    keywords: `${content.keywords}, ${content.name}, Sheffield Steel Systems,${cleanDescription(content.description || '')}`,
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
                    keywords: `${content.keywords}, ${content.title}, Sheffield Steel Systems,${cleanDescription(content.description || '')}`,
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