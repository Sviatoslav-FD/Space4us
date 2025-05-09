<template>
  <ul class="overflow-x-hidden mx-2" @click="onListClickHandler">
    <li
      v-for="task in filteredTasks"
      :key="task.id"
      class="flex items-center border border-gray-100 my-2 bg-gray-50 h-10 relative"
      :class="{ 'opacity-50': task.isDone }"
      @mouseover="hoveredItemId = task.id"
      @mouseleave="hoveredItemId = ''"
    >
      <AppCheckbox
        v-model="task.isDone"
        :label="task.title"
        :contenteditable="true"
        @onChange="() => onEditTask(task)"
      />
      <p class="shrink-0 truncate text-gray-300">{{ task.description }}</p>
      <TaskActions :task :hoveredItemId />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppCheckbox from '@/components/shared/AppCheckbox.vue'
import TaskActions from '@/components/todo/TaskActions.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { filteredTasks, onEditTask, onListClickHandler } = useTodoList()

const hoveredItemId = ref<string>('')
</script>
