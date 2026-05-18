import { ref, watch } from 'vue'

const query = ref('')
const debouncedQuery = ref('')

let timeout: ReturnType<typeof setTimeout> | undefined

function applySearchNow() {
  if (timeout !== undefined) {
    clearTimeout(timeout)
    timeout = undefined
  }
  debouncedQuery.value = query.value
}

watch(query, (val) => {
  if (timeout !== undefined) clearTimeout(timeout)
  timeout = setTimeout(() => {
    debouncedQuery.value = val
    timeout = undefined
  }, 300)
})

export const useSearch = () => {
  return {
    query,
    debouncedQuery,
    applySearchNow
  }
}