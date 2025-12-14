<template>
  <section
    id="session"
    class="item-center m-auto my-32 flex min-h-screen max-w-7xl flex-col justify-center py-32">
    <div class="m-auto max-w-3xl text-center">
      <h2 class="mb-2">{{ how.title }}</h2>
      <p class="lead">{{ how.subTitle }}</p>
    </div>

    <div class="mt-32 flex flex-col gap-12">
      <div
        v-for="(phase, index) in how.phases"
        class="border-primary m-auto grid w-full max-w-2xl items-center gap-12 rounded-4xl border border-b p-12">
        <div class="flex flex-col">
          <div class="flex flex-col">
            <span class="mb-4 text-9xl font-bold text-violet-400/10">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="text-6xl tracking-wider">{{ phase.name }}</h3>
            <h4 class="mb-6">{{ phase.description }}</h4>
          </div>
        </div>

        <div class="flex flex-col">
          <p class="lead">{{ phase.info }}</p>
        </div>
      </div>
    </div>

    <div class="m-auto grid grid-cols-1 pt-12 md:grid-cols-3">
      <div
        v-for="practice in how.practices"
        class="border-primary border-r border-l px-12 first:border-0 last:border-0">
        <h4 class="text-tertiary mb-2 text-base font-semibold">
          {{ practice.name }}
        </h4>
        <p class="text-sm">{{ practice.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import how from '@/content/howItWorks'
</script>
