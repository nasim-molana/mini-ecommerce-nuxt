<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { computed } from 'vue';


const props = defineProps<{
  products: any[]
}>()

const normalizedProducts = computed(() => {
  return props.products.map((p) => ({
    id: p.id,
    name: p.title,
    bild: p.image,
    price: p.price,
    category: p.category
  }))
})

</script>

<template>
      <div class="grid grid-cols-3 gap-4">
        <ProductCard
          v-for="product in normalizedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
</template>