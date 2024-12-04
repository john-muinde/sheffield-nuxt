<template>
  <div class="the_main_div">
    <!--  BEGIN NAVBAR  -->
    <Navbar v-if="!isHomePage" />

    <KitchenMenu v-if="isKitchenPage" />
    <LaundryMenu v-if="isLaundryPage" />
    <ColdRoomMenu v-if="isColdRoomPage" />
    <PromotionalMenu v-if="isPromotionalPage" />
    <!--  END NAVBAR  -->
    <!--  BEGIN CONTENT AREA  -->
    <router-view />
    <!--  END CONTENT AREA  -->
    <!-- BEGIN FOOTER -->

    <MobileMenu />
    <Footer />
    <!-- END FOOTER -->
  </div>
</template>

<script>
export default {
    name: 'FrontendLayout',
};
</script>

<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const Navbar = defineAsyncComponent(() => import('../components/layout/navbar.vue'));
const Footer = defineAsyncComponent(() => import('../components/layout/footer.vue'));
const MobileMenu = defineAsyncComponent(() => import('../components/layout/mobile-menu.vue'));
const KitchenMenu = defineAsyncComponent(() => import('../components/layout/KitchenMenu.vue'));
const LaundryMenu = defineAsyncComponent(() => import('../components/layout/LaundryMenu.vue'));
const ColdRoomMenu = defineAsyncComponent(() => import('../components/layout/ColdRoomMenu.vue'));
const PromotionalMenu = defineAsyncComponent(() => import('../components/layout/PromotionalMenu.vue'));

const isHomePage = computed(() => {
    return route.path === '/';
});

const isKitchenPage = computed(() => {
    return route.path.includes('/commercial-kitchen');
});

const isLaundryPage = computed(() => {
    return route.path.includes('/laundry');
});

const isColdRoomPage = computed(() => {
    return route.path.includes('/cold-storage');
});

const isPromotionalPage = computed(() => {
    return route.path.includes('/promotional');
});
</script>
