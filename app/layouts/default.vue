<template>
  <MenuDesktop class="max-md:hidden" />
  <MenuMobile class="md:hidden" />

  <slot />
  <div class="bottom-4 w-full px-4 max-md:fixed md:hidden">
    <Button
      href="https://www.fresha.com/a/studio-3266-manchester-ducie-house-37-ducie-street-uugc92k7/all-offer?menu=true&pId=2559796&utm_content=link_in_bio&utm_medium=social&utm_source=ig"
      target="_blank"
      class="w-full"
      >BOOK NOW</Button
    >
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '~/components/sections/Footer.vue'
import MenuDesktop from '~/components/sections/MenuDesktop.vue'
import MenuMobile from '~/components/sections/MenuMobile.vue'
</script>
