<template>
  <div :class="[$store.state.layout_style, $store.state.menu_style]">
    <!-- <component v-bind:is="layout"></component> -->
    <!-- :is="$route.meta.layout || 'div'" -->
    <component :is="layout" />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const layout = computed(() => {
    return store.getters.layout;
});
</script>
<script>
import publicLayout from './apps/frontend/layouts/app-layout.vue';
// admin layouts
import appLayout from './apps/admin/layouts/app-layout.vue';
import authLayout from './apps/admin/layouts/auth-layout.vue';

export default {
    components: {
        app: appLayout,
        auth: authLayout,
        frontend: publicLayout,
    },
};
</script>
