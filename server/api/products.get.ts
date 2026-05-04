type DirectusProduct = {
  id: number;
  name: string;
  price: number | string;
  category:
    | number
    | string
    | {
        id?: number | string;
        slug?: string;
        name?: string;
      };
  main_image: string | null;
};

type DirectusResponse = {
  data: DirectusProduct[];
};

type DirectusCategory = {
  id: number | string;
  slug?: string;
  name?: string;
};

type DirectusCategoryResponse = {
  data: DirectusCategory[];
};

const FALLBACK_CATEGORY_LABELS: Record<string, string> = {
  '1': 'fragrances',
  '2': 'beauty',
  '3': 'furniture'
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const fields = 'id,name,price,main_image,category.id,category.slug,category.name';
  const categoryMap = new Map<string, string>();

  try {
    const categoriesResponse = await $fetch<DirectusCategoryResponse>(
      `${apiBase}/items/categories?fields=id,slug,name`
    );
    for (const category of categoriesResponse?.data || []) {
      const key = String(category.id);
      const value = category.slug || category.name;
      if (value) categoryMap.set(key, value);
    }
  } catch {
    // Ignore category-map failures; product list should still load.
  }

  let result: DirectusResponse;
  try {
    result = await $fetch<DirectusResponse>(
      `${apiBase}/items/products?fields=${encodeURIComponent(fields)}`
    );
  } catch (error: unknown) {
    const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error
      ? Number((error as { statusCode?: number }).statusCode)
      : undefined;

    // Some Directus public roles cannot read relational category fields.
    // Fallback to base product fetch so homepage never crashes.
    if (statusCode === 403) {
      result = await $fetch<DirectusResponse>(`${apiBase}/items/products`);
    } else {
      throw error;
    }
  }

  if (!result?.data || !Array.isArray(result.data)) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Invalid data format received from upstream API'
    });
  }

  const resolveCategory = (category: DirectusProduct['category']) => {
    if (category && typeof category === 'object') {
      return category.slug || category.name || String(category.id ?? '');
    }

    const raw = String(category ?? '');
    return categoryMap.get(raw) || FALLBACK_CATEGORY_LABELS[raw] || raw;
  };

  return result.data.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    category: resolveCategory(product.category),
    image: product.main_image ? `${apiBase}/assets/${product.main_image}` : ''
  }));
});

