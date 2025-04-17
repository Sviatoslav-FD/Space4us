<template>
  <AppDialog v-model="model">
    <template #header>
      <h2 class="text-lg font-semibold">Add new template</h2>
    </template>
    Add new template
  </AppDialog>
</template>

<script setup lang="ts">
import AppDialog from '@/components/shared/AppDialog.vue'

const model = defineModel<boolean>()
</script>
