<script setup lang="ts">
type Align = 'start' | 'end'
type Side = 'bottom' | 'top'

const props = withDefaults(
  defineProps<{
    align?: Align
    side?: Side
    offset?: number
    closeOnSelect?: boolean
    panelClass?: string
  }>(),
  {
    align: 'end',
    side: 'bottom',
    offset: 8,
    closeOnSelect: true,
    panelClass: '',
  },
)

const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}

function onDocumentPointerDown(e: Event) {
  if (!isOpen.value) return
  const root = rootEl.value
  if (!root) return
  const t = e.target as Node | null
  if (t && root.contains(t)) return
  close()
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown, {
    passive: true,
  })
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
})

const panelPosClass = computed(() => {
  const sideClass = props.side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
  const alignClass = props.align === 'start' ? 'left-0' : 'right-0'
  return `${sideClass} ${alignClass}`
})

function maybeCloseAfterSelect() {
  if (props.closeOnSelect) close()
}
</script>

<template>
  <div ref="rootEl" class="relative inline-flex">
    <slot
      name="trigger"
      :open="isOpen"
      :toggle="toggle"
      :openMenu="open"
      :close="close" />

    <div
      v-if="isOpen"
      class="absolute z-50 min-w-48 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-1 shadow-xl backdrop-blur"
      :class="[panelPosClass, props.panelClass]"
      :style="{
        marginTop: props.side === 'bottom' ? props.offset + 'px' : undefined,
        marginBottom: props.side === 'top' ? props.offset + 'px' : undefined,
      }">
      <slot :close="close" :select="maybeCloseAfterSelect" />
    </div>
  </div>
</template>
