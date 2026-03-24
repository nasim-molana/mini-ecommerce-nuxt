<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
</script>


<template>
    <div>
        <header class="bg-white shadow p-4">
            <AppHeader />
        </header>
        <main class="p-6">
            <slot />
        </main>
    </div>
</template>