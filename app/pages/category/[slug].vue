<script setup lang="ts">
import { computed } from 'vue'
import { useFetchProducts } from '~/composables/useFetchProducts'
import ProductGrid from '~/components/product/ProductGrid.vue'
const route = useRoute()

const slug = computed(() => String(route.params.slug))

const { data, pending, error } = useFetchProducts()

const filteredProducts = computed(() => {
  if (!data.value) return []

  return data.value.filter((p) => p.category === slug.value)
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-6">
      Category: {{ slug }}
    </h1>

    <!-- loading -->
    <div v-if="pending">Loading...</div>

    <!-- error -->
    <div v-else-if="error">Error loading products</div>

    <!-- products -->
    <ProductGrid 
      v-else
      :products="filteredProducts" 
    />
  </div>
</template>