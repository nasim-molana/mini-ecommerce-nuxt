<script setup lang="ts">
import { useProductById } from '~/composables/useProductById'

const { data: product, pending, error } = useProductById()
const { addProductToCart } = useAddToCart()

const handleAddToCart = () => {
  addProductToCart(product.value)
}
</script>

<template>
  <div class="p-10 max-w-5xl mx-auto">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading product...</div>

    <div v-else-if="product" class="flex gap-10">
      <div class="w-1/2">
        <img :src="product.image" class="w-full h-96 object-contain border rounded py-2">
      </div>
      <div class="w-1/2 flex flex-col gap-4">
        <h1 class="text-2xl font-bold">{{ product.name }}</h1>
        <p class="text-xl text-green-600 font-semibold">{{  product.price }} $</p>
        <div class="text-gray-600 prose" v-html="product.description" />
        <span class="text-sm bg-gray-200 px-3 py-1 rounded w-fit">
          {{ product.category }}
        </span>
        <div>
          <button
            @click.prevent="handleAddToCart"
            class="mt-1 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>