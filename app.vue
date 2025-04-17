<template>
  <div class="w-full mx-auto max-w-7xl">
    <Header />
    <ToDoAddForm />
    <ToDoSettings />
    <ToDoList />
  </div>
</template>

<script setup lang="ts">
import ToDoAddForm from '@/components/todo/ToDoAddForm.vue'
import ToDoSettings from '@/components/todo/ToDoSettings.vue'
import ToDoList from '@/components/todo/ToDoList.vue'
</script>
