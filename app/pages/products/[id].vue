<script setup>
import { computed } from 'vue';

const route = useRoute()

const productId= computed(()=> route.params.id)

const { data: product, pending, error }= useFetch(() => 
  `https://fakestoreapi.com/products/${productId.value}`)
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
        <h1 class="text-2xl font-bold">{{  product.title }}</h1>
        <p class="text-xl text-green-600 font-semibold">{{  product.price }} $</p>
        <p class="text-gray-600">{{ product.description }}</p>
        <span class="text-sm bg-gray-200 px-3 py-1 rounded w-fit">
          {{ product.category }}
        </span>
      </div>
    </div>
  </div>
</template>