export const useSearch = () => {
  const query = useState<string>('search-query', () => '')
  return {
    query
  }
}