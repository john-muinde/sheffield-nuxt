// utils/globalState.ts
import { reactive } from "vue";

export const globalState = reactive({
  cartItems: [],
  userData: null,
  settings: {},
  promotions: [],
});
