<template>
  <section
    class="relative -mx-6 -mt-5 overflow-hidden bg-[#FFF7ED]"
    aria-labelledby="hero-heading"
  >
    <!-- Soft orange blobs -->
    <div
      class="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#F97316]/35 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#FDBA74]/55 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[#F97316]/25 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl px-6 py-4 md:px-10 md:py-5 lg:py-7">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div class="max-w-xl">
          <h1
            id="hero-heading"
            class="text-4xl font-bold tracking-tight text-[#111827] md:text-5xl lg:text-6xl"
          >
            New Collection
          </h1>
          <p class="mt-5 text-xl font-bold text-[#EF4444] md:text-2xl lg:text-3xl">
            Modern Shopping Made Simple
          </p>
          <p class="mt-7 max-w-md text-sm leading-relaxed text-[#374151] md:text-base">
            Discover clean and modern products with a smooth shopping experience.
          </p>
          <NuxtLink
            to="/products"
            class="mt-8 inline-flex items-center justify-center rounded-md bg-[#F97316] px-8 py-3 text-md font-semibold text-white shadow-sm transition hover:bg-[#ea580c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
          >
            Shop Now
          </NuxtLink>
        </div>

        <div class="relative mx-auto h-64 w-full max-w-md overflow-hidden md:h-80 lg:mx-0 lg:ml-auto lg:h-96 lg:max-w-xl">
          <img
            src="/images/hero-product.png"
            alt=""
            class="pointer-events-none absolute right-0 top-1/2 h-[115%] w-auto max-w-none -translate-y-1/2 translate-x-8 object-contain opacity-20 select-none"
            aria-hidden="true"
          />
          <img
            src="/images/hero-product.png"
            class="relative z-10 ml-auto h-full w-auto max-w-full object-contain object-right drop-shadow-xl"
            alt="J'adore Dior fragrance collection"
          />
        </div>
      </div>
    </div>
  </section>
</template>
