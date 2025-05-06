<template>
  <form @submit.prevent="onAddTaskFormSubmit">
    <div class="grid grid-cols-3 gap-1 mb-1">
      <AppInput v-model="formTask.title" placeholder="What to do?*" required ref="taskTitleRef" />
      <AppSelect
        v-model="formTask.category"
        placeholder="Any category?"
        :options="categories"
      />
      <AppSelect
        v-model="formTask.dependencies"
        placeholder="Depends on"
        :options="tasks"
        multiple
      />
    </div>

    <AppTextarea v-model="formTask.description" placeholder="Describe details here" />
  </form>
</template>

<script setup lang="ts">
import AppInput from '@/components/shared/AppInput.vue'
import AppSelect from '@/components/shared/AppSelect.vue'
import AppTextarea from '@/components/shared/AppTextarea.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { tasks, formTask, isTaskEdit, categories, onAddTaskFormSubmit } = useTodoList()

const taskTitleRef = ref<HTMLElement | null>(null)
</script>
