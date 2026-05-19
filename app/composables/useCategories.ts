import type { Category } from '~/types/category'

export const useCategories = () => {
  const result = useAsyncData<Category[]>(
    'nav-categories',
    () => $fetch<Category[]>('/api/categories'),
    {
      default: () => [],
      server: true,
      lazy: false
    }
  )

  if (import.meta.client) {
    onMounted(async () => {
      if (!result.data.value?.length && result.status.value !== 'pending') {
        await result.refresh()
      }
    })
  }

  return result
}
