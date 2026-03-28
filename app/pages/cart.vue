<script setup lang="ts">
import { useCart } from '~/stores/useCart'

const cart = useCart()
</script>

<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

    <!-- empty -->
    <div v-if="cart.items.length === 0" class="text-center py-10">
      <p class="text-gray-500">Your cart is empty</p>

      <NuxtLink to="/" class="text-blue-600 mt-4 inline-block">
        Go shopping →
      </NuxtLink>
    </div>

    <!-- items -->
    <div v-else>
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex items-center gap-4 border-b py-4"
      >
        <img :src="item.image" class="w-16 h-16 object-contain" />

        <div class="flex-1">
          <h2>{{ item.title }}</h2>
          <p>${{ item.price }}</p>
        </div>

        <div class="flex item-center gap-2">
          <button
            :disabled="item.quantity === 1" 
            @click="cart.updateQuantity(item.id, item.quantity-1)"
            class="px-2 bg-gray-200 disabled:opacity-50"
          >
            -
          </button>
          <span>
            Qty: {{ item.quantity }}
          </span>
          <button
            @click="cart.updateQuantity(item.id, item.quantity+1)"
          >
            +
          </button>
        </div>

        <button
          @click="cart.removeFromCart(item.id)"
          class="text-red-500"
        >
          Remove
        </button>
      </div>

      <!-- total -->
      <div class="mt-6 text-xl font-bold">
        Total: ${{ cart.totalPrice.toFixed(2) }}
      </div>
    </div>
  </div>
</template>
