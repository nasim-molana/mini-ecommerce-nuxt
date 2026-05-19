import { isFeatured } from './isFeatured'
import { pickProductCategoryField, resolveProductCategory, type ProductCategorySource } from './resolveProductCategory'

export type DirectusProductRaw = {
  id: number
  name: string
  description?: string | null
  price: number | string
  rating?: number | string | null
  featured?: boolean | null
  category?: ProductCategorySource
  product_category?: ProductCategorySource
  main_image: string | null
}

export const PRODUCT_LIST_FIELDS =
  'id,name,description,price,rating,featured,main_image,' +
  'category.id,category.slug,category.name,category.title,' +
  'product_category.id,product_category.slug,product_category.name,product_category.title'

export function clampRating(rating: number | string | null | undefined): number {
  const value = Number(rating)
  if (Number.isNaN(value)) return 0
  const clamped = Math.min(5, Math.max(0, value))
  return Math.round(clamped * 10) / 10
}

export function mapDirectusProduct(
  product: DirectusProductRaw,
  apiBase: string,
  categoryMap: Map<string, string>
) {
  return {
    id: product.id,
    name: product.name,
    description: String(product.description ?? ''),
    price: Number(product.price),
    rating: clampRating(product.rating),
    featured: isFeatured(product.featured),
    category: resolveProductCategory(
      pickProductCategoryField(product),
      categoryMap
    ),
    image: product.main_image ? `${apiBase}/assets/${product.main_image}` : ''
  }
}
