<template>
  <section
    class="page flex min-h-screen items-center justify-center overflow-hidden">
    <div class="reveal grid w-6xl grid-cols-1 gap-24 md:grid-cols-2">
      <div v-for="(member, index) in team.team" :key="member.name">
        <img :src="member.img" class="mb-12 w-[250px]" :alt="member.name" />
        <h2 class="mb-2 text-4xl">{{ member.name }}</h2>
        <h3 class="mb-4">{{ member.role }}</h3>
        <p class="mb-4">{{ member.descriptionOne }}</p>
        <p class="mb-12">{{ member.descriptionTwo }}</p>

        <div class="flex items-center justify-between">
          <a
            target="_blank"
            :href="`https://www.instagram.com/${member.social}`"
            class="text-primary">
            <div class="flex items-center gap-x-2">
              <Instagram :size="22" :stroke-width="1.5" />
              <span class="font-jet-brains-mono text-sm">{{
                member.social
              }}</span>
            </div>
          </a>

          <!-- <Button>Book now</Button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import team from '~/content/team'
import { Instagram } from 'lucide-vue-next'

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
