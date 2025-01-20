<template key>
  <TransitionRoot appear :show="true">
    <div
      id="content-state"
      class="w-full min-h-[400px] flex flex-col items-center justify-center p-6"
    >
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="text-center max-w-md mx-auto">
          <!-- Loading State -->
          <div
            v-if="type === 'loading'"
            class="animate-in fade-in duration-500"
          >
            <div class="relative mx-auto w-24 h-24 mb-6">
              <slot name="loading-icon">
                <!-- Default loading animation -->
                <div
                  class="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin"
                ></div>
                <div
                  class="absolute inset-3 rounded-full bg-primary-50 animate-pulse"
                ></div>
                <div
                  class="absolute inset-[14px] rounded-full bg-primary-500"
                ></div>
              </slot>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ loadingMessage || `Loading ${contentType}...` }}
            </h3>
            <p class="text-gray-500">
              {{
                loadingSubMessage ||
                `Please wait while we fetch the ${contentType}`
              }}
            </p>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="type === 'empty'"
            class="animate-in fade-in duration-500"
          >
            <div class="relative mx-auto w-24 h-24 mb-6">
              <slot name="empty-icon">
                <!-- Default empty state icon -->
                <div class="empty-state-animation">
                  <svg
                    class="w-full h-full text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="contentIllustrations[contentType]"
                      :d="contentIllustrations[contentType]"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      v-else
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                </div>
              </slot>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{
                searchTerm
                  ? `No ${contentType} found for "${searchTerm}"`
                  : emptyMessage || `No ${contentType} found`
              }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{
                searchTerm
                  ? "Try adjusting your search terms"
                  : emptySubMessage ||
                    `${capitalize(contentType)} will appear here once added`
              }}
            </p>
            <div class="flex flex-wrap justify-center gap-3">
              <button
                v-if="searchTerm"
                class="btn-primary"
                @click="$emit('clear-search')"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear search
              </button>
              <slot name="empty-actions"></slot>
            </div>
            <div class="flex flex-wrap justify-center gap-3">
              <button class="btn-error" @click="$emit('retry')">
                <svg
                  class="w-8 h-8 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try again
              </button>
              <slot name="error-actions">
                <button class="btn-secondary" @click="$emit('clear-filters')">
                  <svg
                    class="w-8 h-8 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l18 0"
                    />
                  </svg>
                  Clear filters
                </button>
              </slot>
            </div>
          </div>

          <!-- Error State -->
          <div
            v-else-if="type === 'error'"
            class="animate-in fade-in duration-500"
          >
            <div class="relative mx-auto w-24 h-24 mb-6">
              <slot name="error-icon">
                <!-- Default error animation -->
                <div
                  class="absolute inset-0 rounded-full bg-red-100 animate-pulse"
                ></div>
                <svg
                  class="absolute inset-0 w-full h-full text-red-500 transform -rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </slot>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ errorMessage || `Error loading ${contentType}` }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{
                errorSubMessage ||
                `There was an error loading the ${contentType}`
              }}
            </p>
            <div class="flex flex-wrap justify-center gap-3">
              <button class="btn-error" @click="$emit('retry')">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try again
              </button>
              <slot name="error-actions">
                <button class="btn-secondary" @click="$emit('clear-filters')">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l18 0"
                    />
                  </svg>
                  Clear filters
                </button>
              </slot>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

defineProps({
  type: {
    type: String,
    default: "loading",
    validator: (value) => ["loading", "empty", "error"].includes(value),
  },
  contentType: {
    type: String,
    required: true,
    default: "items",
  },
  searchTerm: {
    type: String,
    default: "",
  },
  loadingMessage: {
    type: String,
    default: "",
  },
  loadingSubMessage: {
    type: String,
    default: "",
  },
  emptyMessage: {
    type: String,
    default: "",
  },
  emptySubMessage: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  errorSubMessage: {
    type: String,
    default: "",
  },
  primaryColor: {
    type: String,
    default: "blue",
  },
});

const contentIllustrations = {
  videos:
    "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  images:
    "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  newsletters:
    "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
  brochures:
    "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  products: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  users:
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  documents:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

defineEmits(["clear-search", "retry", "clear-filters"]);
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 rounded-md text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200;
}

.btn-error {
  @apply inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200;
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.empty-state-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
