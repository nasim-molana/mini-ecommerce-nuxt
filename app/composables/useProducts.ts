import { computed, ref } from "vue"

const selectedCategory = ref<string | null>(null)

export const useProducts = () => {
    const { data, pending, error, refresh }= useFetch<any[]>('https://fakestoreapi.com/products')

    const categories= computed<string[]>(() => {
        if(!data.value) return []
        const allCategories= data.value.map((p: any) => p.category)
        return [...new Set(allCategories)]
    })
    return {
        products: data,
        loading: pending,
        error,
        refresh,
        categories,
        selectedCategory
    }
}