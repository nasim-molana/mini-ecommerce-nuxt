import type { Product } from '~/types/product'

export const useFetchProducts = () => {
  const { data, pending, error, refresh } = useAsyncData<Product[]>(
    'products',
    () => $fetch<Product[]>('/api/products'),
    {
      server: true,
      default: () => []
    }
  )

  return {
    data,
    pending,
    error,
    refresh
  }
}