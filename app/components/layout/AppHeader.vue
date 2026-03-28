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

        <NuxtLink to="/cart" class="relative text-xl px-10">
          <div>
            <Icon name="heroicons:shopping-cart" class="w-6 h-6" />
            <span 
              v-if="cart.totalItems > 0"
              class="absolute -top-2 right-4 bg-red-500 text-white text-xs px-2 rounded-full">
              {{  cart.totalItems }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useCart } from '~/stores/useCart';

const route= useRoute()
const activeCategory= computed(() => {
  if (route.path.startsWith('/category/')) {
    return route.params.slug as string
  }
  return null
})

const { data: categories } = useCategories()

const cart= useCart()
</script>
