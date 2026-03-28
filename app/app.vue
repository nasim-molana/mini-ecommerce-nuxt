<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  const cart= useCart()

  onMounted(() => {
    cart.loadFromStorage()
  })
</script>
