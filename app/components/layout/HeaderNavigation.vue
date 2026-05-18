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
        :key="cat"
        :to="`/category/${cat}`"
        :class="[
            'text-sm px-2 py-1 rounded transition',
            activeCategory === cat
            ? 'bg-[#F97316] text-white'
            : 'text-[#111827] hover:text-[#F97316]'
        ]"
        >
        {{ cat }}
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