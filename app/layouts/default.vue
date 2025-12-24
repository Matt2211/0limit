<template>
  <Menu />

  <slot />

  <Footer />
</template>

<script setup lang="ts">
import Menu from '~/components/sections/Menu.vue'
import Footer from '~/components/sections/Footer.vue'
</script>
