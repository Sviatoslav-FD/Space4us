<template>
  <div class="flex justify-between rounded border border-teal-300 p-1 mx-2 bg-teal-50 mt-2">
    <AppSelect
      v-for="item in settings"
      :key="item.title"
      v-model="view"
      :options="item.options"
      @click.stop="item.fn"
    >
      <component :is="item.icon" />
    </AppSelect>

    <AddTemplate v-model="isAddTemplateOpen" />
  </div>
</template>

<script setup lang="ts">
import AddTemplate from '@/components/todo/AddTemplate.vue'

import IconTemplate from '@/components/icons/IconTemplate.vue'
import IconView from '@/components/icons/IconView.vue'
import IconClear from '@/components/icons/IconClear.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

import { useTodoList } from '@/composables/use.todo-list'

const { view, onDeleteItems } = useTodoList()

const settings = [
  {
    title: 'Add template',
    icon: IconTemplate,
    options: [],
    fn: () => {
      isAddTemplateOpen.value = true
    },
  },
  {
    title: 'View',
    icon: IconView,
    options: [
      { id: 'list', title: 'List' },
      { id: 'category', title: 'Category' },
      { id: 'daily', title: 'Daily' },
    ],
    fn: () => [],
  },
  {
    title: 'Settings',
    icon: IconSettings,
    options: [],
    fn: () => console.log('Settings'),
  },
  {
    title: 'Clear tasks',
    icon: IconClear,
    options: [],
    fn: () => onDeleteItems('clear'),
  },
]

const isAddTemplateOpen = ref(false)
</script>
