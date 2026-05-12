<template>
  <header class="bg-gray-800 text-white border-none">
    <div class="w-full">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          to="/"
          class="text-xl font-bold px-10"
        >
          LOGO
        </NuxtLink>

        <div class="flex gap-4">
          <NuxtLink
            to="/"
            :class="[
              'text-sm px-2 py-1 rounded transition',
              activeCategory === null
                ? 'bg-blue-600 text-white'
                : 'text-white hover:text-blue-400'
            ]"
          >
            All
          </NuxtLink>

          <NuxtLink
            v-for="cat in categories || []"
            :key="cat"
            :to="`/category/${cat}`"
            :class="[
              'text-sm px-2 py-1 rounded transition',
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'text-white hover:text-blue-400'
            ]"
          >
            {{ cat }}
          </NuxtLink>
        </div>

        <input
          v-model="query"
          type="text"
          placeholder="Search Products..."
          class="px-3 py-1 rounded text-black"
        />

        <div class="flex items-center gap-2 px-10">
          <!-- Guest: sign in -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/login"
            class="relative text-xl p-2 rounded hover:bg-gray-700/80"
            title="Sign in"
            aria-label="Sign in"
          >
            <Icon name="heroicons:user" class="w-6 h-6" />
          </NuxtLink>

          <!-- Signed in: account menu (standard shop pattern) -->
          <div
            v-else
            ref="accountMenuRoot"
            class="relative"
          >
            <button
              type="button"
              class="relative flex items-center justify-center text-xl p-2 rounded hover:bg-gray-700/80"
              :aria-expanded="accountMenuOpen"
              aria-haspopup="true"
              aria-label="Account menu"
              @click.stop="toggleAccountMenu"
            >
              <Icon name="heroicons:user" class="w-6 h-6" />
              <span
                class="absolute top-1 right-1 block w-2 h-2 rounded-full bg-green-500 ring-2 ring-gray-800"
              />
            </button>

            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="accountMenuOpen"
                class="absolute right-0 z-50 mt-1 w-56 origin-top-right rounded-md border border-gray-700 bg-gray-900 py-1 shadow-lg ring-1 ring-black/5"
                role="menu"
                aria-orientation="vertical"
              >
                <div class="border-b border-gray-700 px-3 py-2">
                  <p class="text-xs text-gray-400">
                    Signed in as
                  </p>
                  <p class="truncate text-sm font-medium text-white" :title="userDisplayName">
                    {{ userDisplayName }}
                  </p>
                </div>

                <NuxtLink
                  to="/checkout"
                  role="menuitem"
                  class="block px-3 py-2 text-sm text-white hover:bg-gray-800"
                  @click="accountMenuOpen = false"
                >
                  Checkout
                </NuxtLink>

                <button
                  type="button"
                  role="menuitem"
                  class="block w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-800 disabled:opacity-50"
                  :disabled="loggingOut"
                  @click="onLogoutFromMenu"
                >
                  {{ loggingOut ? 'Signing out…' : 'Log out' }}
                </button>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="/cart"
            class="relative text-xl p-2 rounded hover:bg-gray-700/80"
            aria-label="Cart"
          >
            <Icon name="heroicons:shopping-cart" class="w-6 h-6" />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full"
            >
              {{ cart.totalItems }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useCart } from '~/stores/useCart'

const route = useRoute()
const router = useRouter()
const cart = useCart()
const { isLoggedIn, logout, user } = useAuth()
const { data: categories } = useCategories()
const { query } = useSearch()

const accountMenuRoot = ref<HTMLElement | null>(null)
const accountMenuOpen = ref(false)
const loggingOut = ref(false)

let removeOutsideClick: (() => void) | null = null

const userDisplayName = computed(() => {
  const u = user.value
  if (!u) return 'Signed in'
  if (u.email) return u.email
  const full = [u.first_name, u.last_name].filter(Boolean).join(' ').trim()
  if (full) return full
  return u.id ? `User ${u.id.slice(0, 8)}` : 'Signed in'
})

function closeAccountMenu() {
  accountMenuOpen.value = false
  removeOutsideClick?.()
  removeOutsideClick = null
}

function toggleAccountMenu() {
  if (accountMenuOpen.value) {
    closeAccountMenu()
    return
  }
  accountMenuOpen.value = true
  nextTick(() => {
    setTimeout(() => {
      const handler = (e: MouseEvent) => {
        const root = accountMenuRoot.value
        if (root && !root.contains(e.target as Node)) {
          closeAccountMenu()
        }
      }
      document.addEventListener('click', handler)
      removeOutsideClick = () => document.removeEventListener('click', handler)
    }, 0)
  })
}

const onLogoutFromMenu = async () => {
  loggingOut.value = true
  try {
    await logout()
    closeAccountMenu()
    const mw = route.meta.middleware
    const isProtected = Array.isArray(mw)
      ? mw.includes('auth')
      : mw === 'auth'
    if (isProtected) {
      await router.push('/login')
    }
  } finally {
    loggingOut.value = false
  }
}

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && accountMenuOpen.value) {
    closeAccountMenu()
  }
}

watch(() => route.fullPath, () => {
  closeAccountMenu()
})

watch(isLoggedIn, (loggedIn) => {
  if (!loggedIn) closeAccountMenu()
})

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onEscape)
  removeOutsideClick?.()
})

const activeCategory = computed(() => {
  if (route.path.startsWith('/category/')) {
    return route.params.slug as string
  }
  return null
})
</script>
