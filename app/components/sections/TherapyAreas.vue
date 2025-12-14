<template>
  <section
    id="areas"
    class="container m-auto flex min-h-screen flex-col items-center justify-center px-6 py-32">
    <!-- Section Header -->
    <div class="mb-16 grid grid-cols-3">
      <h2 class="mb-2 text-7xl">{{ areas.title }}</h2>
      <div></div>
      <p class="lead">
        {{ areas.subTitle }}
      </p>
    </div>

    <!-- Areas Grid -->
    <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(area, i) in areas.areas"
        :key="i"
        class="group bg-translucent flex flex-col rounded-4xl p-6 transition hover:bg-violet-50">
        <div class="relative m-auto mb-4 h-50 w-50 overflow-hidden">
          <img
            :src="area.image"
            :alt="area.name"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>

        <div class="flex flex-1 flex-col text-center">
          <div class="flexitems-center justify-center">
            <h3 class="mb-2 text-lg font-semibold">
              {{ area.name }}
            </h3>
          </div>
          <p class="leading-relaxed text-gray-600">
            {{ area.description }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="m-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-y-6">
      <h3 class="lead text-secondary text-center">
        {{ areas.contact }}
      </h3>

      <Button>{{ areas.ctaBtn }}</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import areas from '~/content/areas'
</script>
