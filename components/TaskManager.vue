<template>
  <template v-if="tasks.length">
    <ToDoSettings />

    <AppTabs v-if="view === 'category'">
      <AppTab
        v-for="category in categories"
        :key="category"
        :active="selectedCategory === category"
        @click="onTabSelected(category)">
        {{ category }}
        <span class="bg-teal-200 rounded p-1">{{ categoriesAmount[category] }}</span>
      </AppTab>
    </AppTabs>

    <TaskList v-if="view === 'list'" :filter="selectedCategory" :tasks="filteredTasks" />

    <template v-else-if="view === 'daily'">
      <div v-for="date in dates">
        <p class="m-2 text-teal-300 font-semibold text-lg border-b border-teal-300">
          {{ date }}
        </p>
        <TaskList
          :tasks="tasksByDate(date)"
        />
      </div>
    </template>
  
    <TaskAddButton @click.stop="isTaskAddDialogOpen = true" />
  </template>

  <template v-else-if="!isLoading">
    <div class="text-center">
      <p class="my-10 text-teal-300 text-2xl">No tasks available</p>
      <AppButton @click.stop="isTaskAddDialogOpen = true">Add your first task</AppButton>
    </div>
  </template>
  
  <TaskAddDialog v-model="isTaskAddDialogOpen" />

  <AppLoading />
</template>

<script setup lang="ts">
import ToDoSettings from '@/components/todo/ToDoSettings.vue'
import TaskList from '@/components/todo/TaskList.vue'
import TaskAddButton from '@/components/todo/TaskAddButton.vue'
import TaskAddDialog from '@/components/todo/TaskAddDialog.vue'
import AppLoading from '@/components/todo/AppLoading.vue'
import AppTabs from '@/components/shared/AppTabs.vue'
import AppTab from '@/components/shared/AppTab.vue'
import AppButton from '@/components/shared/AppButton.vue'

import { useTodoList } from '@/composables/use.todo-list'
import { useFetch } from '@/composables/use.fetch'
const { tasks, filteredTasks, isTaskAddDialogOpen, selectedCategory, categories, dates, view, getTasks } = useTodoList()
const { isLoading } = useFetch()

function onTabSelected (category: string): void {
  if (selectedCategory.value === category) {
    selectedCategory.value = ''
  } else {
    selectedCategory.value = category
  }
}

const categoriesAmount = computed(() => {
  return categories.value.reduce((acc, category) => {
    acc[category] = tasks.value.filter((task) => task.category === category && !task.isDone).length
    return acc
  }, {} as Record<string, number>)
})

const tasksByDate = (date: string) => {
  if (date === 'No date') {
    return tasks.value.filter(task => !task.date)
  }

  return tasks.value.filter(task => {
    if (!task.date) return
    return new Date(task.date).toLocaleDateString() === date
  })
}

onMounted(getTasks)
</script>
