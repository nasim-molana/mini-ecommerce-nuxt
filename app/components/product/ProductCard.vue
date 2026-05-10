<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const { addProductToCart } = useAddToCart()

const handleAddToCart = () => {
  addProductToCart(props.product)
}
</script>

<template>
  <div class="border p-3 rounded">
    <NuxtLink :to="`/products/${product.id}`">
      <div class="flex justify-center">
        <img :src="product.image" class="w-44 h-44 object-cover" />
      </div>
      <h2 class="font-bold">{{ product.name }}</h2>
      <p class="text-gray-600">${{ product.price }}</p>
    </NuxtLink>
    <div>
      <button
        @click.prevent="handleAddToCart"
        class="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>