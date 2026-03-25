<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
</script>


<template>
    <div>
        <header class="bg-gray-800 shadow p-4">
            <AppHeader />
        </header>
        <main class="pt-5 p-6">
            <slot />
        </main>
    </div>
</template>