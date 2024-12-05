export const useCartStore = defineStore("cart-store", {
  state: () => ({
    stateCartItems: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.stateCartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        product.quantity = 1;
        this.stateCartItems.push(product);
      }
    },

    removeFromCart(index) {
      this.stateCartItems.splice(index, 1);
    },

    clearCart() {
      this.stateCartItems = [];
    },
  },
  getters: {
    cartItems: (state) => state.stateCartItems,
    total: (state) =>
      state.stateCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
