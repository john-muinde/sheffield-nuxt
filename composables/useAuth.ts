import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { LoginForm, RegisterForm, User, RawUser } from "~/types/auth";
import { transformUser } from "~/types/auth";

export default function useAuth() {
  // Initialize with a transformed default user
  const user = ref<User>(
    transformUser({
      name: "",
      email: "",
      role: 2, // default to regular user role
    })
  );

  const processing = ref(false);
  const validationErrors = ref<Record<string, any>>({});
  const store = useAuthStore();

  const loginForm = reactive<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const registerForm = reactive<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRequest = async (
    request: () => Promise<any>,
    successMessage: string,
    redirectRoute: string
  ) => {
    if (processing.value) return;
    processing.value = true;
    validationErrors.value = {};
    try {
      console.log("Starting request");
      const response = await request();
      console.log("Request completed");

      notification.success(successMessage);
      console.log("Attempting navigation to:", redirectRoute);

      const navigationResult = await navigateTo(redirectRoute);
      console.log("Navigation result:", navigationResult);

      if (!navigationResult) {
        console.warn("Navigation might have failed");
        window.location.href = redirectRoute;
      }
    } catch (errors: any) {
      console.error("Error occurred:", errors);
      validationErrors.value = errors;
    } finally {
      processing.value = false;
    }
  };

  const submitLogin = (admin: boolean = false) =>
    handleRequest(
      () => store.login(loginForm),
      "Login successfully",
      admin ? "/admin/" : "/request-for-quote"
    );

  const submitRegister = (admin: boolean = false) =>
    handleRequest(
      () => store.register(registerForm),
      "Registration successfully",
      admin ? "/admin/" : "/request-for-quote"
    );

  const logout = (admin: boolean = false) =>
    handleRequest(
      () => store.logout(),
      "Logout successfully",
      admin ? "/admin/login" : "/login"
    );

  return {
    loginForm,
    registerForm,
    validationErrors,
    processing,
    submitLogin,
    submitRegister,
    user,
    logout,
  };
}
