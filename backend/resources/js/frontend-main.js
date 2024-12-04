import './bootstrap';
import { createApp, markRaw } from 'vue';

import App from './App.vue';
import router from './router/index';
import store from './store';

import { VueReCaptcha } from 'vue-recaptcha-v3';

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();

import v3gmaps from 'v3-gmaps';

import 'v3-gmaps/dist/style.css';

//Sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;

import VueSweetalert2 from 'vue-sweetalert2';
import useAuth from './composables/auth';
import vSelect from 'vue-select';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';

import VueLazyload from 'vue-lazyload';

//vue-i18n
import i18n from './i18n';

// set default settings
import appSetting from './app-setting';
window.$appSetting = appSetting;
window.$appSetting.init();

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// perfect scrollbar
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

const app = createApp(App);

//app.use(head)

app.use(v3gmaps, {
    key: 'AIzaSyAV5GPnyrFfMBtEF1jRuANU7z5_4pA7P2w',
    libraries: ['visualization'],
});

/*app.use(TawkMessengerVue, {
  propertyId : '65671f781db16644c555cfd1',
  widgetId : '1hgdd5rrn'
  });*/

// datatables
import {  ClientTable } from 'v-tables-3';
app.use(ClientTable, {}, 'bootstrap4', {
    genericFilter: markRaw({}),
});

import { setupRouterProgress } from './axiosInstance';
setupRouterProgress(router);

app.use(VueReCaptcha, { siteKey: '6Ldyw1wpAAAAAGx6vRq1hhnnfKaKHPmcuJ0imPkT' })
    .provide('useAuth', useAuth())
    .use(VueLazyload)
    .use(VueSweetalert2)
    .use(head)
    .component('v-select', vSelect)
    .use(PerfectScrollbarPlugin)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app');
