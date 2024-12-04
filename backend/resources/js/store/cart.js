// store/modules/cart.js
const state = {
  cartItems: [],
};

const mutations = {
  addToCart(state, product) {
    const existingProduct = state.cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      state.cartItems.push(product);
    }
  },

  removeFromCart(state, index) {
    state.cartItems.splice(index, 1);
  },

  clearCart(state) {
    state.cartItems = [];
  },
};

const actions = {
  addToCart({ commit }, product) {
    commit('addToCart', product);
  },

  removeFromCart({ commit }, index) {
    commit('removeFromCart', index);
  },

  clearCart({ commit }) {
    commit('clearCart');
  },
};

const getters = {
  cartItems: (state) => state.cartItems,
  total: (state) =>
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
