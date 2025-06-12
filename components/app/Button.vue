<template>
  <button
    :type
    class="cursor-pointer select-none"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'icon' | 'dialog'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
})

const classes = computed<string>(() => {
  if (props.variant === 'secondary') {
    return 'text-teal-500 underline'
  }

  if (props.variant === 'danger') {
    return 'bg-red-500 text-gray-100 px-2 h-full'
  }

  if (props.variant === 'icon') {
    return 'px-2 bg-gray-200'
  }

  if (props.variant === 'dialog') {
    return 'rounded px-4 py-2 cursor-pointer hover:bg-teal-100 w-full'
  }

  return 'rounded border px-2 border-gray-300 bg-teal-300 text-teal-500'
})
</script>
