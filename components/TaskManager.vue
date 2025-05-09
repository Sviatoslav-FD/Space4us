<template>
  <template v-if="tasks.length">
    <ToDoSettings />
    <AppTabs>
      <AppTab
        v-for="category in categories"
        :key="category"
        :active="selectedCategory === category"
        @click="onTabSelected(category)">
        {{ category }}
        <span class="bg-teal-200 rounded p-1">{{ categoriesAmount[category] }}</span>
      </AppTab>
    </AppTabs>
  
    <TaskList :filter="selectedCategory" />
  
    <TaskAddButton @click.stop="isTaskAddDialogOpen = true" />
  </template>

  <template v-else>
    <div class="text-center">
      <p class="my-10 text-teal-300 text-2xl">No tasks available</p>
      <AppButton @click.stop="isTaskAddDialogOpen = true">Add your first task</AppButton>
    </div>
  </template>
  
  <TaskAddDialog v-model="isTaskAddDialogOpen" />
</template>

<script setup lang="ts">
import ToDoSettings from '@/components/todo/ToDoSettings.vue'
import TaskList from '@/components/todo/TaskList.vue'
import TaskAddButton from '@/components/todo/TaskAddButton.vue'
import TaskAddDialog from '@/components/todo/TaskAddDialog.vue'
import AppTabs from '@/components/shared/AppTabs.vue'
import AppTab from '@/components/shared/AppTab.vue'
import AppButton from '@/components/shared/AppButton.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { tasks, isTaskAddDialogOpen, selectedCategory, categories, getTasks } = useTodoList()

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

onMounted(() => getTasks())
</script>
