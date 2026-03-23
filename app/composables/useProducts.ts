export const useProducts = () => {
    const { data, pending, error, refresh }= useFetch('https://fakestoreapi.com/products')

    return {
        products: data,
        loading: pending,
        error,
        refresh,
    }
}