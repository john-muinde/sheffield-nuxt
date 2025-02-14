<template>
  <div class="widget widget-active-log widget-visitor-by-browser">
    <slot></slot>

    <div class="widget-content" :class="{ 'fixed inset-0 bg-white z-50': isFullscreen }">
      <!-- Controls Bar -->
      <div class=" flex justify-end gap-2 mb-4">
        <button class="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
          @click="resetView">
          <span class="mr-2">Reset View</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>
        <button class="inline-flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
          @click="toggleFullscreen">
          <span class="mr-2">{{
            isFullscreen ? "Exit Fullscreen" : "Fullscreen"
            }}</span>
          <svg v-if="!isFullscreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3h7v7H3z" />
            <path d="M14 3h7v7h-7z" />
            <path d="M14 14h7v7h-7z" />
            <path d="M3 14h7v7H3z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8V3h5" />
            <path d="M21 8V3h-5" />
            <path d="M3 16v5h5" />
            <path d="M21 16v5h-5" />
          </svg>
        </button>
      </div>

      <div class="flex gap-4" :class="{ 'h-screen p-4': isFullscreen }">
        <div :class="{ 'w-2/3': !isFullscreen, 'w-3/4': isFullscreen }">
          <div class="w-shadow-top"></div>
          <div :id="mapId" :style="{
            minHeight: isFullscreen ? 'calc(100vh - 80px)' : '400px',
            height: isFullscreen ? 'calc(100vh - 80px)' : '400px',
          }"></div>
        </div>

        <perfect-scrollbar :class="{ 'w-1/3': !isFullscreen, 'w-1/4': isFullscreen }" class="overflow-auto" :style="{
          maxHeight: isFullscreen ? 'calc(100vh - 80px)' : '400px',
        }" :options="{ suppressScrollX: true }">
          <div class="grid gap-2">
            <div v-for="country in sortedCountries" :key="country.code"
              class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
              @click="focusCountry(country.code)">
              <img :src="`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`" :alt="country.name"
                class="mr-2 w-6 h-4 object-cover rounded-sm" />
              <span class="flex-1">{{ country.name }}</span>
              <span class="font-semibold">{{ country.count }}</span>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue';
import { useStore } from 'vuex';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world-merc';
import 'jsvectormap/src/scss/jsvectormap.scss';
import { countries as countriesData } from 'countries-list';
import { getCountryCodeByName } from '@/utils';

const props = defineProps({
  visitors: {
    type: Array,
    default: () => [],
  },
});

const store = useStore();
const map = ref(null);
const mapId = `map-${Math.random().toString(36).substring(2, 9)}`;

const isFullscreen = ref(false);

const resetView = () => {
  if (map.value) {
    map.value.reset({
      animate: true,
    });
  }
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  // Reinitialize map after transition to ensure proper sizing
  nextTick(() => {
    initMap();
  });
};

// Handle ESC key for fullscreen exit
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen();
  }
};

const processedCountries = computed(() => {
  const processed = props.visitors.reduce((acc, visitor) => {
    let countryCode = visitor.location.split('-').pop().trim();
    let countryName = visitor.location.split('-').shift().trim();

    countryCode = countryCode.toUpperCase();

    if (!countriesData[countryCode]) {
      countryCode = getCountryCodeByName(countryName) || 'XX';
    }

    if (countryCode === 'XX') {
      countryCode = getCountryCodeByName(countryName.split(' ')[1]) || 'XX';
    }

    if (!acc[countryCode]) {
      acc[countryCode] = {
        code: countryCode,
        name: countryName,
        count: 0,
      };
    }
    acc[countryCode].count++;
    return acc;
  }, {});

  return processed;
});

const sortedCountries = computed(() => {
  return Object.values(processedCountries.value).sort(
    (a, b) => b.count - a.count,
  );
});

const mapData = computed(() => {
  const values = {};
  Object.entries(processedCountries.value).forEach(([code, data]) => {
    values[code] = data.count;
  });
  return values;
});

const focusCountry = (code) => {
  if (map.value) {
    // Set zoom level based on country size
    const largeCountries = ['RU', 'CN', 'US', 'CA', 'BR', 'AU'];
    const zoomLevel = largeCountries.includes(code) ? 5 : 8;

    map.value.setFocus({
      region: code,
      animate: true,
      scale: zoomLevel,
    });
  }
};

const destroyMap = () => {
  if (map.value) {
    try {
      const element = document.getElementById(mapId);
      if (element) {
        element.innerHTML = '';
      }
      map.value.destroy();
    } catch (error) {
      console.error('Error destroying map:', error);
    }
    map.value = null;
  }
};

const initMap = () => {
  if (!props.visitors.length) return;

  destroyMap();

  nextTick(() => {
    const mapElement = document.getElementById(mapId);
    if (!mapElement) return;

    const isDarkMode = store.state.is_dark_mode;
    const primaryColor = isDarkMode ? '#009688' : '#1b55e2';
    const secondaryColor = isDarkMode ? '#1b2e4b' : '#c2d5ff';

    try {
      map.value = new jsVectorMap({
        selector: `#${mapId}`,
        map: 'world_merc',
        backgroundColor: 'transparent',

        zoomMax: 12,
        zoomMin: 1,
        zoomStep: 1.2,
        zoomOnScroll: true,

        visualizeData: {
          scale: [secondaryColor, primaryColor],
          values: mapData.value,
        },

        regionStyle: {
          initial: {
            fill: isDarkMode ? '#1b2e4b' : '#e0e6ed',
            stroke: isDarkMode ? '#3b3f5c' : '#fff',
            strokeWidth: 0.5,
          },
          hover: {
            fill: primaryColor,
            cursor: 'pointer',
          },
        },

        onRegionClick(_, code) {
          focusCountry(code);
        },

        onRegionTooltipShow(event, tooltip, code) {
          const country = processedCountries.value[code];
          if (country) {
            tooltip.text(
              `
                            <div class="map-tooltip">
                                <strong>${country.name}</strong><br/>
                                ${country.count} visitor${country.count !== 1 ? 's' : ''
              }
                            </div>
                        `,
              true,
            );
          } else {
            tooltip.text(
              `
                            <div class="map-tooltip">
                                <strong>${countriesData[code]?.name || code
              }</strong><br/>
                                No visitors
                            </div>
                        `,
              true,
            );
          }

          tooltip._tooltip.style.zIndex = 9999;
        },
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  });
};

// Watch for theme changes
watch(
  () => store.state.is_dark_mode,
  () => {
    initMap();
  },
);

// Watch for visitor data changes
watch(
  () => props.visitors,
  () => {
    initMap();
  },
  { deep: true },
);

// Add event listener for ESC key
onMounted(() => {
  initMap();
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  destroyMap();
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.map-tooltip {
  background-color: var(--tooltip-bg, rgba(0, 0, 0, 0.8));
  color: var(--tooltip-color, white);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

:deep(.jvm-tooltip.active) {
  background-color: transparent;
  border: none;
  padding: 0;
  z-index: 9999 !important;
}

:deep(.jvm-container) {
  width: 100% !important;
}

:deep(.jvm-region) {
  transition: fill 0.2s ease;
}

/* Smooth transition for fullscreen mode */
.widget-content {
  transition: all 0.3s ease-in-out;
}
</style>
