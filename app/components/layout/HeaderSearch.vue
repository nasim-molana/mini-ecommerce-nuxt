<template>
  <div
    class="flex w-full items-stretch overflow-hidden rounded-sm bg-[#111827]"
  >
    <input
      v-model="query"
      type="text"
      inputmode="search"
      enterkeyhint="search"
      placeholder="Search products…"
      class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#FFF7ED] placeholder:text-[#FFF7ED] outline-none"
      autocomplete="off"
      @keydown.enter.prevent="submitSearch"
    />
    <button
      type="button"
      class="flex shrink-0 items-center justify-center border-0 px-3 text-[#EF4444] transition hover:text-[#FFF7ED]"
      aria-label="Search"
      @click="submitSearch"
    >
      <Icon name="heroicons:magnifying-glass" class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { query, submitSearch, syncSearchQueryFromRoute } = useSearch()

watch(
  () => route.query.q,
  (q) => {
    if (route.path === '/products') {
      syncSearchQueryFromRoute(typeof q === 'string' ? q : undefined)
    }
  },
  { immediate: true }
)
</script>
