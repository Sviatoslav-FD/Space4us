<template>
  <label
    class="text-teal-500"
    :class="{ 'user-invalid:text-red-700': required && !model }"
  >
    <p v-if="label">{{ label }}<span v-if="required">*</span></p>
    <textarea
      v-model="model"
      :placeholder
      class="w-full p-1 border rounded focus:outline-none border-gray-300 placeholder:text-gray-300 focus:border-teal-500 min-w-2xs"
      :class="{ 'user-invalid:border-red-700': required && !model }"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  label?: string | null
  placeholder?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  label: null,
  placeholder: '',
  required: false,
})

const model = defineModel<string>()
</script>
