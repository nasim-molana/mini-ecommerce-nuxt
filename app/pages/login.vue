<script setup lang="ts">
definePageMeta({ layout: 'default' })

const auth = useAuth()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref<string | null>(null)

if (auth.isLoggedIn.value) {
  await navigateTo('/')
}

const onSubmit = async () => {
  errorMsg.value = null
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/'
    await navigateTo(redirect)
  } catch (err: any) {
    errorMsg.value =
      err?.data?.errors?.[0]?.message ||
      err?.message ||
      'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-md px-6 py-12">
    <h1 class="text-3xl font-bold text-slate-900">Login</h1>
    <p class="mt-2 text-slate-600">Please sign in to continue.</p>

    <form class="mt-8 space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="block text-sm font-medium text-slate-700">Email</label>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:border-[#F97316] focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">Password </label>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:border-[#F97316] focus:outline-none"
        />
      </div>

      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded bg-[#F97316] px-4 py-2 font-medium text-white hover:bg-[#ea580c] disabled:opacity-60"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </section>
</template>
