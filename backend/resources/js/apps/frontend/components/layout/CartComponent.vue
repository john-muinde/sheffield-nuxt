<template>
  <div class="dropdown cart-dropdown">
    <router-link
      to="/request-for-quote"
      class="dropdown-toggle"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      data-display="static"
    >
      <i class="icon-shopping-cart"></i>
      <span class="cart-count">{{ cartItems.length }}</span>
      <span class="cart-txt">Cart</span>
    </router-link>

    <div class="dropdown-menu dropdown-menu-right">
      <div class="dropdown-cart-products">
        <transition-group name="cart-item" tag="div" class="space-y-3">
          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="flex items-center justify-between bg-white shadow-sm border border-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300"
          >
            <router-link
              :to="getProductLink(
                item.id,
                item.name,
                item.model_number,
                item.categories_json[0]?.parent_name_with_slashes
              )
              "
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="'/storage/' + item.main_image_path"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-md border"
                />
                <div>
                  <span class="font-semibold text-gray-800">{{ item.name }}</span>
                  <p class="text-sm text-gray-500">
                    {{ item.category }}
                  </p>
                  <!-- quantity -->
                  <span class="text-gray-500">Qty: {{ item.quantity }}</span>
                </div>
              </div>
            </router-link>
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
        <div class="dropdown-cart-action">
          <router-link to="/request-for-quote" class="btn btn-primary mt-2 float-right" style="color: white">
            Request for Quote
          </router-link>
        </div>
        <!-- End .dropdown-cart-total -->
      </div>
      <!-- End .dropdown-menu -->
    </div>
    <!-- End .cart-dropdown -->
    <button class="mobile-menu-toggler" @click="addClassToBody">
      <span class="sr-only">Toggle mobile menu</span>
      <i class="icon-bars"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
  import { useStore } from 'vuex';

const store = useStore();
const cartItems = store.state.cart.cartItems;

const removeFromCart = (index) => {
    store.dispatch('cart/removeFromCart', index);
};

const getProductLink = (id, name, model_number, main_second_parent_cat) => {
    const firstPart = main_second_parent_cat?.split('/')[0];
    // Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    let transformedModelNumber = model_number.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedModelNumber = transformedModelNumber.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedModelNumber = transformedModelNumber.replace(/^-+|-+$/g, '');

    return `/${firstPart}/product/${id}/${transformedName}-${transformedModelNumber}`;
};

const bodyClassAdded = ref(false);

const addClassToBody = () => {
    document.body.classList.toggle('mmenu-active');
    bodyClassAdded.value = !bodyClassAdded.value;
};

</script>
