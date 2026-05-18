interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
}

interface LoginResponse {
  data: {
    access_token: string
    refresh_token: string
    expires: number
  }
}

interface MeResponse {
  data: User
}

const TOKEN_KEY = 'token'
const REFRESH_KEY = 'refresh_token'

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase 

  const user = useState<User | null>('auth:user', () => null)
  const accessToken = useState<string | null>('auth:accessToken', () => null)
  const refreshToken = useState<string | null>('auth:refreshToken', () => null)

  const isLoggedIn = computed<boolean>(() => !!accessToken.value)

  const persistTokens = (access: string | null, refresh: string | null) => {
    if (!import.meta.client) return
    if (access) localStorage.setItem(TOKEN_KEY, access)
    else localStorage.removeItem(TOKEN_KEY)

    if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
    else localStorage.removeItem(REFRESH_KEY)
  }

  const fetchMe = async (): Promise<void> => {
    if (!accessToken.value) return
    const res = await $fetch<MeResponse>(`${apiBase}/users/me`, {
      params: { fields: 'id,email,first_name,last_name' },
      headers: { Authorization: `Bearer ${accessToken.value}` },
    })
    if (!res?.data?.id) {
      throw new Error('Invalid /users/me response')
    }
    user.value = res.data
  }

  const login = async (email: string, password: string): Promise<void> => {
    const res = await $fetch<LoginResponse>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
    accessToken.value = res.data.access_token
    refreshToken.value = res.data.refresh_token
    persistTokens(accessToken.value, refreshToken.value)
    await fetchMe()
  }

  const logout = async (): Promise<void> => {
    try {
      if (refreshToken.value) {
        await $fetch(`${apiBase}/auth/logout`, {
          method: 'POST',
          body: { refresh_token: refreshToken.value },
        })
      }
    } catch {
    }
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    persistTokens(null, null)
  }

  const init = async (): Promise<void> => {
    if (!import.meta.client) return
    const savedAccess = localStorage.getItem(TOKEN_KEY)
    const savedRefresh = localStorage.getItem(REFRESH_KEY)
    if (!savedAccess) return
    accessToken.value = savedAccess
    refreshToken.value = savedRefresh
    try {
      await fetchMe()
    } catch {
      await logout()
    }
  }

  return {
    user,
    accessToken,
    isLoggedIn,
    login,
    logout,
    fetchMe,
    init,
  }
}
