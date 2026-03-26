
export const useProductState = () => {
  const selectedCategory = useState<string | null>('selectedCategory', () => null)

  return {
    selectedCategory
  }
}