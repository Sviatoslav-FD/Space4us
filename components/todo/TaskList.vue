<template>
  <ul
    class="overflow-x-hidden mx-2"
    @click="clickHandler"
  >
    <li
      v-for="task in tasks"
      :key="task.id"
      class="flex items-center border border-gray-100 my-2 bg-gray-50 h-10 relative cursor-pointer"
      :class="{ 'opacity-50': task.isDone }"
      @mouseover="hoveredItemId = task.id"
      @mouseleave="hoveredItemId = ''"
    >
      <AppCheckbox
        v-model="task.isDone"
        :label="task.title"
        :contenteditable="true"
        @on-change="() => onEditTask(task)"
      />
      <p class="shrink-0 truncate text-gray-300">
        {{ task.description }}
      </p>
      <TaskActions
        :id="task.id"
        :hovered-item-id
        :is-edit
        :is-delete
        :is-drag
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TaskItem } from '@/types/index'
import TaskActions from '@/components/todo/TaskActions.vue'

import { useTodoList } from '@/composables/use.todo-list'

const { onEditTask } = useTodoList()

interface Props {
  tasks: TaskItem[]
  isEdit?: boolean
  isDelete?: boolean
  isDrag?: boolean
  clickHandler?: (payload: Event) => void
}

withDefaults(defineProps<Props>(), {
  isEdit: true,
  isDelete: true,
  isDrag: true,
  clickHandler: () => {},
})

const hoveredItemId = ref<string>('')
</script>
