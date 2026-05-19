<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import ProductGrid from '~/components/product/ProductGrid.vue'
import { useFetchProducts } from '~/composables/useFetchProducts'
import { useSearch } from '~/composables/useSearch'
import { computed } from 'vue'

const { data, pending, error } = useFetchProducts()
const { debouncedQuery } = useSearch()

const filteredProducts = computed(() => {
  if (!data.value) return []

  if (!debouncedQuery.value) return data.value

  return data.value.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.value.toLowerCase())
  )
})
</script>

<template>
  <HomeHero />
  <div id="products" class="px-10 pt-6">
    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Error loading products</div>

    <div v-else-if="filteredProducts.length === 0">
      No products found
    </div>

    <ProductGrid v-else :products="filteredProducts" />
  </div>
</template>
