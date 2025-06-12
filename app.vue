<template>
  <div class="w-full mx-auto max-w-7xl h-dvh flex flex-col max-h-dvh text-sm">
    <AppHeader />

    <main class="mt-13 h-full">
      <NuxtPage />
    </main>

    <AppDialog v-model="isAppDialogOpen">
      <component :is="appDialogComponent" />
    </AppDialog>

    <AppLoading />
  </div>
</template>

<script lang="ts" setup>
import CalendarDialog from '@/pages/calendar/components/CalendarDialog.vue'
import TaskAddDialog from '@/components/todo/TaskAddDialog.vue'

import { useCalendar } from '@/composables/use.calendar'
import { useTodoList } from '@/composables/use.todo-list'

const { isCalendarDialogOpen } = useCalendar()
const { isTaskAddDialogOpen } = useTodoList()

const appDialogComponent = computed(() => {
  if (isCalendarDialogOpen.value) {
    return CalendarDialog
  }
  else if (isTaskAddDialogOpen.value) {
    return TaskAddDialog
  }
  else {
    return null
  }
})

const isAppDialogOpen = computed(() => Boolean(appDialogComponent.value))
</script>
