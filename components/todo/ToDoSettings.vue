<template>
  <div class="flex justify-between rounded border border-teal-300 p-1 mx-2 bg-teal-50 mt-2">
    <AppButton
      v-for="item in settings.left"
      :key="item.title"
      variant="secondary"
      class="ml-2"
      :title="item.title"
      @click.stop="item.fn"
    >
      <component :is="item.icon" />
    </AppButton>

    <AppButton
      v-for="item in settings.right"
      :key="item.title"
      variant="secondary"
      class="ml-2"
      :title="item.title"
      @click.stop="item.fn"
    >
      <component :is="item.icon" />
    </AppButton>

    <AddTemplate v-model="isAddTemplateOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppButton from '@/components/shared/AppButton.vue'
import AddTemplate from '@/components/todo/AddTemplate.vue'

import IconTemplate from '@/components/icons/IconTemplate.vue'
import IconView from '@/components/icons/IconView.vue'
import IconClear from '@/components/icons/IconClear.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { onDeleteItems } = useTodoList()

const settings = {
  left: [
    {
      title: 'Add template',
      icon: IconTemplate,
      fn: () => {
        isAddTemplateOpen.value = true
      },
    },
  ],
  right: [
    {
      title: 'View',
      icon: IconView,
      fn: () => console.log('View'),
    },
    {
      title: 'Settings',
      icon: IconSettings,
      fn: () => console.log('Settings'),
    },
    {
      title: 'Clear tasks',
      icon: IconClear,
      fn: () => onDeleteItems('clear'),
    },
  ],
}

const isAddTemplateOpen = ref(false)
</script>
