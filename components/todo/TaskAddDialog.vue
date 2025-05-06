<template>
  <AppDialog v-model="model">
    <div class="px-2">
      <ToDoAddForm />
    </div>

    <template #footer>
      <div class="border-t">
        <button class="rounded px-4 py-2 cursor-pointer hover:bg-teal-100 w-1/3" @click="onAddTaskFormSubmit">
          {{ isTaskEdit ? 'Edit' : 'Add' }}
        </button>
        <button class="rounded px-4 py-2 cursor-pointer hover:bg-teal-100 w-1/3" @click="onClearForm">Clear</button>
        <button class="rounded px-4 py-2 cursor-pointer hover:bg-teal-100 w-1/3" @click="onCancelForm">Cancel</button>
      </div>
    </template>
  </AppDialog>
</template>

<script lang="ts" setup>
import AppDialog from '@/components/shared/AppDialog.vue'
import ToDoAddForm from '@/components/todo/ToDoAddForm.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { isTaskEdit, onAddTaskFormSubmit, onClearForm } = useTodoList()

const model = defineModel<boolean>()

function onCancelForm (): void {
  model.value = false
  onClearForm()
}
</script>
