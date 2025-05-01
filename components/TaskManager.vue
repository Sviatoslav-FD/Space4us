<template>
  <ToDoAddForm />
  <ToDoSettings />
  <AppTabs v-model="selectedCategory" :tabs="categories" />
  <ToDoList :filter="selectedCategory" />
</template>

<script setup lang="ts">
import ToDoAddForm from '@/components/todo/ToDoAddForm.vue'
import ToDoSettings from '@/components/todo/ToDoSettings.vue'
import ToDoList from '@/components/todo/ToDoList.vue'
import AppTabs from '@/components/shared/AppTabs.vue'

import { useTodoList } from '@/composables/use.todo-list'
const { selectedCategory, categories } = useTodoList()
</script>
