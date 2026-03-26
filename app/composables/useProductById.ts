
type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
}

export const useProductById = () => {
    const route = useRoute()
    const productId= computed(()=> String(route.params.id))

    return useFetch<Product>(() => `https://fakestoreapi.com/products/${productId.value}`)
}