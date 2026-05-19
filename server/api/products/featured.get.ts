import { fetchDirectusCategoryMap } from '../../utils/directusCategories'
import { isFeatured } from '../../utils/isFeatured'
import {
  mapDirectusProduct,
  PRODUCT_LIST_FIELDS,
  type DirectusProductRaw
} from '../../utils/mapDirectusProduct'

type DirectusResponse = {
  data: DirectusProductRaw[]
}

async function fetchProducts(
  apiBase: string,
  query: string
): Promise<DirectusProductRaw[]> {
  const result = await $fetch<DirectusResponse>(`${apiBase}/items/products?${query}`)
  return result?.data ?? []
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.directusUrl
  const categoryMap = await fetchDirectusCategoryMap(apiBase)

  const mapList = (items: DirectusProductRaw[]) =>
    items.map((product) => mapDirectusProduct(product, apiBase, categoryMap))

  const fields = `fields=${encodeURIComponent(PRODUCT_LIST_FIELDS)}`
  const filterQueries = [
    `${fields}&filter[featured][_eq]=true&limit=4&sort=-id`,
    `${fields}&filter[featured][_eq]=1&limit=4&sort=-id`,
    `${fields}&limit=50&sort=-id`
  ]

  for (const query of filterQueries) {
    try {
      const items = await fetchProducts(apiBase, query)
      const featuredItems = query.includes('filter[featured]')
        ? items
        : items.filter((product) => isFeatured(product.featured))

      if (featuredItems.length > 0) {
        return mapList(featuredItems.slice(0, 4))
      }
    } catch {
      // Try next query strategy.
    }
  }

  // Last resort: base product list without extra fields (403 on relational fields).
  try {
    const items = await fetchProducts(apiBase, 'limit=50&sort=-id')
    const featuredItems = items.filter((product) => isFeatured(product.featured))
    return mapList(featuredItems.slice(0, 4))
  } catch {
    return []
  }
})
