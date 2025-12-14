<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-999 flex items-center justify-center backdrop-blur-3xl">
      <div
        ref="modalWrapper"
        class="modal-wrapper border-primary relative w-full max-w-xl rounded-xl border bg-neutral-50/90 p-6 backdrop-blur-sm md:p-12">
        <div
          v-if="view === 'form'"
          class="mb-12 flex items-baseline justify-between">
          <h3 class="text-primary font-jet-brains-mono font-medium">
            Book a callback
          </h3>
          <button
            class="hover:text-secondary text-tertiary cursor-pointer transition"
            @click="closeModal">
            <span class="sr-only">Close</span>
            <X :size="18" />
          </button>
        </div>

        <div v-if="view === 'form'">
          Form here: Name - Required Last name - Required Email - Required Phone
          - Required day 1 time 1 time 2 day 2 time 2 time 2 message - optional
          submit
        </div>
        <div
          v-else-if="view === 'success-contact'"
          class="space-y-2 text-center">
          <p class="text-lg font-semibold">Thank you.</p>
          <p>I will get back to you as soon as possible</p>
        </div>
        <div v-else-if="view === 'error-contact'" class="space-y-2 text-center">
          <p class="text-lg font-semibold">Oops! Something went wrong...</p>
          <p>
            I'll take a look of it. In the meantime, please refresh and try
            again, or contact me via LinkedIn.
          </p>
        </div>

        <NuxtLink
          v-if="view === 'success-contact' || view === 'error-contact'"
          to="/"
          class="flex items-center"
          @click="closeModal">
          <Button class="m-auto mt-12">Home</Button>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

import gsap from 'gsap'

// State
const isOpen = ref<boolean>(false)
const view = ref<'form' | 'success-contact' | 'error-contact'>('form')

// Refs
const modalWrapper = ref<HTMLElement | null>(null)

// Methods
const openModal = (): void => {
  isOpen.value = true
  view.value = 'form'
  document.body.classList.add('overflow-hidden')
  nextTick(() => {
    if (modalWrapper.value) {
      gsap.from(modalWrapper.value, {
        scale: 1.1,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  })
}

const closeModal = (): void => {
  isOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

const handleViewChange = (
  viewName: 'form' | 'success-contact' | 'error-contact',
): void => {
  view.value = viewName
}

// Cleanup
onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})

// Expose
defineExpose({ openModal, closeModal })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
