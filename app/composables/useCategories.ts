import type { Category } from '~/types/category'

export const useCategories = () => {
  return useAsyncData<Category[]>(
    'categories',
    () => $fetch<Category[]>('/api/categories'),
    {
      default: () => [],
      server: true,
      lazy: false
    }
  )
} 
