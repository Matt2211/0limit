<template>
  <div
    class="bottom-0 grid w-full grid-cols-2 items-end justify-between px-4 max-md:pb-20 md:fixed md:py-4 lg:px-12">
    <div class="flex flex-col">
      <!-- <a
        target="_blank"
        href="https://www.instagram.com/studio.3266"
        class="text-primary">
        <div class="flex items-center gap-x-1">
          <Instagram :size="22" />
          <span class="font-jet-brains-mono text-sm">studio.3266</span>
        </div>
      </a> -->
      <a
        target="_blank"
        href="https://www.google.com/maps/dir//Ducie+House,+Unit+300,+37+Ducie+St,+Manchester+M1+2JW/@53.4904832,-2.2249472,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x487bb1bc54ec4a9d:0x1c777a9876254306!2m2!1d-2.2287826!2d53.4805683?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D">
        <h5>
          Ducie House, Unit 300,
          <span class="block">37 Ducie St, Manchester M1 2JW</span>
        </h5>
      </a>
    </div>

    <div class="flex items-center justify-end gap-x-2 text-right">
      <h6>Site by</h6>

      <a target="_blank" href="https://www.matteofelicidesign.com/">
        <div
          class="bg-inverted text-inverted flex h-6! w-6! items-center justify-center text-xs font-semibold hover:animate-pulse">
          MF
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Instagram } from 'lucide-vue-next'
</script>
