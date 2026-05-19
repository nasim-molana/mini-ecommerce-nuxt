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
  <section class="mx-auto max-w-7xl px-6 py-6 md:px-10">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-2xl font-bold text-[#111827] md:text-3xl">
        Checkout
      </h1>

      <p class="mt-4 text-sm text-[#6B7280] md:text-base">
        Signed in as
        <span class="font-medium text-[#111827]">{{ displayName }}</span>
      </p>

      <div class="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-[#111827]">
          Order summary
        </h2>
        <p class="mt-2 text-sm text-[#6B7280]">
          {{ cart.totalItems }} item(s) — total
          <span class="font-bold text-[#111827]">
            {{ cart.totalPrice.toFixed(2) }} $
          </span>
        </p>
      </div>

      <p class="mt-6 text-sm text-[#6B7280]">
        Payment step is not implemented yet.
      </p>

      <NuxtLink
        to="/cart"
        class="mt-6 inline-flex text-sm font-medium text-[#F97316] transition hover:text-[#ea580c]"
      >
        ← Back to cart
      </NuxtLink>
    </div>
  </section>
</template>
