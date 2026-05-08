import type { ProductDetails } from '~/types/product'

export const useProductById = () => {
  const route = useRoute()
  const productId = computed(() => String(route.params.id))

  return useAsyncData<ProductDetails>(
    () => `product-${productId.value}`,
    () => $fetch<ProductDetails>(`/api/products/${productId.value}`),
    {
      server: true
    }
  )
}