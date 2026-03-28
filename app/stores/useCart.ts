import { data } from "autoprefixer";
import { defineStore } from "pinia";

type CartItem = {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

export const useCart= defineStore ('cart',{
    state: () => ({
        items: [] as CartItem[]
    }),

    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    actions: {
        loadFromStorage() {
            if(import.meta.client) {
                this.items= safeParse(localStorage.getItem('cart'))
            }
        },

        saveToStorage() {
            if (import.meta.client) {
                localStorage.setItem('cart', JSON.stringify(this.items))
            }
        },

        addToCart(product: Omit<CartItem, 'quantity'>) {
            const existing= this.items.find((item) => item.id === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({...product, quantity: 1})
            }
            this.saveToStorage()
        },

        removeFromCart(id: number) {
            this.items= this.items.filter((item) => item.id !== id)
            this.saveToStorage()
        },

        updateQuantity(id: number, quantity:number) {
            if (quantity <= 0) {
                this.removeFromCart(id)
                this.saveToStorage()
                return
            }

            const item= this.items.find((item) => item.id === id)
            if (item) {
                item.quantity= quantity
            }
            this.saveToStorage()
        }
    }
})


function safeParse(data: string | null): CartItem[] {
    try {
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
} 