<script setup lang="ts">
import { Bell, Menu } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'openMenu'): void
  (e: 'openNotifications'): void
}>()
</script>

<template>
  <!-- App-style top bar -->
  <div
    class="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur"
    style="padding-top: env(safe-area-inset-top)">
    <div class="mx-auto max-w-5xl px-4 py-3 sm:px-6">
      <div class="flex items-center justify-between">
        <!-- Logo placeholder -->
        <div
          class="h-9 w-9 rounded-xl border border-neutral-800 bg-neutral-900/40"
          aria-label="Logo" />

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/30 transition hover:bg-neutral-900/60"
            aria-label="Notifications"
            @click="emit('openNotifications')">
            <Bell class="h-5 w-5 text-neutral-200" />
          </button>

          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/30 transition hover:bg-neutral-900/60"
            aria-label="Menu"
            @click="emit('openMenu')">
            <Menu class="h-5 w-5 text-neutral-200" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
