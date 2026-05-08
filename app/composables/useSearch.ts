import { ref, watch } from 'vue'

const query = ref('')
const debouncedQuery = ref('')

let timeout: any

watch(query, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    debouncedQuery.value = val
  }, 300)
})

export const useSearch = () => {
  return {
    query,
    debouncedQuery
  }
}