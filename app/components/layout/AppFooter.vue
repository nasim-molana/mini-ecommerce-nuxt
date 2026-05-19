<script setup lang="ts">
import FooterLogo from './FooterLogo.vue'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Collections', to: '/products' },
  { label: 'Contact', to: '#' },
  { label: 'Support', to: '#' }
]

const categoryLinks = [
  { label: 'Beauty', slug: 'beauty' },
  { label: 'Fragrances', slug: 'fragrances' },
  { label: 'Furniture', slug: 'furniture' },
  { label: 'Accessories', slug: 'accessories' }
]

const socialLinks = [
  { label: 'TikTok', href: '#', icon: 'simple-icons:tiktok' },
  { label: 'Instagram', href: '#', icon: 'mdi:instagram' },
  { label: 'Facebook', href: '#', icon: 'mdi:facebook' }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto">
    <FooterLogo />

    <div class="bg-[#111827] px-6 pb-8 pt-14 text-white md:px-10 md:pt-16">
      <div class="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 class="mb-4 text-base font-bold">
            Quick Links
          </h3>
          <ul class="space-y-2 text-sm text-stone-300">
            <li
              v-for="link in quickLinks"
              :key="link.label"
            >
              <NuxtLink
                :to="link.to"
                class="transition hover:text-[#F97316]"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold">
            Categories
          </h3>
          <ul class="space-y-2 text-sm text-stone-300">
            <li
              v-for="cat in categoryLinks"
              :key="cat.slug"
            >
              <NuxtLink
                :to="`/category/${cat.slug}`"
                class="transition hover:text-[#F97316]"
              >
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold">
            Contact
          </h3>
          <ul class="space-y-2 text-sm text-stone-300">
            <li>
              <a
                href="mailto:support@molana.com"
                class="transition hover:text-[#F97316]"
              >
                support@molana.com
              </a>
            </li>
            <li>
              <a
                href="tel:+49123456789"
                class="transition hover:text-[#F97316]"
              >
                +49 123 456 789
              </a>
            </li>
            <li>Dresden, Germany</li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold">
            Follow Us
          </h3>
          <div class="flex items-center gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white transition hover:text-[#F97316]"
            >
              <Icon
                :name="social.icon"
                class="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-10 max-w-7xl border-t border-stone-700 pt-6 text-center text-sm text-stone-400">
        © Molana Shop {{ currentYear }}
      </div>
    </div>
  </footer>
</template>
