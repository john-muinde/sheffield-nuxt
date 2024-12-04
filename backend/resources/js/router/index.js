import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';
import store from '../store';

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.layout && to.meta.layout === 'auth') {
        store.commit('setLayout', 'auth');
    } else if (to.meta && to.meta.layout && to.meta.layout === 'frontend') {
        store.commit('setLayout', 'frontend');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;
