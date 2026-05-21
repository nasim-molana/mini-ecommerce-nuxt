<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue'
import { useFetchProducts } from '~/composables/useFetchProducts'

const route = useRoute()

const searchQuery = computed(() => String(route.query.q ?? '').trim())

const { data, pending, error } = useFetchProducts()

const filteredProducts = computed(() => {
  if (!data.value) return []

  if (!searchQuery.value) return data.value

  const term = searchQuery.value.toLowerCase()
  return data.value.filter((p) =>
    p.name.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div id="products" class="mx-auto max-w-7xl px-6 pt-6 md:px-10">
    <h1 class="mb-6 text-2xl font-bold text-[#111827]">
      <template v-if="searchQuery">
        Search results for “{{ searchQuery }}”
      </template>
      <template v-else>
        All products
      </template>
    </h1>

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Error loading products</div>

    <div v-else-if="filteredProducts.length === 0">
      No products found
    </div>

    <ProductGrid v-else :products="filteredProducts" />
  </div>
</template>
