<template>
  <dialog ref="dialogRef" :open="model" class="border rounded border-teal-300 top-1/2 mx-auto z-10 text-teal-500 bg-teal-50">
    <header class="p-1 text-center font-semibold">
      <slot name="header" />
    </header>

    <!-- Main content -->
    <slot />

    <footer class="text-sm">
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { clickOutside } from '@/helpers'

const model = defineModel<boolean>()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(model, (newValue) => {
  if (newValue) {
    const dialogs = document.getElementsByTagName('dialog')
    for (var i=0, max=dialogs.length; i < max; i++) {
      if (dialogs[i] !== dialogRef.value) {
        dialogs[i].close()
      }
    }
  };
})

onMounted(() => clickOutside([dialogRef.value], () => model.value = false))
</script>
