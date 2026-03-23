<template>
  <div class="p-10 text-center text-2xl">
    <AppHeader />
    <ProductGrid />

  </div>
</template>

<script setup lang="ts">
 import AppHeader from '~/components/layout/AppHeader.vue';
 import ProductGrid from '~/components/product/ProductGrid.vue';
</script>