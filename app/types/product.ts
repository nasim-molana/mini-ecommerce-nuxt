export type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  description?: string
  /** 0–5, decimal allowed (e.g. 4.5) */
  rating?: number
  featured?: boolean
}

export type ProductDetails = Product & {
  description: string
}
