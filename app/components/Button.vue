<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'solid' | 'outline' | 'basic'
  type?: 'button' | 'submit' | 'reset'
}>()

const baseClasses =
  ' rounded-full py-3 px-8  font-jet-brains-mono tracking-widest text-sm transtion-all duration-500 cursor-pointer'

const variants = {
  solid: 'bg-quaternary text-primary hover:opacity-80 ',
  outline: 'border border-tertiary text-primary hover:bg-quaternary',
  basic: 'bg-transparent text-accent',
}

const classes = computed(
  () => `${baseClasses} ${variants[props.variant || 'solid']}`,
)
const type = props.type ?? 'button'
</script>
