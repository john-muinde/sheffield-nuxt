import './bootstrap';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';

const app = createApp(App);

// bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

// modals
import './apps/admin/assets/sass/components/custom-modal.scss';

//scss
import './apps/admin/assets/sass/app.scss';

// perfect scrollbar
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();

//Sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;

import VueSweetalert2 from 'vue-sweetalert2';
app.use(VueSweetalert2);

import useAuth from './composables/auth';
app.provide('useAuth', useAuth());

// vue select
import vSelect from 'vue-select';
app.component('VSelect', vSelect);

// Multiselect
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
app.component('Multiselect', Multiselect);

//app.component('Pagination', LaravelVuePagination)

// nouislider - later remove and add to page due to not working in page
import VueNouislider from 'vue3-nouislider';
import 'vue3-nouislider/dist/vue3-nouislider.css';

// vue input mask
import Maska from 'maska';

// smooth scroll
import { registerScrollSpy } from 'vue3-scroll-spy/dist/index';
registerScrollSpy(app, { offset: 118 });

//vue-i18n
import i18n from './i18n';

// datatables
import {  ClientTable } from 'v-tables-3';
app.use(ClientTable, {}, 'bootstrap4', {
    genericFilter: markRaw({}),
});

// json to excel
import vue3JsonExcel from 'vue3-json-excel';

//vue-wizard
import VueFormWizard from 'vue3-form-wizard';
import 'vue3-form-wizard/dist/style.css';

// ant design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);

// set default settings
import appSetting from './app-setting';
window.$appSetting = appSetting;
window.$appSetting.init();

import showToast from './utils/notification';
window.showToast = showToast;

//markdown editor
import VueEasymde from 'vue3-easymde';
import 'easymde/dist/easymde.min.css';

import moment from 'moment';
window.moment = moment;

app.use(store)
    .use(router)
    .use(i18n)
    .use(PerfectScrollbarPlugin)
    .use(VueNouislider)
    .use(Maska)
    .use(vue3JsonExcel)
    .use(VueFormWizard)
    .use(head)
    .use(VueEasymde)
    .mount('#app');
