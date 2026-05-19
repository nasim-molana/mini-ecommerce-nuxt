import { fetchDirectusCategoryMap } from '../../utils/directusCategories'
import {
  pickProductCategoryField,
  resolveProductCategory,
  type ProductCategorySource
} from '../../utils/resolveProductCategory'

type DirectusProduct = {
  id: number
  name: string
  description: string
  price: number | string
  category?: ProductCategorySource
  product_category?: ProductCategorySource
  main_image: string | null
}

type DirectusSingleResponse = {
  data: DirectusProduct
}

const PRODUCT_FIELDS =
  'id,name,description,price,main_image,' +
  'category.id,category.slug,category.name,category.title,' +
  'product_category.id,product_category.slug,product_category.name,product_category.title'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.directusUrl
  const id = getRouterParam(event, 'id')
  const categoryMap = await fetchDirectusCategoryMap(apiBase)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product id is required'
    })
  }

  let result: DirectusSingleResponse
  try {
    result = await $fetch<DirectusSingleResponse>(
      `${apiBase}/items/products/${id}?fields=${encodeURIComponent(PRODUCT_FIELDS)}`
    )
  } catch (error: unknown) {
    const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error
      ? Number((error as { statusCode?: number }).statusCode)
      : undefined

    if (statusCode === 403) {
      result = await $fetch<DirectusSingleResponse>(`${apiBase}/items/products/${id}`)
    } else {
      throw error
    }
  }

  if (!result?.data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  const product = result.data

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: resolveProductCategory(
      pickProductCategoryField(product),
      categoryMap
    ),
    image: product.main_image ? `${apiBase}/assets/${product.main_image}` : ''
  }
})
