<template>
  <section class="relative h-[220vh]">
    <div class="sticky top-0 flex h-screen items-center justify-center">
      <!-- Text -->
      <div class="relative z-10 text-center">
        <div class="mask-line">
          <h1 class="hero-title">STUDIO3266</h1>
        </div>

        <div class="mask-line mt-4">
          <p class="lead">
            A curated hair experience set in a private studio space
          </p>
        </div>
      </div>

      <!-- Video -->
      <div
        ref="videoWrapper"
        class="video-wrapper pointer-events-none absolute inset-0 flex items-center justify-center">
        <video
          ref="videoEl"
          src="/video-test.mp4"
          muted
          playsinline
          class="video-el" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const videoEl = ref<HTMLVideoElement | null>(null)
const videoWrapper = ref<HTMLElement | null>(null)
const sectionEl = ref<HTMLElement | null>(null)

let introTl: gsap.core.Timeline | null = null
let scrollTl: gsap.core.Timeline | null = null

onMounted(async () => {
  await nextTick()

  // TEXT INTRO (as-is)
  introTl = gsap.timeline()

  introTl.fromTo(
    '.hero-title',
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 3,
      ease: 'expo.out',
    },
  )

  introTl.fromTo(
    '.lead',
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 1.6,
      ease: 'expo.out',
    },
    '-=2.6',
  )

  // PINNED SCROLL ANIMATION TIMELINE
  scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  })

  // VIDEO ZOOM IN
  scrollTl.to(videoWrapper.value, { scale: 1, opacity: 1, ease: 'none' }, 0)

  // TEXT ZOOM OUT
  scrollTl.to(
    ['.hero-title', '.lead'],
    {
      scale: 0.92,
      opacity: 0.1,
      ease: 'none',
    },
    0,
  )

  // PLAY VIDEO AT END
  scrollTl.call(() => {
    if (videoEl.value && videoEl.value.paused) {
      videoEl.value.play()
    }
  })
})

onBeforeUnmount(() => {
  introTl?.kill()
  scrollTl?.kill()
  ScrollTrigger.getAll().forEach((st) => st.kill())
})
</script>
