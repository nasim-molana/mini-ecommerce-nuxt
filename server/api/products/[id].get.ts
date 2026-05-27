import { fetchDirectusCategoryMap } from '../../utils/directusCategories'
import {
  mapDirectusProduct,
  PRODUCT_LIST_FIELDS,
  type DirectusProductRaw
} from '../../utils/mapDirectusProduct'

type DirectusSingleResponse = {
  data: DirectusProductRaw
}

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
      `${apiBase}/items/products/${id}?fields=${encodeURIComponent(PRODUCT_LIST_FIELDS)}`
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

  return mapDirectusProduct(product, apiBase, categoryMap)
})
