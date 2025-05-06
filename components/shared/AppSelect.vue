<template>
  <div class="relative w-full text-teal-500">
    <p v-if="label">{{ label }}<span v-if="required">*</span></p>
    <button
      ref="buttonRef"
      class="p-1 rounded border border-gray-300 w-full text-left"
      @click="onToggleOptions"
    >
      <template v-if="model?.length">
        <template v-if="multiple">
          <p
            v-for="option in model"
            :key="String(option)"
            class="px-1 border rounded border-gray-200 mb-1 flex justify-between"
          >
            {{ setTitle(option) }}
            <span class="px-1" @click="onDeleteSelectedItem(option)">X</span>
          </p>
        </template>
        <span v-else>{{ setTitle() }}</span>
      </template>
      <span v-else class="text-gray-300">{{ placeholder }}</span>
    </button>
    <ul
      ref="optionsRef"
      class="absolute bg-gray-100 z-1 rounded border border-gray-200 w-full mt-1 max-h-83 overflow-y-auto shadow-lg"
      :class="{ hidden: !isOpen }"
    >
      <li
        v-for="option in options"
        :key="String(option)"
        class="border-t border-gray-200 p-1 hover:bg-teal-50 cursor-pointer"
        @click="onSelectOption(option)"
      >
        {{ option[title] || option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { clickOutside } from '@/helpers'

interface Props {
  options: any[]
  value?: string
  title?: string
  label?: string | null
  placeholder?: string
  multiple?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  value: 'id',
  title: 'title',
  label: null,
  placeholder: 'Select',
  multiple: false,
  required: false,
})

const model = defineModel<string[] | string>()

const isOpen = ref(false)

const onToggleOptions = (event: Event): void => {
  event.preventDefault()
  isOpen.value = !isOpen.value
}

const setTitle = (id?: string) => {
  if(typeof model.value === 'string') return model.value
  const value = id || model.value
  return props.options.find((i) => i[props.value] === value)?.[props.title]
}

const onSelectOption = (option: { [key: string]: string }): void => {
  const value = typeof option === 'object' ? option[props.value] : option

  if (props.multiple && Array.isArray(model.value)) {
    if (!model.value?.includes(value)) {
      model.value?.push(value)
    }
  } else {
    model.value = value
    console.log(model.value);
    isOpen.value = false
  }
}

const onDeleteSelectedItem = (value: string): void => {
  if (!Array.isArray(model.value)) return
  model.value = model.value?.filter((i) => i !== value)
}

const buttonRef = ref<HTMLElement | null>(null)
const optionsRef = ref<HTMLElement | null>(null)
onMounted(() => clickOutside([buttonRef.value, optionsRef.value], () => (isOpen.value = false)))
</script>
