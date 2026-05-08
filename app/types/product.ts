export type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
}

export type ProductDetails = Product & {
  description: string
}
