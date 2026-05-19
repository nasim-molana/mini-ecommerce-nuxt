import { fetchDirectusCategoryMap } from '../utils/directusCategories'
import {
  pickProductCategoryField,
  resolveProductCategory,
  type ProductCategorySource
} from '../utils/resolveProductCategory'

type DirectusProduct = {
  id: number
  name: string
  price: number | string
  category?: ProductCategorySource
  product_category?: ProductCategorySource
  main_image: string | null
}

type DirectusResponse = {
  data: DirectusProduct[]
}

const PRODUCT_FIELDS =
  'id,name,price,main_image,' +
  'category.id,category.slug,category.name,category.title,' +
  'product_category.id,product_category.slug,product_category.name,product_category.title'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.directusUrl
  const categoryMap = await fetchDirectusCategoryMap(apiBase)

  let result: DirectusResponse
  try {
    result = await $fetch<DirectusResponse>(
      `${apiBase}/items/products?fields=${encodeURIComponent(PRODUCT_FIELDS)}`
    )
  } catch (error: unknown) {
    const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error
      ? Number((error as { statusCode?: number }).statusCode)
      : undefined

    if (statusCode === 403) {
      result = await $fetch<DirectusResponse>(`${apiBase}/items/products`)
    } else {
      throw error
    }
  }

  if (!result?.data || !Array.isArray(result.data)) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Invalid data format received from upstream API'
    })
  }

  return result.data.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    category: resolveProductCategory(
      pickProductCategoryField(product),
      categoryMap
    ),
    image: product.main_image ? `${apiBase}/assets/${product.main_image}` : ''
  }))
})
