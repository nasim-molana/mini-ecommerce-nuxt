<script setup lang="ts">
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue'
import { watch, computed } from 'vue';

const { products, loading, error} = useProducts()

watch(products, (val) => {
  console.log('Products:', val)
}, { immediate: true})

const normalizedProducts = computed(() => {
  if (!products.value) return []

  return (products.value as any[]).map((p) => ({
    name: p.title,
    bild: p.image,
    price: p.price,
  }))
})

</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Something went wrong</div>
    <div v-else class="grid grid-cols-3 gap-4 mt-10">
        <ProductCard
            v-for="(product, index) in normalizedProducts"
            :key="index"
            :product="product"
        />
    </div>
</template>