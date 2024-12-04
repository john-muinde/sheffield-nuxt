import { useHead } from '@vueuse/head';
import { unref, computed } from 'vue';

let siteTitle = 'Sheffield Steel Systems Ltd.';
let separator = '-';

// Define a default page title for use in your components
const defaultPageTitle = computed(() => `${siteTitle}`);

export const usePageTitle = (pageTitle) =>
  useHead(
    computed(() => ({
      title: `${unref(pageTitle)} ${separator} ${defaultPageTitle.value}`,
    })),
  );

export const useMeta = (data) => {
  /*return useHead({
    ...data,
    title: `${data.title} ${separator} ${siteTitle}`,
    meta: [
      { 
        name: 'description',
        content: `${data.description}`,
      },
      {
        name: 'keywords',
        content: `${data.keywords}`
      }
    ]
  })*/
};

export const useMetaKitchen = (data) => {
  //return useHead({ ...data, title: `${data.title} | Sheffield Steel Systems Limited Commercial Food Service Equipment and Solutions` });
};

export const useMetaLaundry = (data) => {
  //return useHead({ ...data, title: `${data.title} | Sheffield Steel Systems Limited Commercial Laundry & Floor Cleaning and Solutions` });
};

export const useMetaCold = (data) => {
  //return useHead({ ...data, title: `${data.title} | Sheffield Steel Systems Limited Commercial Cold Storage and Solutions` });
};
