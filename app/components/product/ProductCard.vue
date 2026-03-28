<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cart= useCart()

    type Product = {
        id: number
        name:string
        bild: string
        price: number
    }

    const props= defineProps<{
        product: Product
    }>()

    const handleAddToCart = () => {
        cart.addToCart({
            id: props.product.id,
            title: props.product.name,
            price: props.product.price,
            image: props.product.bild
        })
    }
</script>

<template>
    <NuxtLink :to="`/products/${product.id}`" class="border p-3 rounded">
        <div class="flex justify-center">
            <img :src="product.bild" class="w-32 h-32 object-cover" />
        </div>
        <h2 class="font-bold">{{ product.name }}</h2>
        <p class="text-gray-600">${{ product.price }}</p>
        <button
            @click.stop.prevent="handleAddToCart"
            class="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
            Add to Cart
        </button>
    </NuxtLink>

</template>