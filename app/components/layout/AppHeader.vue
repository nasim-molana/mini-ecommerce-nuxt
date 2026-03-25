<template>
  <header class="bg-gray-800 text-white border-none">
    <div class="w-full">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left: Logo -->
        <NuxtLink 
          to="/" 
          class="text-xl font-bold px-10"
          @click="selectedCategory= null"
        >
          LOGO
        </NuxtLink>

        <div class="flex gap-4" v-if="!loading && categories.length">
          <button
            @click="handleReset"
            :class="[
              'text-sm px-2 py-1 rounded transition',
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'text-white hover:text-blue-400'
            ]"
          >
            All
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="handleCategoryClick(cat)"
            :class="['text-sm px-2 py-1 rounded transition',
              selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'text-white hover:text-blue-400'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Right: Cart Icon -->
        <div class="text-2xl cursor-pointer px-10">
          🛒
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useProducts } from '../../composables/useProducts';
import { useRouter } from 'vue-router';

const { categories, selectedCategory, loading } = useProducts()

const router= useRouter()

const handleCategoryClick = (cat: string) => {
  selectedCategory.value= cat
  router.push('/')
}

const handleReset = () => {
  selectedCategory.value = null
  router.push('/')
}

</script>