<template>
    <div class="flex gap-4">
        <NuxtLink
         to="/products"
         @click="clearSearch"
         :class="[
             'text-md px-2 py-1 rounded transition',
             isAllActive
             ? 'bg-[#F97316] text-white'
             : 'text-[#111827] hover:text-[#F97316]'
         ]"
        >
        All
        </NuxtLink>

        <NuxtLink
        v-for="cat in categories || []"
        :key="cat.slug"
        :to="`/category/${cat.slug}`"
        @click="clearSearch"
        :class="[
            'text-md px-2 py-1 rounded transition',
            activeCategorySlug === cat.slug
            ? 'bg-[#F97316] text-white'
            : 'text-[#111827] hover:text-[#F97316]'
        ]"
        >
        {{ cat.name }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: categories } = useCategories()
const { clearSearch } = useSearch()


const activeCategorySlug = computed(() => {
  if (route.path.startsWith('/category/')) {
    return route.params.slug as string
  }
  return null
})

const isAllActive = computed(() => activeCategorySlug.value === null)
</script>