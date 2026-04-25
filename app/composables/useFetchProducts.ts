type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export const useFetchProducts = () => {
  const { data, pending, error, refresh } = useAsyncData<Product[]>(
    'products',
    () => $fetch<Product[]>('/api/products'),
    {
      server: true,
      default: () => []
    }
  );

  return {
    data,
    pending,
    error,
    refresh
  };
};