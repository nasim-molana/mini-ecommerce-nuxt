export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export type CartProductInput = Omit<CartItem, 'quantity'>