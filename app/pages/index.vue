<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue'
import { useFetchProducts } from '~/composables/useFetchProducts';

const { data, pending, error } = useFetchProducts()
</script>

<template>
  <div class="px-10">
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading products</div>

    <ProductGrid
      v-else
      :products="data || []"
    />

  </div>
</template>