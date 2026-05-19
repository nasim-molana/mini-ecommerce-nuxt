type CategoryRef = {
  id?: number | string
  slug?: string | null
  name?: string | null
  title?: string | null
}

export type ProductCategorySource =
  | number
  | string
  | CategoryRef
  | null
  | undefined

const FALLBACK_CATEGORY_LABELS: Record<string, string> = {
  '1': 'fragrances',
  '2': 'beauty',
  '3': 'furniture'
}

export function resolveProductCategory(
  category: ProductCategorySource,
  categoryMap: Map<string, string>
): string {
  if (category && typeof category === 'object') {
    const slug = category.slug || category.name || category.title
    if (slug) {
      return String(slug)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }
    return categoryMap.get(String(category.id)) || String(category.id ?? '')
  }

  const raw = String(category ?? '').trim()
  return categoryMap.get(raw) || FALLBACK_CATEGORY_LABELS[raw] || raw
}

export function pickProductCategoryField(product: {
  category?: ProductCategorySource
  product_category?: ProductCategorySource
}): ProductCategorySource {
  return product.product_category ?? product.category
}
