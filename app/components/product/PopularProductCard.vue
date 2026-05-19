<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <ProductCard :product="product" />
</template>
