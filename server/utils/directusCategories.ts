type DirectusCategory = {
  id: number | string
  slug?: string
  name?: string
}

type DirectusCategoryResponse = {
  data: DirectusCategory[]
}

export type CategoryDto = {
  name: string
  slug: string
}

export async function fetchDirectusCategoryMap(apiBase: string): Promise<Map<string, string>> {
  const categoryMap = new Map<string, string>()

  try {
    const response = await $fetch<DirectusCategoryResponse>(
      `${apiBase}/items/product_category?fields=id,slug,name`
    )
    for (const category of response?.data || []) {
      const key = String(category.id)
      const value = category.slug || category.name
      if (value) categoryMap.set(key, value)
    }
  } catch {
    // Product routes should still work if categories cannot be loaded.
  }

  return categoryMap
}

export async function fetchDirectusCategories(apiBase: string): Promise<CategoryDto[]> {
  try {
    const response = await $fetch<DirectusCategoryResponse>(
      `${apiBase}/items/product_category?fields=id,slug,name`
    )

    return (response?.data || [])
      .map((category) => {
        const slug = category.slug || category.name
        const name = category.name || category.slug
        if (!slug || !name) return null
        return { name, slug }
      })
      .filter((category): category is CategoryDto => category !== null)
  } catch {
    return []
  }
}
