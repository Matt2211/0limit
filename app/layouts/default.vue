<script setup lang="ts">
import { usePlanner } from '~/composables/usePlanner'

type Tab = 'today' | 'progress' | 'routine' | 'meals' | 'backup'

// shared state usato sia dal layout che dalla pagina
const tab = useState<Tab>('app_tab', () => 'today')

const { isSetupComplete } = usePlanner()
</script>

<template>
  <!-- Top nav sempre visibile (anche durante Setup) -->
  <AppTopNav />

  <slot />

  <!-- Bottom nav solo dopo Setup -->
  <ClientOnly>
    <AppTabNav v-if="isSetupComplete" v-model="tab" />
  </ClientOnly>
</template>
