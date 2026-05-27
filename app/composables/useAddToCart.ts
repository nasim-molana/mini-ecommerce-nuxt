import type { Product } from '~/types/product'
import { useCart } from '~/stores/useCart'

export function useAddToCart() {
  const cart = useCart()

  function addProductToCart(product: Product | null | undefined) {
    if (!product) return
    cart.addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return { addProductToCart }
}
