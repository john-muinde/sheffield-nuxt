// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith("/admin") && !to.path.startsWith("/admin/login")) {
    if (!useAuthStore().isAdmin) {
      return navigateTo("/admin/login");
    }
  }
});
