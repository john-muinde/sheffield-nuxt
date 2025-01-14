import { ref, reactive } from "vue";

export default function useAuth() {
  let user = ref({
    name: "",
    email: "",
    role: "",
  });
  const processing = ref(false);
  const validationErrors = ref({});
  const store = useAuthStore();
  const router = useRouter();

  const loginForm = reactive({
    email: "",
    password: "",
    remember: false,
  });

  const registerForm = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submitLogin = async () => {
    if (processing.value) return;

    processing.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("post", "/login", loginForm);
      await store.dispatch("auth/getUser");
      showToast("success", "Login successfully");
      await router.push({ name: "frontend.myaccount" });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const submitRegister = async () => {
    if (processing.value) return;

    processing.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("post", "/register", registerForm);
      showToast("success", "Registration successfully");
      await router.push({ name: "auth.login" });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const submitLoginAdmin = async () => {
    if (processing.value) {
      showToast("Processing", "error");
      return;
    }

    processing.value = true;
    validationErrors.value = {};

    try {
      const response = await apiRequest("post", "/login", loginForm);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      await store.dispatch("auth/getUser");
      showToast("Login successfully", "success");
      await router.push({ name: "admin.dashboard" });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const submitRegisterAdmin = async () => {
    if (processing.value) return;

    processing.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("post", "/register", registerForm);
      showToast("Registration successfully", "success");
      await router.push({ name: "admin.dashboard" });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const loginUser = async () => {
    user.value = store.auth.user;
  };

  const getUser = async () => {
    if (store.getters["auth/authenticated"]) {
      await store.dispatch("auth/getUser");
      await loginUser();
    }
  };

  const logout = async () => {
    if (processing.value) return;

    processing.value = true;

    try {
      await apiRequest("post", "/logout");
      user.value.name = "";
      user.value.email = "";
      store.dispatch("auth/logout");
      router.push({ name: "frontend.login" });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const logoutAdmin = async () => {
    if (processing.value) return;

    processing.value = true;

    try {
      await apiRequest("post", "/logout");
      user.value.name = "";
      user.value.email = "";
      store.dispatch("auth/logout");
      showToast("Logout successfully", "success");
      router.replace({
        name: "admin.login",
        meta: { layout: "auth" },
        replace: true,
      });
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const getAbilities = async () => {
    try {
      const response = await apiRequest("get", "/api/abilities");
      const permissions = response;
      const { can, rules } = new AbilityBuilder(Ability);

      can(permissions);

      ability.update(rules);
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    loginForm,
    registerForm,
    validationErrors,
    processing,
    submitLogin,
    submitLoginAdmin,
    submitRegister,
    submitRegisterAdmin,
    user,
    getUser,
    logout,
    logoutAdmin,
    getAbilities,
  };
}
