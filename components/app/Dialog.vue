<template>
  <dialog
    ref="dialogRef"
    class="h-auto md:h-1/2 w-96 mx-auto rounded md:top-1/4 text-teal-500 backdrop:bg-opacity-10 outline-none"
    @keydown.esc.prevent
  >
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { clickOutside } from '@/helpers'

const model = defineModel<boolean>()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(model, v => dialogRef.value?.[v ? 'showModal' : 'close']())

onMounted(() => clickOutside([dialogRef.value], () => model.value = false))
</script>
