<template>
  <section>
    <div class="bg-primary m-auto max-w-3xl">
      <div class="z-10 flex min-h-screen overflow-hidden bg-white">
        <div
          class="calendly-inline-widget min-w-[320px] flex-1"
          data-url="https://calendly.com/admin-therapyforyou/30min?hide_gdpr_banner=1&primary_color=d8b9ff"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'booking-layout',
})

import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.head.appendChild(script)
})
</script>
