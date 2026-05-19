<script setup lang="ts">
const cart = useCart()
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-6 md:px-10">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-2xl font-bold text-[#111827] md:text-3xl">
        Your Cart
      </h1>

      <div
        v-if="cart.items.length === 0"
        class="mt-10 rounded-lg border border-stone-200 bg-white py-12 text-center shadow-sm"
      >
        <p class="text-[#6B7280]">
          Your cart is empty
        </p>
        <NuxtLink
          to="/products"
          class="mt-4 inline-flex text-sm font-semibold text-[#F97316] transition hover:text-[#ea580c]"
        >
          Go shopping →
        </NuxtLink>
      </div>

      <div v-else class="mt-8 space-y-4">
        <article
          v-for="item in cart.items"
          :key="item.id"
          class="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-20 w-20 shrink-0 object-contain"
          >

          <div class="min-w-0 flex-1">
            <h2 class="font-bold text-[#111827]">
              {{ item.title }}
            </h2>
            <p class="mt-1 text-sm text-[#6B7280]">
              {{ item.price.toFixed(2) }} $ each
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3 sm:justify-end">
            <div class="flex items-center gap-2 rounded-md border border-stone-200 bg-[#FFF7ED] px-2 py-1">
              <button
                type="button"
                :disabled="item.quantity <= 1"
                class="flex h-8 w-8 items-center justify-center rounded text-[#111827] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
                @click="cart.updateQuantity(item.id, item.quantity - 1)"
              >
                −
              </button>
              <span class="min-w-[2rem] text-center text-sm font-medium text-[#111827]">
                {{ item.quantity }}
              </span>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded text-[#111827] transition hover:bg-white"
                aria-label="Increase quantity"
                @click="cart.updateQuantity(item.id, item.quantity + 1)"
              >
                +
              </button>
            </div>

            <button
              type="button"
              class="text-sm font-medium text-[#EF4444] transition hover:text-red-700"
              @click="cart.removeFromCart(item.id)"
            >
              Remove
            </button>
          </div>
        </article>

        <div class="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p class="text-lg font-bold text-[#111827]">
            Total: {{ cart.totalPrice.toFixed(2) }} $
          </p>
          <p class="mt-1 text-sm text-[#6B7280]">
            {{ cart.totalItems }} item(s)
          </p>

          <NuxtLink
            to="/checkout"
            class="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#F97316] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea580c] sm:w-auto"
          >
            Proceed to checkout
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
