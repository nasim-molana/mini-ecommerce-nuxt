const query = ref('')

export function submitSearch() {
  const q = query.value.trim()
  return navigateTo({
    path: '/products',
    query: q ? { q } : {}
  })
}

export function syncSearchQueryFromRoute(routeQuery: string | undefined) {
  query.value = String(routeQuery ?? '').trim()
}

export function clearSearch() {
  query.value = ''
}

export const useSearch = () => {
  return {
    query,
    submitSearch,
    syncSearchQueryFromRoute,
    clearSearch
  }
}
