<template>
  <header class="bg-gray-800 text-white border-none">
    <div class="w-full">
      <div class="flex items-center justify-between h-16">
        <NuxtLink 
          to="/" 
          class="text-xl font-bold px-10"
        >
          LOGO
        </NuxtLink>

        <div class="flex gap-4">
          <NuxtLink
            to="/"
            :class="[
              'text-sm px-2 py-1 rounded transition',
              activeCategory === null
                ? 'bg-blue-600 text-white'
                : 'text-white hover:text-blue-400'
            ]"
          >
            All
          </NuxtLink>

          <NuxtLink
            v-for="cat in categories || []"
            :key="cat"
            :to="`/category/${cat}`"
            :class="[
              'text-sm px-2 py-1 rounded transition',
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'text-white hover:text-blue-400'
            ]"
          >
            {{ cat }}
          </NuxtLink>
        </div>

        <div class="text-2xl cursor-pointer px-10">
          Cart
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route= useRoute()
const activeCategory= computed(() => {
  if (route.path.startsWith('/category/')) {
    return route.params.slug
  }
  return null
})

const { data: categories } = useCategories()
</script>
