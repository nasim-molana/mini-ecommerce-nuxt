<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const { addProductToCart } = useAddToCart()

const rating = computed(() => props.product.rating ?? 0)

const fullStars = computed(() => Math.floor(rating.value))

const hasHalfStar = computed(() => {
  const fraction = rating.value - fullStars.value
  return fraction >= 0.25 && fraction < 0.75 && fullStars.value < 5
})

const emptyStars = computed(() =>
  5 - fullStars.value - (hasHalfStar.value ? 1 : 0)
)

const shortDescription = computed(() => {
  const text = props.product.description?.trim()
  if (!text) return ''
  return text.length > 72 ? `${text.slice(0, 72)}…` : text
})

const handleAddToCart = () => {
  addProductToCart(props.product)
}
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-[#FFF] shadow-sm"
  >
    <NuxtLink
      :to="`/products/${product.id}`"
      class="block p-4"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="mx-auto h-40 w-full object-contain"
      >
    </NuxtLink>

    <div class="flex flex-1 flex-col p-4">
      <div
        class="mb-2 flex gap-0.5"
        :aria-label="`Rating: ${rating.toFixed(1)} out of 5`"
      >
        <span
          v-for="star in fullStars"
          :key="`full-${star}`"
          class="text-base leading-none text-[#F97316]"
        >
          ★
        </span>
        <span
          v-if="hasHalfStar"
          class="text-base leading-none text-[#F97316]"
          aria-hidden="true"
        >
          ☆
        </span>
        <span
          v-for="star in emptyStars"
          :key="`empty-${star}`"
          class="text-base leading-none text-stone-300"
        >
          ★
        </span>
      </div>

      <NuxtLink
        :to="`/products/${product.id}`"
        class="text-base font-bold text-[#111827] hover:text-[#F97316]"
      >
        {{ product.name }}
      </NuxtLink>

      <p
        v-if="shortDescription"
        class="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B7280]"
      >
        {{ shortDescription }}
      </p>

      <p class="mt-3 text-lg font-bold text-[#111827]">
        {{ product.price.toFixed(2) }} $
      </p>

      <button
        type="button"
        class="mt-4 w-full rounded-md bg-[#F97316] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
        @click="handleAddToCart"
      >
        Add to Cart
      </button>
    </div>
  </article>
</template>
