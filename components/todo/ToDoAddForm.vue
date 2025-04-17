<template>
  <form
    class="border rounded-b border-t-0 p-2 border-gray-300 bg-gray-50 mb-2"
    @submit.prevent="onAddTaskFormSubmit"
  >
    <div class="grid grid-cols-2 gap-1 mb-1">
      <AppInput v-model="formTask.title" placeholder="What to do?" required />
      <AppInput v-model="formTask.category" placeholder="Any category?" />
      <AppSelect
        v-model="formTask.dependencies"
        placeholder="Depends on"
        :options="tasks"
        multiple
      />
    </div>

    <AppTextarea v-model="formTask.description" placeholder="Describe details here" />

    <div class="flex justify-between">
      <AppButton variant="secondary" @click="onClearForm">Clear form</AppButton>

      <div>
        <AppButton v-if="isTaskEdit" type="submit">Edit</AppButton>
        <AppButton v-else type="submit">Add</AppButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from '@/components/shared/AppInput.vue'
import AppSelect from '@/components/shared/AppSelect.vue'
import AppTextarea from '@/components/shared/AppTextarea.vue'
import AppButton from '@/components/shared/AppButton.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { tasks, formTask, isTaskEdit, onAddTaskFormSubmit, onClearForm } = useTodoList()
</script>
