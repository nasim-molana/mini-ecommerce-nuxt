<script setup lang="ts">
    type Product = {
        name:string
        bild: string
        price: number
    }

    const props= defineProps<{
        product: Product
    }>()

</script>

<template>
    <div class="border p-2 rounded">
        <div class="flex justify-center">
            <img :src="product.bild" class="w-32 h-32 object-cover" />
        </div>
        <h2 class="font-bold">{{ product.name }}</h2>
        <p class="text-gray-600">${{ product.price }}</p>
    </div>
</template>