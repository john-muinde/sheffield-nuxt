<template>
  <div class="flex">
    <div class="dropdown cart-dropdown">
      <NuxtLink
        to="/request-for-quote"
        class="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <div class="relative">
          <i class="icon-shopping-cart text-6xl"></i>
          <ClientOnly>
            <span
              class="bg-primary font-medium text-white w-8 h-8 flex items-center justify-center text-xl rounded-full absolute top-0 right-0"
            >
              {{ cartItems?.length }}
            </span>
          </ClientOnly>
        </div>
        <span
          class="text-2xl font-[500] text-black ml-2 -mt-2 transition-all duration-300"
          >Cart</span
        >
      </NuxtLink>

      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-cart-products">
          <ClientOnly>
            <template #fallback>
              <div class="text-center py-4">
                <p class="text-gray-500">Loading cart items...</p>
              </div>
            </template>
            <transition-group name="cart-item" tag="div" class="space-y-3">
              <div
                v-for="(item, index) in cartItems"
                :key="item.id"
                class="flex items-center justify-between bg-white shadow-sm border border-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <NuxtLink :to="getProductLink(item)">
                  <div class="flex items-center space-x-4">
                    <img
                      :src="assetsSync(item.main_image_path)"
                      :alt="item.name"
                      class="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <span class="font-semibold text-gray-800">{{
                        item.name
                      }}</span>
                      <p class="text-sm text-gray-500">
                        {{ item.category }}
                      </p>
                      <!-- quantity -->
                      <span class="text-gray-500"
                        >Qty: {{ item.quantity }}</span
                      >
                    </div>
                  </div>
                </NuxtLink>
                <button
                  class="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all duration-300 group"
                  @click="removeFromCart(index)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 group-hover:scale-110"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </transition-group>
          </ClientOnly>
          <div class="dropdown-cart-action">
            <NuxtLink
              to="/request-for-quote"
              class="btn btn-primary mt-2 float-right"
              style="color: white"
            >
              Request for Quote
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <button class="mobile-menu-toggler ml-3" @click="addClassToBody">
      <span class="sr-only">Toggle mobile menu</span>
      <i class="icon-bars"></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// nuxt disable ssr

const store = useCartStore();
const cartItems = computed(() => store.cartItems);

const bodyClassAdded = ref(false);

const addClassToBody = () => {
  document.body.classList.toggle("mmenu-active");
  bodyClassAdded.value = !bodyClassAdded.value;
};
</script>
