import type { Product, ProductDetails } from '~/types/product'
import { useCart } from '~/stores/useCart'

export function useAddToCart() {
  const cart = useCart()

  function addProductToCart(product: Product | ProductDetails | null | undefined) {
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
