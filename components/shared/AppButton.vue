<template>
  <button :type class="cursor-pointer" :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'icon'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
})

const classes = computed<string>(() => {
  if (props.variant === 'secondary') {
    return 'text-purple-700 underline'
  }

  if (props.variant === 'danger') {
    return 'bg-red-500 text-gray-100 px-2 h-full'
  }

  if (props.variant === 'icon') {
    return 'px-2 bg-gray-200'
  }

  return 'rounded border px-2 border-gray-300 bg-purple-300 text-purple-700'
})
</script>
