import { defineStore } from 'pinia'
import type { CartItem, CartProductInput } from '~/types/cart'

function safeParse(data: string | null): CartItem[] {
  try {
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
} 

export const useCart = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const loadFromStorage = () => {
    if (import.meta.client) {
      items.value = safeParse(localStorage.getItem('cart'))
    }
  }

  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  const addToCart = (product: CartProductInput) => {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToStorage()
  } 

  const removeFromCart = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id)
    saveToStorage()
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    const item = items.value.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
    }
    saveToStorage()
  }

  return {
    items,
    totalItems,
    totalPrice,
    loadFromStorage,
    addToCart,
    removeFromCart,
    updateQuantity,
  }
})
