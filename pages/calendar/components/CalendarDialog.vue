<template>
  <div class="h-full flex flex-col">
    <div class="p-2 text-center font-semibold bg-teal-50">
      {{ selectedDay.toLocaleString('default', { weekday: 'long' }) }}
      {{ selectedDay.getDate() }}
      {{ selectedDay.toLocaleString('default', { month: 'long' }) }}
      {{ selectedDay.getFullYear() }}
    </div>

    <AppButton
      variant="dialog"
      @click="onAddItem"
    >
      Add item
    </AppButton>

    <div class="flex-1 overflow-y-auto">
      <TaskList
        v-if="items.length"
        :tasks="items"
        :is-edit="false"
        :is-drag="false"
      />
      <div
        v-else
        class="text-gray-300 h-full flex items-center justify-center"
      >
        No items yet for this day.
      </div>
    </div>

    <div class="text-sm flex">
      <AppButton
        variant="dialog"
        @click="onSaveItems"
      >
        Add
      </AppButton>

      <AppButton
        variant="dialog"
        @click="onClearForm"
      >
        Clear
      </AppButton>

      <AppButton
        variant="dialog"
        @click="onCancelForm"
      >
        Cancel
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TaskItem } from '@/types/index'
import TaskList from '@/components/todo/TaskList.vue'

import { useTodoList } from '@/composables/use.todo-list'
import { useCalendar } from '@/composables/use.calendar'

const { selectedDay, isCalendarDialogOpen } = useCalendar()

const items = ref<TaskItem[]>([])

const onAddItem = (): void => {
  const { defaultItem } = useTodoList()
  items.value.push({ ...defaultItem, id: crypto.randomUUID(), date: selectedDay.value.toLocaleDateString(), title: 'New item' })
}

const onGetDailyTasks = async (): Promise<void> => {
  try {
    const { fetchData } = useFetch()
    items.value = await fetchData(`/daily?date=${selectedDay.value.toLocaleDateString()}`)
  }
  catch (error) {
    console.error('Error fetching daily tasks:', error)
  }
}

const onSaveItems = async (): Promise<void> => {
  try {
    const { fetchData } = useFetch()
    await fetchData('/daily/add', 'POST', items.value)
  }
  catch (error) {
    console.error('Error saving daily tasks:', error)
  }
}

const onClearForm = (): void => {
  items.value = []
}

const onCancelForm = (): void => {
  isCalendarDialogOpen.value = false
}

onMounted(onGetDailyTasks)
</script>
