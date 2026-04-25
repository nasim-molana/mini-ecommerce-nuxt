<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cart = useCart();

type Product = {
  id: number;
  name: string;
  image: string; // Changed from 'bild' to 'image'
  price: number;
};

const props = defineProps<{
  product: Product;
}>();

const handleAddToCart = () => {
  cart.addToCart({
    id: props.product.id,
    title: props.product.name,
    price: props.product.price,
    image: props.product.image // Changed from 'bild' to 'image'
  });
};
</script>

<template>
  <NuxtLink :to="`/products/${props.product.id}`" class="border p-3 rounded">
    <div class="flex justify-center">
      <img :src="props.product.image" class="w-32 h-32 object-cover" />
    </div>
    <h2 class="font-bold">{{ props.product.name }}</h2>
    <p class="text-gray-600">${{ props.product.price }}</p>
    <button
      @click.stop.prevent="handleAddToCart"
      class="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
    >
      Add to Cart
    </button>
  </NuxtLink>
</template>