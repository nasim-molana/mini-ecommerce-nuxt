<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user } = useAuth()
const cart = useCart()

const displayName = computed(() => {
  const u = user.value
  if (!u) return ''
  if (u.email) return u.email
  const full = [u.first_name, u.last_name].filter(Boolean).join(' ').trim()
  return full || `User ${u.id?.slice(0, 8) ?? ''}`
})
</script>

<template>
  <section class="mx-auto max-w-2xl px-6 py-12">
    <h1 class="text-3xl font-bold text-slate-900">Checkout</h1>

    <p class="mt-4 text-slate-600">
      Signed in as
      <span class="font-medium text-slate-900">{{ displayName }}</span>
    </p>

    <div class="mt-8 rounded border border-slate-200 p-4">
      <h2 class="text-lg font-semibold">Order summary</h2>
      <p class="mt-2 text-sm text-slate-600">
        {{ cart.totalItems }} item(s) — total
        <span class="font-medium">${{ cart.totalPrice.toFixed(2) }}</span>
      </p>
    </div>

    <p class="mt-6 text-sm text-slate-500">
      Payment step is not implemented yet.
    </p>
  </section>
</template>
