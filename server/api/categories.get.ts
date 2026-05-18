import { fetchDirectusCategories } from '../utils/directusCategories'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const fromDirectus = await fetchDirectusCategories(config.directusUrl)
  if (fromDirectus.length > 0) return fromDirectus

  // Public role may read products but not the categories collection.
  const products = await $fetch<Array<{ category: string }>>('/api/products', {
    baseURL: getRequestURL(event).origin
  })

  const slugs = [...new Set(
    products
      .map((product) => String(product.category ?? '').trim())
      .filter(Boolean)
  )].sort()

  return slugs.map((slug) => ({
    slug,
    name: slug
  }))
})
