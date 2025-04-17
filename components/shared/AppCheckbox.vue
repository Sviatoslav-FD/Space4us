<template>
  <label class="inline-flex items-center p-2">
    <input v-model="model" type="checkbox" class="invisible w-0" @input="onInputHandler" />

    <div
      class="inline-block w-4 h-4 border rounded"
      :class="model ? 'border-purple-700 bg-purple-700' : 'border-gray-300 bg-white'"
    >
      <IconCheck class="h-full mx-auto" />
    </div>

    <span
      :contenteditable
      class="ml-2 px-1 text-nowrap"
      :class="model ? 'line-through' : 'text-purple-700'"
      @click.prevent
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'

interface Props {
  label: string
  contenteditable?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  contenteditable: false,
})

const emit = defineEmits<{
  (e: 'onChange', value: boolean): void
}>()

const model = defineModel<boolean>()

const onInputHandler = (event: Event): void => {
  const target = event.target as HTMLInputElement
  model.value = target.checked
  emit('onChange', model.value)
}
</script>

<style scoped>
[contenteditable]:focus {
  outline: 1px solid rgb(241, 241, 241);
}
</style>
