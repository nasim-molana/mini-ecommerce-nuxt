<template>
  <header class="bg-white shadow">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left: Logo -->
        <div class="text-xl font-bold">
          LOGO
        </div>

        <!-- Center: Menu -->
        <MainMenu :categories="categories" />

        <!-- Right: Cart Icon -->
        <div class="text-2xl cursor-pointer">
          🛒
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MainMenu from '../navigation/MainMenu.vue';

const categories= [
     {
    name: "Electronics",
    slug: "electronics",
    children: [
      { name: "Phones", slug: "phones" },
      { name: "Laptops", slug: "laptops" }
    ]
  },
  {
    name: "Clothing",
    slug: "clothing",
    children: [
      { name: "Men", slug: "men" },
      { name: "Women", slug: "women" }
    ]
  },
  {
    name: "Home",
    slug: "home",
    children: [
      { name: "Furniture", slug: "furniture" },
      { name: "Kitchen", slug: "kitchen" }
    ]
  }
]


</script>