// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith("/admin") && !to.path.startsWith("/admin/login")) {
    const { user } = useAuthStore();
    if (!user || !user.isAdmin) {
      return navigateTo("/admin/login");
    }
  }
});
