<template>
  <label class="text-purple-700 w-full" :class="{ 'text-red-600': required && !model }">
    <p v-if="label">{{ label }}<span v-if="required">*</span></p>
    <input
      v-model="model"
      :type
      :required
      :placeholder
      class="w-full p-1 border rounded focus:outline-none border-gray-300 placeholder:text-gray-300 focus:border-purple-700"
      :class="{ 'border-red-600': required && !model }"
    />
  </label>
</template>

<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

interface Props {
  label?: string | null
  type?: InputTypeHTMLAttribute
  placeholder?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  label: null,
  type: 'text',
  placeholder: '',
  required: false,
})

const model = defineModel()
</script>
