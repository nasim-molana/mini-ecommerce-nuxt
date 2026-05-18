<template>
    <div class="flex gap-4">
        <NuxtLink
         to="/"
         :class="[
             'text-sm px-2 py-1 rounded transition',
             activeCategory === null
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
        :class="[
            'text-sm px-2 py-1 rounded transition',
            activeCategory === cat.slug
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


const activeCategory = computed(() => {
if (route.path.startsWith('/category/')) {
return route.params.slug as string
}
return null
})    
</script>