<template>
  <div class="px-2">
    <ToDoAddForm />
  </div>

  <div class="text-sm flex">
    <AppButton
      variant="dialog"
      @click="onAddTaskFormSubmit"
    >
      {{ isTaskEdit ? 'Edit' : 'Add' }}
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
</template>

<script lang="ts" setup>
import ToDoAddForm from '@/components/todo/ToDoAddForm.vue'

import { useTodoList } from '@/composables/use.todo-list'

const { isTaskEdit, isTaskAddDialogOpen, onAddTaskFormSubmit, onClearForm } = useTodoList()

function onCancelForm(): void {
  isTaskAddDialogOpen.value = false
  onClearForm()
}
</script>
