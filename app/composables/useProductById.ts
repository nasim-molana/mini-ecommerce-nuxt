import type { Product } from '~/types/product'

export const useProductById = () => {
  const route = useRoute()
  const productId = computed(() => String(route.params.id))

  return useAsyncData<Product>(
    () => `product-${productId.value}`,
    () => $fetch<Product>(`/api/products/${productId.value}`),
    {
      server: true
    }
  )
}