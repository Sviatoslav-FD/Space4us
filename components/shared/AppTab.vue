<template>
    <button
      class="w-full p-2 hover:bg-teal-100 hover:cursor-pointer not-last:border-r border-teal-300 text-nowrap"
      :class="{ 'bg-teal-100': active }"
    >
      <slot />
    </button>
</template>

<script lang="ts" setup>
interface Props {
  active: boolean
}

withDefaults(defineProps<Props>(), {
  active: false
})
</script>
