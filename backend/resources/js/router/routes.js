import store from '../store';

function requireAdminLogin(to, from, next) {
  let isLogin = false;
  isLogin = !!store.state.auth.authenticated;

  if (isLogin) {
    next();
  } else {
    next('/admin/login');
  }
}

function requireLogin(to, from, next) {
  let isLogin = false;
  isLogin = !!store.state.auth.authenticated;

  if (isLogin) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  // FRONTEND ROUTES
  {
    path: '/',
    //beforeEnter: guest,

    children: [
      {
        path: '/login',
        name: 'frontend.login',
        component: () => import('../apps/frontend/views/Login.vue'),
        meta: {
          layout: 'frontend',
          title: 'Login to Sheffield',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/register',
        name: 'frontend.register',
        component: () => import('../apps/frontend/views/Register.vue'),
        meta: {
          layout: 'frontend',
          title: 'Register to Sheffield Africa Website',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/',
        name: 'frontend.home',
        component: () => import('../apps/frontend/views/Home.vue'),
        meta: {
          layout: 'frontend',
          title: 'Home',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/offers',
        name: 'frontend.offers',
        component: () =>
          import(/* webpackChunkName: "offers" */ '../apps/frontend/views/Landing.vue'),
        meta: {
          layout: 'frontend',
          title: 'Offers',
          metaTags: [
            {
              name: 'description',
              content: 'Here are our top offers offered at Sheffield Africa.',
            },
            {
              property: 'og:description',
              content: 'Here are our top offers at Sheffield Africa',
            },
          ],
        },
      },

      {
        path: '/about-us',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../apps/frontend/views/About.vue'),
        meta: {
          layout: 'frontend',
          title: 'About Us',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/who-we-are',
        name: 'who-we-are',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/WhoWeAre.vue'),
        meta: {
          layout: 'frontend',
          title: 'Who We Are',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/how-we-work',
        name: 'how-we-work',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/HowWeWork.vue'),
        meta: {
          layout: 'frontend',
          title: 'How We Work',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/company-culture',
        name: 'company-culture',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/CompanyCulture.vue'),
        meta: {
          layout: 'frontend',
          title: 'Company Culture',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/sheffield-advantage',
        name: 'sheffield-advantage',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/SheffieldAdvantage.vue'),
        meta: {
          layout: 'frontend',
          title: 'Sheffield Advantage',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/our-leadership',
        name: 'our-leadership',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/OurLeadership.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Leadership',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/about-us/our-location-and-facilities',
        name: 'our-location-facilities',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/OurLocationFacilities.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Our Location Facilities',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media',
        name: 'media',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Center.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/blogs',
        name: 'blogs',
        component: () => import(/* webpackChunkName: "index" */ '../apps/frontend/views/Blogs.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/blogs/page/:page',
        name: 'blogs.pagenation',
        component: () => import(/* webpackChunkName: "index" */ '../apps/frontend/views/Blogs.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/blogs/:id/:name',
        name: 'blogs.detail',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/BlogDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/videos',
        name: 'media-videos',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Videos.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/in-the-news',
        name: 'media-in-the-news',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_In_The_News.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/in-the-news/page/:page',
        name: 'media-in-the-news.pages',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_In_The_News.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/gallery',
        name: 'media-gallery',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Gallery.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/gallery/page/:page',
        name: 'blogs.gallery',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Gallery.vue'),
        meta: {
          layout: 'frontend',
          title: 'Our Gallery',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/gallery/:id/:name',
        name: 'gallery.detail',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/Media_Gallery_Details.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Our Gallery',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/brochures-and-catalogs',
        name: 'media-documents',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Documents.vue'),

        meta: {
          layout: 'frontend',
          title: 'Our Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/media/newsletters',
        name: 'media-newsletters',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Media_Newsletters.vue'),
        meta: {
          layout: 'frontend',
          title: 'Newsletters',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/faq',
        name: 'faq',
        component: () => import(/* webpackChunkName: "index" */ '../apps/frontend/views/FAQ.vue'),
        meta: {
          layout: 'frontend',
          title: 'FAQ',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/privacy-policy',
        name: 'Privacy Policy',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/PrivacyPolicy.vue'),
        meta: {
          layout: 'frontend',
          title: 'Privacy Policy',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/terms-and-conditions',
        name: 'Terms & Conditions',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/TermsAndConditions.vue'),
        meta: {
          layout: 'frontend',
          title: 'Terms & Conditions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/lease-and-finance',
        name: 'Lease & Finance',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/LeaseAndFinance.vue'),
        meta: {
          layout: 'frontend',
          title: 'Lease & Finance',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/customer-service',
        name: 'Customer Service',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/CustomerService.vue'),
        meta: {
          layout: 'frontend',
          title: 'Customer Service',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/cookie-policy',
        name: 'Cookie Policy',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/CookiePolicy.vue'),
        meta: {
          layout: 'frontend',
          title: 'Cookie Policy',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/warranty-terms',
        name: 'warranty_terms',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/WarrantyTerms.vue'),
        meta: {
          layout: 'frontend',
          title: 'Warranty Terms',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/deliveryinformation',
        name: 'deliveryinformation',
        component: () => import('../apps/frontend/views/DeliveryInformation.vue'),
        meta: {
          layout: 'frontend',
          title: 'Delivery Information',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/contact-us',
        name: 'contact',
        component: () => import('../apps/frontend/views/ContactUs.vue'),
        meta: {
          layout: 'frontend',
          title: 'Contact Us',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/careers',
        name: 'career',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Career.vue'),
        meta: {
          layout: 'frontend',
          title: 'Career',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/events',
        name: 'events',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Events.vue'),
        meta: {
          layout: 'frontend',
          title: 'Events',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/projects',
        name: 'projects',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Projects.vue'),
        meta: {
          layout: 'frontend',
          title: 'Projects',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/project/:id/:name',
        name: 'project.details',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProjectDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Project Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../apps/frontend/views/Cart.vue'),
        meta: {
          layout: 'frontend',
          title: 'Cart',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/request-for-quote',
        name: 'request_quote',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/RequestQuote.vue'),
        meta: {
          layout: 'frontend',
          title: 'Cart',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../apps/frontend/views/Checkout.vue'),
        meta: {
          layout: 'frontend',
          title: 'Checkout',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/consultancy-and-Design',
        name: 'Consultancy & Design',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Consultancy_Design.vue'),
        meta: {
          layout: 'frontend',
          title: 'Cart',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/category/:id/:name',
        name: 'frontend.category',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategory.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/category/:id/:name/page/:page',
        name: 'frontend.category.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategory.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/commercial-kitchen',
        name: 'frontend.kitchen.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Kitchen.vue'),
        meta: {
          layout: 'frontend',
          title: 'Kitchen',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/kitchen/solutions/:id/:name',
        name: 'frontend.solution_kitchen.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/KitchenSolution.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/kitchen/:id/:name',
        name: 'frontend.category.kitchen',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryKitchen.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/kitchen/:id/:name/page/:page',
        name: 'frontend.kitchen.page.pagenation',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryKitchen.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/kitchen/product/:id/:name',
        name: 'product.details.kitchen',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Product Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/laundry/product/:id/:name',
        name: 'product.details.laundry',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Laundry',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/laundry',
        name: 'frontend.laundry.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Laundry.vue'),
        meta: {
          layout: 'frontend',
          title: 'Laundry',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/laundry/solutions/:id/:name',
        name: 'frontend.solution_laundry.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/LaundrySolution.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/laundry/:id/:name',
        name: 'frontend.category.laundry',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryLaundry.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/laundry/:id/:name/page/:page',
        name: 'frontend.laundry.page.pagenation',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryLaundry.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/laundry/product/:id/:name',
        name: 'product.details.laundry',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Product Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      // promotional solutions

      {
        path: '/promotional-solutions',
        name: 'frontend.promotional-solutions.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Promotional.vue'),
        meta: {
          layout: 'frontend',
          title: 'Promotional Solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/promotional-solutions/solutions/:id/:name',
        name: 'frontend.solution_promotional.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/PromotionalSolutions.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/promotional-solutions/:id/:name',
        name: 'frontend.category.promotional',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryPromotional.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/promotional-solutions/:id/:name/page/:page',
        name: 'frontend.laundry.page.pagenation',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryPromotional.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/promotional-solutions/product/:id/:name',
        name: 'product.details.promotional-solutions',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Product Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/cold-storage',
        name: 'frontend.coldroom.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/Cold_Room.vue'),
        meta: {
          layout: 'frontend',
          title: 'Cold Room',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/cold-storage/solutions/:id/:name',
        name: 'frontend.solution_cold_storage.page',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ColdRoomSolution.vue'),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/cold-storage/:id/:name',
        name: 'frontend.category.cold_storage',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryColdRoom.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/cold-storage/:id/:name/page/:page',
        name: 'frontend.cold-storage.page.pagenation',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '../apps/frontend/views/ProductCategoryColdRoom.vue'
          ),
        meta: {
          layout: 'frontend',
          title: 'Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/cold-storage/product/:id/:name',
        name: 'product.details.cold_storage',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Product Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/product/:id/:name',
        name: 'product.details',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ProductDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Product Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/showroom/:id/:name',
        name: 'showroom.details',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/ShowroomDetails.vue'),
        meta: {
          layout: 'frontend',
          title: 'Showroom Details',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          // Transform the name parameter by replacing dashes with spaces
          const name = to.params.name.replace(/-/g, ' ');
          // Add the transformed name to the route's params object
          to.params.transformedName = name;
          next();
        },
      },

      {
        path: '/enquiry/product/:id',
        name: 'frontend.enquiry.product',
        component: () =>
          import(/* webpackChunkName: "index" */ '../apps/frontend/views/EnquiryProduct.vue'),
        meta: {
          layout: 'frontend',
          title: 'Enquiry Product',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/:pathMatch(.*)',
        name: 'admin.404',
        component: () => import(/* webpackChunkName: "index" */ '../apps/admin/views/404.vue'),
        beforeEnter: (to) => {
          const query = to.query;
          const notFoundQuery = query['404'];

          if (!notFoundQuery) {
            return { path: to.path, query: {404: true}, hash: to.hash };
          }
        },
        meta: {
          layout: 'app',
          title: '404',
          metaTags: [
            {
              name: 'description',
              content: 'The 404 page for the admin section.',
            },
            {
              property: 'og:description',
              content: 'The 404 page for the admin section.',
            },
          ],
        },
      },
      {
        path: '/:pathMatch(.*)',
        name: '404',
        beforeEnter: (to) => {
          const query = to.query;
          const notFoundQuery = query['404'];

          if (!notFoundQuery) {
            return { path: to.path, query: {404: true}, hash: to.hash };
          }
        },
        component: () => import('../apps/frontend/views/404.vue'),
        meta: {
          layout: 'frontend',
          title: '404',
          metaTags: [
            {
              name: 'description',
              content: 'The 404 page for the frontend section.',
            },
            {
              property: 'og:description',
              content: 'The 404 page for the frontend section.',
            },
          ],
        },
      },
    ],
  },

  {
    path: '/my-account',
    beforeEnter: requireLogin,

    children: [
      {
        path: '/my-account',
        name: 'frontend.myaccount',
        component: () => import('../apps/frontend/views/myaccount/MyAccount.vue'),
        meta: {
          layout: 'frontend',
          title: 'My Account',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
    ],
  },

  // BACKEND ROUTES
  //dashboard

  // import publicLayout from './apps/frontend/layouts/app-layout.vue';
  // // admin layouts
  // import appLayout from './apps/admin/layouts/app-layout.vue';
  // import authLayout from './apps/admin/layouts/auth-layout.vue';

  //auth
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () =>
      import(/* webpackChunkName: "auth-login" */ '../apps/admin/views/auth/login.vue'),
    meta: { layout: 'app' },
  },
  {
    path: '/admin/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "auth-register" */ '../apps/admin/views/auth/register.vue'),
    meta: { layout: 'app' },
  },
  {
    path: '/admin/lockscreen',
    name: 'lockscreen',
    component: () =>
      import(/* webpackChunkName: "auth-lockscreen" */ '../apps/admin/views/auth/lockscreen.vue'),
    meta: { layout: 'app' },
  },
  {
    path: '/admin/pass-recovery',
    name: 'pass-recovery',
    component: () =>
      import(
        /* webpackChunkName: "auth-pass-recovery" */ '../apps/admin/views/auth/pass_recovery.vue'
      ),
    meta: { layout: 'app' },
  },

  {
    path: '/admin',
    //redirect: { name: 'admin.login' },
    //component: ,
    beforeEnter: requireAdminLogin,
    children: [
      {
        path: '/admin',
        name: 'admin.dashboard',
        component: () =>
          import(/* webpackChunkName: "analytics" */ '../apps/admin/views/analytics.vue'),
        meta: {
          layout: 'app',
          title: 'Dashboard',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //start of actual pages

      //categories

      {
        path: '/admin/categories',
        name: 'categories.index',
        component: () => import('../apps/admin/views/categories/index.vue'),
        meta: {
          layout: 'app',
          title: 'Categories',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/categories/page/:page',
        name: 'categories.index.page.pagenation',
        component: () => import('../apps/admin/views/categories/index.vue'),
        meta: {
          layout: 'app',
          title: 'Categories',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/categories/create',
        name: 'categories.create',
        component: () => import('../apps/admin/views/categories/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/categories/edit/:id',
        name: 'categories.edit',
        component: () => import('../apps/admin/views/categories/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //products

      {
        path: '/admin/products',
        name: 'products.index',
        component: () => import('../apps/admin/views/products/index.vue'),
        meta: {
          layout: 'app',
          title: 'Products',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/products/page/:page',
        name: 'products.index.page.pagenation',
        component: () => import('../apps/admin/views/products/index.vue'),
        meta: {
          layout: 'app',
          title: 'Products',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/products/create',
        name: 'products.create',
        component: () => import('../apps/admin/views/products/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Product',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/products/edit/:id',
        name: 'products.edit',
        component: () => import('../apps/admin/views/products/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Product',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/brands',
        name: 'brands.index',
        component: () => import('../apps/admin/views/brands/index.vue'),
        meta: {
          layout: 'app',
          title: 'brands',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/brands/create',
        name: 'brands.create',
        component: () => import('../apps/admin/views/brands/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Brand',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/brands/edit/:id',
        name: 'brands.edit',
        component: () => import('../apps/admin/views/brands/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Brand',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //showrooms

      {
        path: '/admin/showrooms',
        name: 'showrooms.index',
        component: () => import('../apps/admin/views/showrooms/index.vue'),
        meta: {
          layout: 'app',
          title: 'showrooms',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/showrooms/create',
        name: 'showrooms.create',
        component: () => import('../apps/admin/views/showrooms/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Showroom',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/showrooms/edit/:id',
        name: 'showrooms.edit',
        component: () => import('../apps/admin/views/showrooms/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Showroom',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //csr

      {
        path: '/admin/csrs',
        name: 'csrs.index',
        component: () => import('../apps/admin/views/csrs/index.vue'),
        meta: {
          layout: 'app',
          title: 'csrs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/csrs/create',
        name: 'csrs.create',
        component: () => import('../apps/admin/views/csrs/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create CSRs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/csrs/edit/:id',
        name: 'csrs.edit',
        component: () => import('../apps/admin/views/csrs/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit CSRs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //blog categories

      {
        path: '/admin/blog_categories',
        name: 'blogCategories.index',
        component: () => import('../apps/admin/views/blog_categories/index.vue'),
        meta: {
          layout: 'app',
          title: 'Categories',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/blog_categories/create',
        name: 'blogCategories.create',
        component: () => import('../apps/admin/views/blog_categories/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Blog Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/blog_categories/edit/:id',
        name: 'blogCategories.edit',
        component: () => import('../apps/admin/views/blog_categories/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Blog Category',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //blogs

      {
        path: '/admin/blogs',
        name: 'blogs.index',
        component: () => import('../apps/admin/views/blogs/index.vue'),
        meta: {
          layout: 'app',
          title: 'blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/blogs/create',
        name: 'blogs.create',
        component: () => import('../apps/admin/views/blogs/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/blogs/edit/:id',
        name: 'blogs.edit',
        component: () => import('../apps/admin/views/blogs/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Blogs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //start publications

      {
        path: '/admin/publications',
        name: 'publications.index',
        component: () => import('../apps/admin/views/publications/index.vue'),
        meta: {
          layout: 'app',
          title: 'Publications',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/publications/create',
        name: 'publications.create',
        component: () => import('../apps/admin/views/publications/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Publications',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/publications/edit/:id',
        name: 'publications.edit',
        component: () => import('../apps/admin/views/publications/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Publications',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //end publications

      //start in the news

      {
        path: '/admin/in-the-news',
        name: 'news.index',
        component: () => import('../apps/admin/views/in_the_news/index.vue'),
        meta: {
          layout: 'app',
          title: 'In the News',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/in-the-news/create',
        name: 'news.create',
        component: () => import('../apps/admin/views/in_the_news/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create In the News',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/in-the-news/edit/:id',
        name: 'news.edit',
        component: () => import('../apps/admin/views/in_the_news/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit In the News',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      //end in the news

      //start vides

      {
        path: '/admin/videos',
        name: 'videos.index',
        component: () => import('../apps/admin/views/videos/index.vue'),
        meta: {
          layout: 'app',
          title: 'Videos',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/videos/create',
        name: 'videos.create',
        component: () => import('../apps/admin/views/videos/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Videos',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/videos/edit/:id',
        name: 'videos.edit',
        component: () => import('../apps/admin/views/videos/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Videos',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //end videos

      //start gallery

      {
        path: '/admin/gallery',
        name: 'gallery.index',
        component: () => import('../apps/admin/views/gallery/index.vue'),
        meta: {
          layout: 'app',
          title: 'Gallery',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/gallery/create',
        name: 'gallery.create',
        component: () => import('../apps/admin/views/gallery/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Gallery',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/gallery/edit/:id',
        name: 'galleries.edit',
        component: () => import('../apps/admin/views/gallery/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Gallery',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //end gallery

      //solutions

      {
        path: '/admin/solutions',
        name: 'solutions.index',
        component: () => import('../apps/admin/views/solutions/index.vue'),
        meta: {
          layout: 'app',
          title: 'solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/solutions/page/:page',
        name: 'solutions.index.page.pagenation',
        component: () => import('../apps/admin/views/solutions/index.vue'),
        meta: {
          layout: 'app',
          title: 'solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/solutions/category-sequence/:id',
        name: 'solutions.category.sequence',
        component: () => import('../apps/admin/views/solutions/category-sequence.vue'),
        meta: {
          layout: 'app',
          title: 'solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/solutions/category-sequence/:id/page/:page',
        name: 'solutions.category.sequence.page.pagenation',
        component: () => import('../apps/admin/views/solutions/category-sequence.vue'),
        meta: {
          layout: 'app',
          title: 'solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/solutions/create',
        name: 'solutions.create',
        component: () => import('../apps/admin/views/solutions/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/solutions/edit/:id',
        name: 'solutions.edit',
        component: () => import('../apps/admin/views/solutions/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Solutions',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //events

      {
        path: '/admin/events',
        name: 'events.index',
        component: () => import('../apps/admin/views/events/index.vue'),
        meta: {
          layout: 'app',
          title: 'events',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/events/create',
        name: 'events.create',
        component: () => import('../apps/admin/views/events/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create events',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/events/edit/:id',
        name: 'events.edit',
        component: () => import('../apps/admin/views/events/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit events',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //testimonials

      {
        path: '/admin/testimonials',
        name: 'testimonials.index',
        component: () => import('../apps/admin/views/testimonials/index.vue'),
        meta: {
          layout: 'app',
          title: 'testimonials',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/testimonials/create',
        name: 'testimonials.create',
        component: () => import('../apps/admin/views/testimonials/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create testimonials',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/testimonials/edit/:id',
        name: 'testimonials.edit',
        component: () => import('../apps/admin/views/testimonials/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit testimonials',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //careers

      {
        path: '/admin/careers',
        name: 'careers.index',
        component: () => import('../apps/admin/views/careers/index.vue'),
        meta: {
          layout: 'app',
          title: 'careers',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/careers/create',
        name: 'careers.create',
        component: () => import('../apps/admin/views/careers/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create careers',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/careers/edit/:id',
        name: 'careers.edit',
        component: () => import('../apps/admin/views/careers/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit careers',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //clients

      {
        path: '/admin/clients',
        name: 'clients.index',
        component: () => import('../apps/admin/views/clients/index.vue'),
        meta: {
          layout: 'app',
          title: 'clients',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/clients/create',
        name: 'clients.create',
        component: () => import('../apps/admin/views/clients/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Clients',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/clients/edit/:id',
        name: 'clients.edit',
        component: () => import('../apps/admin/views/clients/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Clients',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //projects

      //clients

      {
        path: '/admin/projects',
        name: 'projects.index',
        component: () => import('../apps/admin/views/projects/index.vue'),
        meta: {
          layout: 'app',
          title: 'projects',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/projects/create',
        name: 'projects.create',
        component: () => import('../apps/admin/views/projects/create.vue'),
        meta: {
          layout: 'app',
          title: 'Create Projects',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/projects/edit/:id',
        name: 'projects.edit',
        component: () => import('../apps/admin/views/projects/edit.vue'),
        meta: {
          layout: 'app',
          title: 'Edit Projects',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      //end of the actual pages

      {
        path: '/admin/analytics',
        name: 'analytics',
        component: () =>
          import(/* webpackChunkName: "analytics" */ '../apps/admin/views/index.vue'),
        meta: {
          layout: 'app',
          title: 'Dashboard',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },

      {
        path: '/admin/components/tabs',
        name: 'tabs',
        component: () =>
          import(
            /* webpackChunkName: "components-tabs" */ '../apps/admin/views/components/tabs.vue'
          ),
        meta: {
          layout: 'app',
          title: 'Tabs',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/components/accordions',
        name: 'accordions',
        component: () => import('../apps/admin/views/components/accordions.vue'),
        meta: {
          layout: 'app',
          title: 'Accordations',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
      {
        path: '/admin/components/modals',
        name: 'modals',
        component: () =>
          import(
            /* webpackChunkName: "components-modals" */ '../apps/admin/views/components/modals.vue'
          ),
        meta: {
          layout: 'app',
          title: 'Modals',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.',
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.',
            },
          ],
        },
      },
    ],
  },

  //components

  {
    path: '/admin/components/cards',
    name: 'cards',
    component: () =>
      import(/* webpackChunkName: "components-cards" */ '../apps/admin/views/components/cards.vue'),
  },
  {
    path: '/admin/components/carousel',
    name: 'admin.carousel',
    component: () =>
      import(
        /* webpackChunkName: "components-carousel" */ '../apps/admin/views/components/carousel.vue'
      ),
  },

  {
    path: '/admin/components/timeline',
    name: 'timeline',
    component: () =>
      import(
        /* webpackChunkName: "components-timeline" */ '../apps/admin/views/components/timeline.vue'
      ),
  },
  {
    path: '/admin/components/media-object',
    name: 'media-object',
    component: () =>
      import(
        /* webpackChunkName: "components-media-object" */ '../apps/admin/views/components/media_object.vue'
      ),
  },
  {
    path: '/admin/components/list-group',
    name: 'list-group',
    component: () =>
      import(
        /* webpackChunkName: "components-list-group" */ '../apps/admin/views/components/list_group.vue'
      ),
  },
  {
    path: '/admin/components/pricing-table',
    name: 'pricing-table',
    component: () =>
      import(
        /* webpackChunkName: "components-pricing-table" */ '../apps/admin/views/components/pricing_table.vue'
      ),
  },
  {
    path: '/admin/components/notifications',
    name: 'notifications',
    component: () =>
      import(
        /* webpackChunkName: "components-notifications" */ '../apps/admin/views/components/toast.vue'
      ),
  },

  {
    path: '/admin/components/lightbox',
    name: 'lightbox',
    component: () =>
      import(
        /* webpackChunkName: "components-lightbox" */ '../apps/admin/views/components/lightbox.vue'
      ),
  },
  {
    path: '/admin/components/countdown',
    name: 'countdown',
    component: () =>
      import(
        /* webpackChunkName: "components-countdown" */ '../apps/admin/views/components/countdown.vue'
      ),
  },
  {
    path: '/admin/components/counter',
    name: 'counter',
    component: () =>
      import(
        /* webpackChunkName: "components-counter" */ '../apps/admin/views/components/counter.vue'
      ),
  },
  {
    path: '/admin/components/sweetalert',
    name: 'sweetalert',
    component: () =>
      import(
        /* webpackChunkName: "components-sweetalert" */ '../apps/admin/views/components/sweetalert.vue'
      ),
  },

  //fonts
  {
    path: '/admin/font-icons',
    name: 'font-icons',
    component: () =>
      import(/* webpackChunkName: "font-icons" */ '../apps/admin/views/font_icons.vue'),
  },

  //pages
  {
    path: '/admin/pages/helpdesk',
    name: 'helpdesk',
    component: () =>
      import(/* webpackChunkName: "pages-helpdesk" */ '../apps/admin/views/pages/helpdesk.vue'),
  },
  {
    path: '/admin/pages/contact-us',
    name: 'contact-us',
    component: () =>
      import(/* webpackChunkName: "pages-contact-us" */ '../apps/admin/views/pages/contact_us.vue'),
  },
  {
    path: '/admin/pages/faq',
    name: 'faq1',
    component: () =>
      import(/* webpackChunkName: "pages-faq" */ '../apps/admin/views/pages/faq.vue'),
  },
  {
    path: '/admin/pages/faq2',
    name: 'faq2',
    component: () =>
      import(/* webpackChunkName: "pages-faq2" */ '../apps/admin/views/pages/faq2.vue'),
  },
  {
    path: '/admin/pages/privacy-policy',
    name: 'admin-privacy-policy',
    component: () =>
      import(
        /* webpackChunkName: "pages-privacy-policy" */ '../apps/admin/views/pages/privacy_policy.vue'
      ),
  },
  {
    path: '/admin/pages/coming-soon',
    name: 'coming-soon',
    component: () =>
      import(
        /* webpackChunkName: "pages-coming-soon" */ '../apps/admin/views/pages/coming_soon.vue'
      ),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/pages/error404',
    name: 'error404',
    component: () =>
      import(/* webpackChunkName: "pages-error404" */ '../apps/admin/views/pages/error404.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/pages/error500',
    name: 'error500',
    component: () =>
      import(/* webpackChunkName: "pages-error500" */ '../apps/admin/views/pages/error500.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/pages/error503',
    name: 'error503',
    component: () =>
      import(/* webpackChunkName: "pages-error503" */ '../apps/admin/views/pages/error503.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/pages/maintenence',
    name: 'maintenence',
    component: () =>
      import(
        /* webpackChunkName: "pages-maintenence" */ '../apps/admin/views/pages/maintenence.vue'
      ),
    meta: { layout: 'auth' },
  },
  {
    path: '/admin/pages/blank-page',
    name: 'blank-page',
    component: () =>
      import(/* webpackChunkName: "pages-blank-page" */ '../apps/admin/views/pages/blank_page.vue'),
  },
  {
    path: '/admin/pages/sample',
    name: 'sample',
    component: () =>
      import(/* webpackChunkName: "pages-sample" */ '../apps/admin/views/pages/sample.vue'),
  },

  //elements
  {
    path: '/admin/elements/alerts',
    name: 'alerts',
    component: () =>
      import(/* webpackChunkName: "elements-alerts" */ '../apps/admin/views/elements/alerts.vue'),
  },
  {
    path: '/admin/elements/avatar',
    name: 'avatar',
    component: () =>
      import(/* webpackChunkName: "elements-avatar" */ '../apps/admin/views/elements/avatar.vue'),
  },
  {
    path: '/admin/elements/badges',
    name: 'badges',
    component: () =>
      import(/* webpackChunkName: "elements-badges" */ '../apps/admin/views/elements/badges.vue'),
  },
  {
    path: '/admin/elements/breadcrumbs',
    name: 'breadcrumbs',
    component: () =>
      import(
        /* webpackChunkName: "elements-breadcrumbs" */ '../apps/admin/views/elements/breadcrumbs.vue'
      ),
  },
  {
    path: '/admin/elements/buttons',
    name: 'buttons',
    component: () =>
      import(/* webpackChunkName: "elements-buttons" */ '../apps/admin/views/elements/buttons.vue'),
  },
  {
    path: '/admin/elements/buttons-group',
    name: 'buttons-group',
    component: () =>
      import(
        /* webpackChunkName: "elements-buttons-group" */ '../apps/admin/views/elements/buttons_group.vue'
      ),
  },
  {
    path: '/admin/elements/color-library',
    name: 'color-library',
    component: () =>
      import(
        /* webpackChunkName: "elements-color-library" */ '../apps/admin/views/elements/color_library.vue'
      ),
  },
  {
    path: '/admin/elements/dropdown',
    name: 'dropdown',
    component: () =>
      import(
        /* webpackChunkName: "elements-dropdown" */ '../apps/admin/views/elements/dropdown.vue'
      ),
  },
  {
    path: '/admin/elements/infobox',
    name: 'infobox',
    component: () =>
      import(/* webpackChunkName: "elements-infobox" */ '../apps/admin/views/elements/infobox.vue'),
  },
  {
    path: '/admin/elements/jumbotron',
    name: 'jumbotron',
    component: () =>
      import(
        /* webpackChunkName: "elements-jumbotron" */ '../apps/admin/views/elements/jumbotron.vue'
      ),
  },
  {
    path: '/admin/elements/loader',
    name: 'loader',
    component: () =>
      import(/* webpackChunkName: "elements-loader" */ '../apps/admin/views/elements/loader.vue'),
  },
  {
    path: '/admin/elements/pagination',
    name: 'pagination',
    component: () =>
      import(
        /* webpackChunkName: "elements-pagination" */ '../apps/admin/views/elements/pagination.vue'
      ),
  },
  {
    path: '/admin/elements/popovers',
    name: 'popovers',
    component: () =>
      import(
        /* webpackChunkName: "elements-popovers" */ '../apps/admin/views/elements/popovers.vue'
      ),
  },
  {
    path: '/admin/elements/progress-bar',
    name: 'progress-bar',
    component: () =>
      import(
        /* webpackChunkName: "elements-progress-bar" */ '../apps/admin/views/elements/progress_bar.vue'
      ),
  },
  {
    path: '/admin/elements/search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "elements-search" */ '../apps/admin/views/elements/search.vue'),
  },
  {
    path: '/admin/elements/tooltips',
    name: 'tooltips',
    component: () =>
      import(
        /* webpackChunkName: "elements-tooltips" */ '../apps/admin/views/elements/tooltips.vue'
      ),
  },
  {
    path: '/admin/elements/treeview',
    name: 'treeview',
    component: () =>
      import(
        /* webpackChunkName: "elements-treeview" */ '../apps/admin/views/elements/treeview.vue'
      ),
  },
  {
    path: '/admin/elements/typography',
    name: 'typography',
    component: () =>
      import(
        /* webpackChunkName: "elements-typography" */ '../apps/admin/views/elements/typography.vue'
      ),
  },

  //tables
  {
    path: '/admin/tables',
    name: 'tables',
    component: () => import(/* webpackChunkName: "tables" */ '../apps/admin/views/tables.vue'),
  },

  //users
  {
    path: '/admin/users/create_users',
    name: 'users.create',
    component: () =>
      import(/* webpackChunkName: "users-profile" */ '../apps/admin/views/users/create_users.vue'),
  },

  {
    path: '/admin/users/edit/:id',
    name: 'users.edit',
    component: () =>
      import(/* webpackChunkName: "users-profile" */ '../apps/admin/views/users/edit.vue'),
  },
  {
    path: '/admin/users/view_users',
    name: 'users.index',
    component: () =>
      import(/* webpackChunkName: "users-profile" */ '../apps/admin/views/users/index.vue'),
  },
  {
    path: '/admin/users/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "users-profile" */ '../apps/admin/views/users/profile.vue'),
  },
  {
    path: '/admin/users/account-setting',
    name: 'account-setting',
    component: () =>
      import(
        /* webpackChunkName: "users-account-setting" */ '../apps/admin/views/users/account_setting.vue'
      ),
  },

  //seo
  {
    path: '/admin/seo/create_seo',
    name: 'create-seo',
    component: () =>
      import(/* webpackChunkName: "create-seo" */ '../apps/admin/views/seo/create_seo.vue'),
  },
  {
    path: '/admin/seo/view_seo',
    name: 'view-seo',
    component: () =>
      import(/* webpackChunkName: "view-seo" */ '../apps/admin/views/seo/view_seo.vue'),
  },
  {
    path: '/admin/seo/edit/:id',
    name: 'edit-seo',
    component: () => import(/* webpackChunkName: "edit-seo" */ '../apps/admin/views/seo/edit.vue'),
  },

  //drag&drop
  {
    path: '/admin/dragndrop',
    name: 'dragndrop',
    component: () =>
      import(/* webpackChunkName: "dragndrop" */ '../apps/admin/views/dragndrop.vue'),
  },

  //charts
  {
    path: '/admin/charts/apex-chart',
    name: 'apex-chart',
    component: () =>
      import(
        /* webpackChunkName: "charts-apex-chart" */ '../apps/admin/views/charts/apex_chart.vue'
      ),
  },

  //widgets
  {
    path: '/admin/widgets',
    name: 'widgets',
    component: () => import(/* webpackChunkName: "widgets" */ '../apps/admin/views/widgets.vue'),
  },

  //forms
  {
    path: '/admin/forms/basic',
    name: 'basic',
    component: () =>
      import(/* webpackChunkName: "forms-basic" */ '../apps/admin/views/forms/basic.vue'),
  },
  {
    path: '/admin/forms/input-group',
    name: 'input-group',
    component: () =>
      import(
        /* webpackChunkName: "forms-input-group" */ '../apps/admin/views/forms/input_group.vue'
      ),
  },
  {
    path: '/admin/forms/layouts',
    name: 'layouts',
    component: () =>
      import(/* webpackChunkName: "forms-layouts" */ '../apps/admin/views/forms/layouts.vue'),
  },
  {
    path: '/admin/forms/validation',
    name: 'validation',
    component: () =>
      import(/* webpackChunkName: "forms-validation" */ '../apps/admin/views/forms/validation.vue'),
  },
  {
    path: '/admin/forms/checkbox-radio',
    name: 'checkbox-radio',
    component: () =>
      import(
        /* webpackChunkName: "forms-checkbox-radio" */ '../apps/admin/views/forms/checkbox_radio.vue'
      ),
  },
  {
    path: '/admin/forms/switches',
    name: 'switches',
    component: () =>
      import(/* webpackChunkName: "forms-switches" */ '../apps/admin/views/forms/switches.vue'),
  },
  {
    path: '/admin/forms/wizards',
    name: 'wizards',
    component: () =>
      import(/* webpackChunkName: "forms-wizards" */ '../apps/admin/views/forms/wizards.vue'),
  },
  {
    path: '/admin/forms/file-upload',
    name: 'file-upload',
    component: () =>
      import(
        /* webpackChunkName: "forms-file-upload" */ '../apps/admin/views/forms/fileupload.vue'
      ),
  },
  {
    path: '/admin/forms/clipboard',
    name: 'clipboard',
    component: () =>
      import(/* webpackChunkName: "forms-clipboard" */ '../apps/admin/views/forms/clipboard.vue'),
  },
  {
    path: '/admin/forms/date-picker',
    name: 'date-picker',
    component: () =>
      import(
        /* webpackChunkName: "forms-date-picker" */ '../apps/admin/views/forms/date_range_picker.vue'
      ),
  },
  {
    path: '/admin/forms/input-mask',
    name: 'input-mask',
    component: () =>
      import(/* webpackChunkName: "forms-input-mask" */ '../apps/admin/views/forms/input_mask.vue'),
  },
  {
    path: '/admin/forms/quill-editor',
    name: 'quill-editor',
    component: () =>
      import(
        /* webpackChunkName: "forms-quill-editor" */ '../apps/admin/views/forms/quill_editor.vue'
      ),
  },
  {
    path: '/admin/forms/touchspin',
    name: 'touchspin',
    component: () =>
      import(/* webpackChunkName: "forms-touchspin" */ '../apps/admin/views/forms/touchspin.vue'),
  },
  {
    path: '/admin/forms/markdown-editor',
    name: 'markdown-editor',
    component: () =>
      import(
        /* webpackChunkName: "forms-markdown-editor" */ '../apps/admin/views/forms/markdown_editor.vue'
      ),
  },
  {
    path: '/admin/forms/select2',
    name: 'select2',
    component: () =>
      import(/* webpackChunkName: "forms-select2" */ '../apps/admin/views/forms/select2.vue'),
  },

  //apps
  {
    path: '/admin/apps/chat',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "apps-chat" */ '../apps/admin/views/apps/chat.vue'),
  },
  {
    path: '/admin/apps/mailbox',
    name: 'mailbox',
    component: () =>
      import(/* webpackChunkName: "apps-mailbox" */ '../apps/admin/views/apps/mailbox.vue'),
  },
  {
    path: '/admin/apps/todo-list',
    name: 'todo-list',
    component: () =>
      import(/* webpackChunkName: "apps-todo-list" */ '../apps/admin/views/apps/todo_list.vue'),
  },
  {
    path: '/admin/apps/contacts',
    name: 'contacts',
    component: () =>
      import(/* webpackChunkName: "apps-contacts" */ '../apps/admin/views/apps/contacts.vue'),
  },
  {
    path: '/admin/apps/notes',
    name: 'notes',
    component: () =>
      import(/* webpackChunkName: "apps-notes" */ '../apps/admin/views/apps/notes.vue'),
  },
  {
    path: '/admin/apps/scrumboard',
    name: 'scrumboard',
    component: () =>
      import(/* webpackChunkName: "apps-scrumboard" */ '../apps/admin/views/apps/scrumboard.vue'),
  },
  {
    path: '/admin/apps/calendar',
    name: 'calendar',
    component: () =>
      import(/* webpackChunkName: "apps-calendar" */ '../apps/admin/views/apps/calendar.vue'),
  },
  {
    path: '/admin/apps/invoice/list',
    name: 'invoice-list',
    component: () =>
      import(
        /* webpackChunkName: "apps-invoice-list" */ '../apps/admin/views/apps/invoice/list.vue'
      ),
  },
  {
    path: '/admin/apps/invoice/preview',
    name: 'invoice-preview',
    component: () =>
      import(
        /* webpackChunkName: "apps-invoice-preview" */ '../apps/admin/views/apps/invoice/preview.vue'
      ),
  },
  {
    path: '/admin/apps/invoice/add',
    name: 'invoice-add',
    component: () =>
      import(/* webpackChunkName: "apps-invoice-add" */ '../apps/admin/views/apps/invoice/add.vue'),
  },
  {
    path: '/admin/apps/invoice/edit',
    name: 'invoice-edit',
    component: () =>
      import(
        /* webpackChunkName: "apps-invoice-edit" */ '../apps/admin/views/apps/invoice/edit.vue'
      ),
  },

  //v3-table
  {
    path: '/admin/tables/v3-table/basic',
    name: 'table-v3-table-basic',
    component: () =>
      import(
        /* webpackChunkName: "tables-basic" */ '../apps/admin/views/tables/v3-table/basic.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/striped',
    name: 'v3-table-striped',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-striped" */ '../apps/admin/views/tables/v3-table/striped.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/order-sorting',
    name: 'v3-table-order-sorting',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-order-sorting" */ '../apps/admin/views/tables/v3-table/order_sorting.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/multi-column',
    name: 'v3-table-multi-column',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-multi-column" */ '../apps/admin/views/tables/v3-table/multi_column.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/multiple-tables',
    name: 'v3-table-multiple-tables',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-multiple-tables" */ '../apps/admin/views/tables/v3-table/multiple_tables.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/alt-pagination',
    name: 'v3-table-alt-pagination',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-alt-pagination" */ '../apps/admin/views/tables/v3-table/alt_pagination.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/custom',
    name: 'v3-table-custom',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-custom" */ '../apps/admin/views/tables/v3-table/custom.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/range-search',
    name: 'v3-table-range-search',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-range-search" */ '../apps/admin/views/tables/v3-table/range_search.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/export',
    name: 'v3-table-export',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-export" */ '../apps/admin/views/tables/v3-table/export.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/live-dom-ordering',
    name: 'v3-table-live-dom-ordering',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-live-dom-ordering" */ '../apps/admin/views/tables/v3-table/live_dom_ordering.vue'
      ),
  },
  {
    path: '/admin/tables/v3-table/miscellaneous',
    name: 'v3-table-miscellaneous',
    component: () =>
      import(
        /* webpackChunkName: "tables-v3-table-miscellaneous" */ '../apps/admin/views/tables/v3-table/miscellaneous.vue'
      ),
  },
  //vue3-datatable
  {
    path: '/admin/tables/vue3-datatable/basic',
    name: 'table-vue3-datatable-basic',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-basic" */ '../apps/admin/views/tables/vue3-datatable/basic.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/order-sorting',
    name: 'vue3-datatable-order-sorting',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-order-sorting" */ '../apps/admin/views/tables/vue3-datatable/order_sorting.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/alt-pagination',
    name: 'vue3-datatable-alt-pagination',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-alt-pagination" */ '../apps/admin/views/tables/vue3-datatable/alt_pagination.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/search',
    name: 'vue3-datatable-search',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-search" */ '../apps/admin/views/tables/vue3-datatable/search.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/checkbox',
    name: 'vue3-datatable-checkbox',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-checkbox" */ '../apps/admin/views/tables/vue3-datatable/checkbox.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/slot',
    name: 'vue3-datatable-slot',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-slot" */ '../apps/admin/views/tables/vue3-datatable/slot.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/column-filter',
    name: 'vue3-datatable-column-filter',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-column-filter" */ '../apps/admin/views/tables/vue3-datatable/column-filter.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/actions',
    name: 'vue3-datatable-actions',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-actions" */ '../apps/admin/views/tables/vue3-datatable/actions.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/sticky-header',
    name: 'vue3-datatable-sticky-header',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-sticky-header" */ '../apps/admin/views/tables/vue3-datatable/sticky-header.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/column-chooser',
    name: 'vue3-datatable-column-chooser',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-column-chooser" */ '../apps/admin/views/tables/vue3-datatable/column-chooser.vue'
      ),
  },
  {
    path: '/admin/tables/vue3-datatable/advance',
    name: 'vue3-datatable-advance',
    component: () =>
      import(
        /* webpackChunkName: "tables-vue3-datatable-advance" */ '../apps/admin/views/tables/vue3-datatable/advance.vue'
      ),
  },
];

export default routes;
