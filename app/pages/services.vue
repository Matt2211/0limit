<template>
  <section
    class="page flex min-h-screen items-center justify-center overflow-hidden">
    <div class="reveal grid w-6xl grid-cols-1 gap-12 md:grid-cols-2">
      <!-- LEFT VISUAL PLACEHOLDER -->
      <div class="relative aspect-square w-full overflow-hidden">
        <img
          ref="imageEl"
          :src="activeImage"
          alt=""
          class="absolute inset-0 h-full w-full object-cover" />
      </div>

      <!-- SERVICES ACCORDION -->
      <div class="flex flex-col gap-6">
        <div
          v-for="(service, index) in services.services"
          :key="service.name"
          class="border-translucent border-b pb-3">
          <!-- HEADER -->
          <button
            class="flex w-full cursor-pointer items-center justify-between text-left"
            @click="toggle(index)">
            <h2 class="tracking-widest uppercase">
              {{ String(index + 1).padStart(2, '0') }}. {{ service.name }}
            </h2>

            <component
              :is="openIndex === index ? Minus : Plus"
              :size="22"
              class="text-primary" />
          </button>

          <!-- CONTENT -->
          <div v-if="openIndex === index && service.description" class="mt-3">
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import services from '~/content/services'
import { Plus, Minus } from 'lucide-vue-next'
import { computed, ref, watch, nextTick } from 'vue'

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const DEFAULT_IMAGE = '/studio.png'

const activeImage = computed(() => {
  if (openIndex.value === null) return DEFAULT_IMAGE
  return services.services[openIndex.value]?.img || DEFAULT_IMAGE
})

const imageEl = ref<HTMLImageElement | null>(null)

watch(activeImage, async () => {
  await nextTick()
  if (!imageEl.value) return

  gsap.fromTo(
    imageEl.value,
    { opacity: 0, scale: 3 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    },
  )
})

let introTween: gsap.core.Tween | null = null

onMounted(() => {
  introTween = gsap.fromTo(
    '.reveal > *',
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
    },
  )
})

onBeforeUnmount(() => {
  introTween?.kill()
})
</script>
