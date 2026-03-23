<script setup>
import ProductCard from './ProductCard.vue'

const fakeProducts = [
    { name: 'Shirt', bild: 'pink_shirt.jpg', price: 25 },
    { name: 'Shoes', bild: 'shoes.avif', price: 50 },
    { name: 'Hat', bild: 'pink_hat.webp', price: 15 },
]
</script>

<template>
    <div class="grid grid-cols-3 gap-4 mt-10">
        <ProductCard
            v-for="(product, index) in fakeProducts"
            :key="index"
            :product="product"
        />
    </div>
</template>