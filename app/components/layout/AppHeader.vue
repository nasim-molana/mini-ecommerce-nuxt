<template>
  <header class="bg-[#FFF] text-[#111827] border-none">
    <div class="mx-auto max-w-7xl">
      <div class="flex min-h-16 flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        <div class="flex w-full items-center justify-between md:w-auto">
          <HeaderLogo />

          <div class="flex items-center gap-3 md:hidden">
            <HeaderActions />
          </div>
        </div>

        <HeaderNavigation class="order-3 w-full overflow-x-auto md:order-none md:w-auto md:overflow-visible" />

        <HeaderSearch class="order-2 w-full md:order-none md:w-64 lg:w-80" />

        <div class="hidden md:block">
          <HeaderActions />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderLogo from './HeaderLogo.vue'
import HeaderNavigation from './HeaderNavigation.vue'
import HeaderSearch from './HeaderSearch.vue'
import HeaderActions from './HeaderActions.vue'
</script>
