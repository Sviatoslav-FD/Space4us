<template>
  <div v-if="isLoading" class="fixed w-full h-full top-0 z-50 bg-white/30 backdrop-invert backdrop-opacity-30 flex items-center justify-center">
    <div class="w-15 h-15 bg-teal-100 rounded-full pulse" />
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '@/composables/use.fetch'
const { isLoading } = useFetch()
</script>

<style scoped>
.pulse {
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}
</style>