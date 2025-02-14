// middleware/segment.ts
export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware if no segment parameter
  if (!to.params.segment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  const segment = getSegment(to.params.segment as string);

  // Handle non-existent segments
  if (!segment.slug) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  // Handle redirects for non-exact segment matches
  if (!segment.exact && segment.slug) {
    const newPath = to.fullPath.replace(
      to.params.segment as string,
      segment.slug
    );
    console.log(`Redirecting from ${to.fullPath} to ${newPath}`);
    return navigateTo(newPath, { redirectCode: 301 });
  }
});
