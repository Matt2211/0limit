<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :type="component === 'button' ? type : undefined"
    :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

const props = defineProps<{
  variant?: 'solid' | 'outline' | 'basic'
  type?: 'button' | 'submit' | 'reset'
  to?: string
  href?: string
}>()

const component = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

const baseClasses =
  'inline-flex items-center justify-center font-jet-brains-mono uppercase transition-opacity hover:opacity-80'

const variants = {
  solid: 'bg-inverted text-inverted px-6 py-2',
  outline: 'border border-primary text-primary px-6 py-2',
  basic: 'text-primary',
}

const classes = computed(
  () => `${baseClasses} ${variants[props.variant || 'solid']}`,
)

const type = props.type ?? 'button'
</script>
