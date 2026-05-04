
type Product = {
  category: string
}

export const useCategories = () => {
  return useAsyncData<string[]>(
    'categories',
    async () => {
      const products = await $fetch<Product[]>('/api/products')
      const categories = products
        .map((product) => String(product.category).trim())
        .filter(Boolean)

      return [...new Set(categories)]
    },
    {
      default: () => []
    }
  )
}