const PRODUCT_CATEGORY_COLLECTION = 'product_category'

type DirectusCategory = {
  id: number | string
  slug?: string | null
  name?: string | null
  title?: string | null
  label?: string | null
}

type DirectusCategoryResponse = {
  data: DirectusCategory[]
}

export type CategoryDto = {
  name: string
  slug: string
}

function normalizeCategory(raw: DirectusCategory): CategoryDto | null {
  const name = String(raw.name ?? raw.title ?? raw.label ?? '').trim()
  const slugSource = String(raw.slug ?? raw.name ?? raw.title ?? raw.label ?? raw.id ?? '').trim()

  if (!name && !slugSource) return null

  const slug = slugSource
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (!slug) return null

  return {
    slug,
    name: name || slug
  }
}

async function fetchProductCategoryItems(apiBase: string): Promise<DirectusCategory[]> {
  const urls = [
    `${apiBase}/items/${PRODUCT_CATEGORY_COLLECTION}?fields=id,slug,name,title,label`,
    `${apiBase}/items/${PRODUCT_CATEGORY_COLLECTION}?fields=id,name,slug`,
    `${apiBase}/items/${PRODUCT_CATEGORY_COLLECTION}?fields=id,name`,
    `${apiBase}/items/${PRODUCT_CATEGORY_COLLECTION}`
  ]

  for (const url of urls) {
    try {
      const response = await $fetch<DirectusCategoryResponse>(url)
      if (response?.data?.length) return response.data
    } catch {
      // Try the next field set if Directus rejects unknown fields.
    }
  }

  return []
}

export async function fetchDirectusCategoryMap(apiBase: string): Promise<Map<string, string>> {
  const categoryMap = new Map<string, string>()

  try {
    for (const category of await fetchProductCategoryItems(apiBase)) {
      const normalized = normalizeCategory(category)
      if (!normalized) continue
      categoryMap.set(String(category.id), normalized.slug)
    }
  } catch {
    // Product routes should still work if categories cannot be loaded.
  }

  return categoryMap
}

export async function fetchDirectusCategories(apiBase: string): Promise<CategoryDto[]> {
  try {
    const items = await fetchProductCategoryItems(apiBase)
    const seen = new Set<string>()

    return items
      .map((item) => normalizeCategory(item))
      .filter((category): category is CategoryDto => {
        if (!category || seen.has(category.slug)) return false
        seen.add(category.slug)
        return true
      })
  } catch {
    return []
  }
}
