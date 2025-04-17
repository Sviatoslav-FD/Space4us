<template>
  <dialog ref="dialogRef" :open="model" class="border rounded border-gray-300 mx-auto z-10">
    <header class="border-b p-1 bg-gray-100 border-gray-300">
      <slot name="header" />
    </header>

    <!-- Main content -->
    <slot />

    <footer class="border-b p-1 bg-gray-100 border-gray-300">
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { clickOutside } from '@/helpers'

const model = defineModel<boolean>()

const dialogRef = ref<HTMLDialogElement | null>(null)
onMounted(() => clickOutside([dialogRef.value], () => (model.value = false)))
</script>
