<template>
    <div class="the_main_div">
        <!-- Navbar handling -->
        <Navbar v-if="!isHomePage" />

        <!-- Menu components -->
        <KitchenMenu v-if="isKitchenPage" />
        <LaundryMenu v-if="isLaundryPage" />
        <ColdRoomMenu v-if="isColdRoomPage" />
        <PromotionalMenu v-if="isPromotionalPage" />

        <!-- Main content slot -->
        <slot />

        <MobileMenu />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'


// Configuration similar to Laravel blade config
const config = {
    appName: 'Sheffield Steel Systems',
    locale: 'en', // You can dynamically set this
    locales: ['en', 'fr'] // Add your supported locales
}

const { api, API_URL } = useAxios()

// Make config available globally
useHead({
    title: config.appName,
    htmlAttrs: {
        lang: config.locale,
        prefix: 'og: https://ogp.me/ns#'
    },
    link: [
        // Favicon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.png' },

        // DearFlip CSS
        { rel: 'stylesheet', href: '/dearflip/dflip/css/dflip.min.css' },

        // Other CSS files (converted from Laravel vite imports)
        { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins/owl-carousel/owl.carousel.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins/jquery.countdown.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' },
        { rel: 'stylesheet', href: '/assets/css/skins/skin-demo-14.css' },
        { rel: 'stylesheet', href: '/assets/css/demos/demo-14.css' },
        { rel: 'stylesheet', href: '/assets/css/demos/demo-4.css' }
    ],
    script: [
        // jQuery and its migrate plugin
        { src: '/dearflip/dflip/js/libs/jquery.min.js', id: 'jquery-core-js' },
        { src: '/dearflip/dflip/js/libs/jquery-migrate.min.js', id: 'jquery-migrate-js' },

        // DearFlip and other JS libraries
        { src: '/dearflip/dflip/js/libs/imagesloaded.min.js', id: 'imagesloaded-js' },
        { src: '/dearflip/dflip/js/libs/masonry.min.js', id: 'masonry-js' },
        { src: '/dearflip/dflip/js/dflip.min.js', id: 'dflip-script-js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js' },

        // Custom scripts
        {
            children: `
                window.dFlipLocation = "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
                window.dFlipWPGlobal = ${JSON.stringify({
                text: {
                    // ... (your original dFlipWPGlobal text configurations)
                },
                // ... (rest of the original dFlipWPGlobal configurations)
            })}
            `
        }
    ]
})

const route = useRoute()

// Page type computeds
const isHomePage = computed(() => route.path === '/')
const isKitchenPage = computed(() => route.path.includes('/commercial-kitchen'))
const isLaundryPage = computed(() => route.path.includes('/laundry'))
const isColdRoomPage = computed(() => route.path.includes('/cold-storage'))
const isPromotionalPage = computed(() => route.path.includes('/promotional'))

// Pixel tracking similar to Laravel implementation
onMounted(() => {
    const trackPixel = async () => {
        let trackingId = localStorage.getItem('pixel-tracker')

        if (!trackingId) {
            trackingId = generateRandomString(30)
            localStorage.setItem('pixel-tracker', trackingId)
        }

        const pixelTrackerImg = document.createElement('img')

        pixelTrackerImg.src = `${API_URL}/pixel-tracker?event=page_visit&tracking_id=${trackingId}&url=${window.location.href}`;
        pixelTrackerImg.style.display = 'none'
        document.body.appendChild(pixelTrackerImg)
    }

    // Smartlook initialization
    if (typeof window !== 'undefined') {
        ; (window as any).smartlook || (function (d) {
            const o: any = (window as any).smartlook = function () {
                o.api.push(arguments)
            }
            const h = d.getElementsByTagName('head')[0]
            const c = d.createElement('script')
            o.api = new Array()
            c.async = true
            c.type = 'text/javascript'
            c.charset = 'utf-8'
            c.src = 'https://web-sdk.smartlook.com/recorder.js'
            h.appendChild(c)
        })(document)

            ; (window as any).smartlook('init', '1877a41e49ec51b8bb404184dd7fa59f985f3925', {
                region: 'eu'
            })
    }

    // Pixel tracking
    trackPixel()
})

// Utility function for generating random string
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
</script>

<style>
[v-cloak] {
    display: none;
}
</style>