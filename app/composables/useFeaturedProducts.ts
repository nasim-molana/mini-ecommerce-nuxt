import type { Product } from '~/types/product'

export const useFeaturedProducts = () => {
  const result = useAsyncData<Product[]>(
    'featured-products-v2',
    () => $fetch<Product[]>('/api/products/featured'),
    {
      server: true,
      default: () => []
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
