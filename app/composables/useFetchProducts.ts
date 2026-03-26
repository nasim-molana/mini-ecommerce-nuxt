type Product = {
id: number
title: string
price: number
category: string
image: string
}

export const useFetchProducts = () => {
  return useFetch<Product[]>('https://fakestoreapi.com/products')
}