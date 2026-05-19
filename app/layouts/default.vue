<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <header class="p-4 shadow">
      <AppHeader />
    </header>

    <main class="flex-1 pt-5 bg-[#FFF7ED]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
