<template>
  <header class="fixed w-full p-2 flex items-center border-b-2 border-teal-300 text-teal-300 z-20 bg-teal-50 shadow-xl shadow-teal-50">
    <p class="flex-grow font-semibold text-3xl">Space4US</p>

    <nav class="flex-grow">
      <ul class="flex space-x-4">
        <!-- <li><a href="#" class="hover:text-teal-500">Projects</a></li> -->
        <li><a href="#" class="hover:text-teal-500">Tasks</a></li>
        <!-- <li><a href="#" class="hover:text-teal-500">Calendar</a></li> -->
      </ul>
    </nav>

    <AppCountrySelect />

    <div class="bg-teal-100 p-1 ml-4 rounded-full w-8 text-center">SP</div>
  </header>
</template>

<script lang="ts" setup>
import AppCountrySelect from './AppCountrySelect.vue';

</script>
