import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import laravel from "laravel-vite-plugin";

import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
    css: {
        preprocessorOptions: {
        scss: {
            silenceDeprecations: ["legacy-js-api"],
        },
        },
  },
    build: {
        sourcemap: false,
        assetsDir: "assets",
        manifest: {
            write: "assets/manifest.json",
        },
        rollupOptions: {
            plugins: [
                commonjs(),
            ],
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/js/frontend-main.js",
                "resources/js/admin-main.js",
                "resources/css/app.css",
                "resources/js/apps/frontend/assets/css/bootstrap.min.css",
                "resources/js/apps/frontend/assets/css/plugins/owl-carousel/owl.carousel.css",
                "node_modules/vue3-carousel/dist/carousel.css",
                "resources/js/apps/frontend/assets/css/plugins/magnific-popup/magnific-popup.css",
                "resources/js/apps/frontend/assets/css/plugins/jquery.countdown.css",
                "resources/js/apps/frontend/assets/css/style.css",
                "resources/js/apps/frontend/assets/css/skins/skin-demo-14.css",
                "resources/js/apps/frontend/assets/css/demos/demo-14.css",
                "resources/js/apps/frontend/assets/css/demos/demo-4.css",
                "resources/js/apps/frontend/assets/js/jquery.min.js", //this is disabled
                "node_modules/jquery/src/jquery.js",
                "resources/js/apps/frontend/assets/js/bootstrap.bundle.min.js",
                "resources/js/apps/frontend/assets/js/jquery.hoverIntent.min.js",
                "resources/js/apps/frontend/assets/js/jquery.waypoints.min.js",
                "resources/js/apps/frontend/assets/js/superfish.min.js",
                "resources/js/apps/frontend/assets/js/owl.carousel.min.js", //this is disabled
                "resources/js/apps/frontend/assets/js/bootstrap-input-spinner.js",
                "resources/js/apps/frontend/assets/js/jquery.magnific-popup.min.js",
                "resources/js/apps/frontend/assets/js/jquery.plugin.min.js",
                "resources/js/apps/frontend/assets/js/jquery.countdown.min.js",
                "resources/js/apps/frontend/assets/js/jquery.elevateZoom.min.js",
                "resources/js/apps/frontend/assets/js/main.js",
                "resources/js/apps/frontend/assets/js/demos/demo-14.js",
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        // sass(),
        vueI18n({
            include: path.resolve("resources/js/src/locales/**"),
        }),
    ],
    optimizeDeps: {
        include: ["quill", "nouislider"],
    },
    assetsInclude: ["resources/js/src/assets"],
    resolve: {
        alias: [
            {
                find: /^~(.*)$/,
                replacement: "node_modules/$1",
            },
        ],
    },
    type: "module",
});

