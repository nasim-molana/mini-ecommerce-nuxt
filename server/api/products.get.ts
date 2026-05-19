import { fetchDirectusCategoryMap } from '../utils/directusCategories'
import {
  mapDirectusProduct,
  PRODUCT_LIST_FIELDS,
  type DirectusProductRaw
} from '../utils/mapDirectusProduct'

type DirectusResponse = {
  data: DirectusProductRaw[]
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.directusUrl
  const categoryMap = await fetchDirectusCategoryMap(apiBase)

  let result: DirectusResponse
  try {
    result = await $fetch<DirectusResponse>(
      `${apiBase}/items/products?fields=${encodeURIComponent(PRODUCT_LIST_FIELDS)}`
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

  return result.data.map((product) =>
    mapDirectusProduct(product, apiBase, categoryMap)
  )
})
