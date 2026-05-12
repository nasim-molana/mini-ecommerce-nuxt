export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn.value) return

  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath },
  })
})
