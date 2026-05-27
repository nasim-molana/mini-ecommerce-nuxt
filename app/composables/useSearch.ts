export const useSearch = () => {
  const query = useState('search-query', () => '')

  const submitSearch = () => {
    const q = query.value.trim()
    return navigateTo({
      path: '/products',
      query: q ? { q } : {}
    })
  }

  const syncSearchQueryFromRoute = (routeQuery: string | undefined) => {
    query.value = String(routeQuery ?? '').trim()
  }

  const clearSearch = () => {
    query.value = ''
  }

  return {
    query,
    submitSearch,
    syncSearchQueryFromRoute,
    clearSearch
  }
}