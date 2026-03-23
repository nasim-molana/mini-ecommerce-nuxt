<script setup lang="ts">

type Category = {
  name: string
  slug: string
  children: {
    name: string
    slug: string
  }[]
}

const props= defineProps<{
    categories: Category[]
}>()

const activeCategory= ref<string | null>(null)

const toggleCategory= (slug: string) => {
    activeCategory.value=
        activeCategory.value===slug ? null : slug
}

</script>


<template>
  <nav class="flex gap-6">
    
    <div
      v-for="cat in categories"
      :key="cat.slug"
      class="relative"
    >
      
      <!-- Category -->
      <button
        @click="toggleCategory(cat.slug)"
        class="flex items-center gap-1 hover:text-blue-500"
      >
        {{ cat.name }}

        <!-- Arrow -->
        <span
          :class="[
            'transition-transform',
            activeCategory === cat.slug ? 'rotate-180' : ''
          ]"
        >
          ▼
        </span>
      </button>

      <!-- Submenu -->
      <div
        v-if="activeCategory === cat.slug"
        class="absolute left-0 mt-2 shadow rounded min-w-[160px] z-50"
      >
        <NuxtLink
          v-for="child in cat.children"
          :key="child.slug"
          :to="`/category/${cat.slug}/${child.slug}`"
          class="block px-4 py-2 hover:bg-gray-200"
        >
          {{ child.name }}
        </NuxtLink>
      </div>

    </div>

  </nav>
</template>