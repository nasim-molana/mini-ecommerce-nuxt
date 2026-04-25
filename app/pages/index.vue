<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue';
import { useFetchProducts } from '~/composables/useFetchProducts';
import { useSearch } from '~/composables/useSearch';
import { computed } from 'vue';

const { data, pending, error } = useFetchProducts()
const { query } = useSearch()

const filteredProducts = computed(() => {
  if (!query.value) return data.value

  return data.value.filter((p) =>
    p.name.toLowerCase().includes(query.value.toLowerCase())
  )
})
</script>

<template>
  <div class="px-10">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading products</div>
    <ProductGrid v-else :products="filteredProducts" />
  </div>
</template>