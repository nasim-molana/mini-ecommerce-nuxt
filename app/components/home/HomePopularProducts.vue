<script setup lang="ts">
import ProductGrid from '~/components/product/ProductGrid.vue'

const { data: products, pending, error } = useFeaturedProducts()
</script>
<template>
  <section class="bg-[#FFF7ED] px-6 py-10 md:px-10 md:py-12">
    <div class="mx-auto max-w-7xl md:px-6">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 class="text-2xl font-bold text-[#111827] md:text-3xl">
          Popular Products
        </h2>
        <NuxtLink
          to="/products"
          class="inline-flex items-center justify-center rounded-md bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
        >
          View All
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-sm text-[#6B7280]">
        Loading popular products…
      </div>

      <div v-else-if="error" class="text-sm text-[#EF4444]">
        Could not load popular products.
      </div>

      <div
        v-else-if="!products?.length"
        class="text-sm text-[#6B7280]"
      >
        No featured products yet.
      </div>

      <ProductGrid v-else :products="products" />    </div>
  </section>
</template>
