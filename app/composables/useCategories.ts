
export const useCategories= () => {
    return useFetch<string[]>(
    'https://fakestoreapi.com/products/categories',
    {
        default: () => []
    }
    )

}