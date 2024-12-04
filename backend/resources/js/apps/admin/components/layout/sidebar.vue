<template>
  <div
    v-show="store.state.is_show_sidebar"
    id="sidebar-parent"
    class="bg-gray-800 text-white h-full mt-28 fixed top-0 left-2 mr-6 w-56"
    style="z-index: 1035"
  >
    <nav
      id="sidebar"
      class="overflow-y-auto"
      style="height: 82vh !important; scrollbar-width: none; overflow-x: hidden; z-index: 1035"
    >
      <perfect-scrollbar class="menu-categories mb-4" tag="div">
        <div v-for="(item, index) in menuItems" :key="index" class="menu">
          <div
            class="cursor-pointer flex items-center justify-between p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
            @click="toggleSubmenu(item.id)"
          >
            <div class="flex items-center">
              <component :is="item.icon" class="w-4 h-4 mr-2" />
              <span>{{ $t(item.title.toLocaleLowerCase()) }}</span>
            </div>
            <component :is="isSubmenuOpen(item.id) ? ChevronDownIcon : ChevronRightIcon" class="w-4 h-4" />
          </div>

          <div v-show="isSubmenuOpen(item.id)" class="submenu pl-4 bg-gray-700">
            <div v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
              <router-link
                :to="subItem.route"
                class="block px-6 py-2 text-gray-300 hover:bg-gray-600 hover:text-white transition duration-150"
                @click="toggleMobileMenu"
              >
                {{ $t(subItem.title.toLocaleLowerCase()) }}
              </router-link>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {
    CakeIcon,
    PresentationChartBarIcon,
    ChevronRightIcon,
    UserGroupIcon,
    FilmIcon,
    GlobeAltIcon,
    ChartBarSquareIcon,
    HomeModernIcon,
    PhotoIcon,
    NewspaperIcon,
    CalendarDateRangeIcon,
    DocumentDuplicateIcon,
    AtSymbolIcon,
    AcademicCapIcon,
    BanknotesIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/outline';

const store = useStore();
const route = useRoute();

const menuItems = ref([
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: PresentationChartBarIcon,
        subItems: [
            { title: 'Analytics', route: '/admin' },
            // { title: 'Analytics', route: '/admin/analytics' },
        ],
    },
    {
        id: 'products',
        title: 'Products',
        icon: CakeIcon,
        subItems: [
            { title: 'Create Product', route: '/admin/products/create' },
            { title: 'View Products', route: '/admin/products' },
        ],
    },
    {
        id: 'events',
        title: 'Events and Expo',
        icon: CalendarDateRangeIcon,
        subItems: [
            { title: 'New Event', route: '/admin/events/create' },
            { title: 'View Events', route: '/admin/events' },
        ],
    },
    {
        id: 'solutions',
        title: 'Solutions',
        icon: PresentationChartBarIcon,
        subItems: [
            { title: 'New Solution', route: '/admin/solutions/create' },
            { title: 'View Solutions', route: '/admin/solutions' },
        ],
    },
    {
        id: 'categories',
        title: 'Categories',
        icon: DocumentDuplicateIcon,
        subItems: [
            { title: 'Create Category', route: '/admin/categories/create' },
            { title: 'View Categories', route: '/admin/categories' },
        ],
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: CalendarDateRangeIcon,
        subItems: [
            { title: 'Create Project', route: '/admin/projects/create' },
            { title: 'View Projects', route: '/admin/projects' },
        ],
    },
    {
        id: 'clients',
        title: 'Clients',
        icon: UserGroupIcon,
        subItems: [
            { title: 'Create Client', route: '/admin/clients/create' },
            { title: 'View Clients', route: '/admin/clients' },
        ],
    },
    {
        id: 'blogs',
        title: 'Blogs',
        icon: NewspaperIcon,
        subItems: [
            {
                title: 'Create Blog Category',
                route: '/admin/blog_categories/create',
            },
            { title: 'View Blog Categories', route: '/admin/blog_categories' },
            { title: 'Create Blogs', route: '/admin/blogs/create' },
            { title: 'View Blogs', route: '/admin/blogs' },
        ],
    },
    {
        id: 'publications',
        title: 'Publications',
        icon: NewspaperIcon,
        subItems: [
            {
                title: 'Create Publications',
                route: '/admin/publications/create',
            },
            { title: 'View Publications', route: '/admin/publications' },
        ],
    },
    {
        id: 'news',
        title: 'News',
        icon: GlobeAltIcon,
        subItems: [
            { title: 'Create News', route: '/admin/in-the-news/create' },
            { title: 'View News', route: '/admin/in-the-news' },
        ],
    },
    {
        id: 'videos',
        title: 'Videos',
        icon: FilmIcon,
        subItems: [
            { title: 'Upload Video', route: '/admin/videos/create' },
            { title: 'View Videos', route: '/admin/videos' },
        ],
    },
    {
        id: 'gallery',
        title: 'Gallery',
        icon: PhotoIcon,
        subItems: [
            { title: 'Upload Images', route: '/admin/gallery/create' },
            { title: 'View Gallery', route: '/admin/gallery' },
        ],
    },
    {
        id: 'brands',
        title: 'Brands',
        icon: AtSymbolIcon,
        subItems: [
            { title: 'Add Brand', route: '/admin/brands/create' },
            { title: 'View Brands', route: '/admin/brands' },
        ],
    },
    {
        id: 'showrooms',
        title: 'Showrooms',
        icon: HomeModernIcon,
        subItems: [
            { title: 'Add Showroom', route: '/admin/showrooms/create' },
            { title: 'View Showrooms', route: '/admin/showrooms' },
        ],
    },
    {
        id: 'csr',
        title: 'CSR',
        icon: BanknotesIcon,
        subItems: [
            { title: 'Create CSR', route: '/admin/csrs/create' },
            { title: 'View CSRS', route: '/admin/csrs' },
        ],
    },
    {
        id: 'testimonials',
        title: 'Testimonials',
        icon: ChartBarSquareIcon,
        subItems: [
            { title: 'Add Testimonial', route: '/admin/testimonials/create' },
            { title: 'View Testimonials', route: '/admin/testimonials' },
        ],
    },
    {
        id: 'careers',
        title: 'Careers',
        icon: AcademicCapIcon,
        subItems: [
            { title: 'Post Job', route: '/admin/careers/create' },
            { title: 'View Careers', route: '/admin/careers' },
        ],
    },
    {
        id: 'users',
        title: 'Users',
        icon: UserGroupIcon,
        subItems: [
            { title: 'Add User', route: '/admin/users/create_users' },
            { title: 'View Users', route: '/admin/users/view_users' },
        ],
    },
    {
        id: 'seo',
        title: 'SEO',
        icon: GlobeAltIcon,
        subItems: [
            { title: 'Manage SEO Settings', route: '/admin/seo/create_seo' },
            { title: 'View SEO Reports', route: '/admin/seo/view_seo' },
        ],
    },
]);

const openSubmenus = ref(new Set());

const toggleSubmenu = (id) => {
    if (openSubmenus.value.has(id)) {
        openSubmenus.value.delete(id);
    } else {
        openSubmenus.value.clear();
        openSubmenus.value.add(id);
    }
};

const isSubmenuOpen = (id) => {
    return openSubmenus.value.has(id);
};

const toggleMobileMenu = () => {
    if (window.innerWidth < 991) {
        store.commit('toggleSideBar', !store.state.is_show_sidebar);
    }
};

// Watch for route changes and keep the parent menu open if the route is in any of the parent menus
watch(route, (newRoute) => {
    menuItems.value.forEach((item) => {
        item.subItems.forEach((subItem) => {
            if (subItem.route === newRoute.path) {
                openSubmenus.value.add(item.id);
            }
        });
    });
});

onMounted(() => {
    // Initialize the open submenus based on the current route
    menuItems.value.forEach((item) => {
        item.subItems.forEach((subItem) => {
            if (subItem.route === route.path) {
                openSubmenus.value.add(item.id);
            }
        });
    });
});
</script>
