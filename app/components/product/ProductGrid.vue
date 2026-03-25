<script setup lang="ts">
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue'
import { computed } from 'vue';

const { products, loading, error, selectedCategory} = useProducts()

const normalizedProducts = computed(() => {
  if (!products.value) return []

  return (products.value as any[]).map((p) => ({
    id: p.id,
    name: p.title,
    bild: p.image,
    price: p.price,
    category: p.category
  }))
})

const filteredProducts= computed(() => {
  if (!selectedCategory.value) return normalizedProducts.value
  return normalizedProducts.value.filter(
    (p) => p.category === selectedCategory.value
  )
})

</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Something went wrong</div>
    <div v-else>
      <!-- Product Grid -->
      <div class="grid grid-cols-3 gap-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
</template>