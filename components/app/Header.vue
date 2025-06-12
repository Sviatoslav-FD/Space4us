<template>
  <header class="fixed w-full p-2 max-w-7xl flex items-center border-b-2 border-teal-300 text-teal-300 z-20 bg-teal-50">
    <NuxtLink
      to="/"
      class="flex-grow"
    >
      <p class="font-semibold text-3xl">Space4US</p>
    </NuxtLink>

    <nav class="flex-grow">
      <ul class="flex space-x-4">
        <li>
          <NuxtLink
            to="/calendar"
            class="hover:text-teal-500"
          >Calendar</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/tasks"
            class="hover:text-teal-500"
          >Tasks</NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/words"
            class="hover:text-teal-500"
          >Words</NuxtLink>
        </li>
      </ul>
    </nav>

    <AppCountrySelect />

    <div class="bg-teal-100 p-1 ml-4 rounded-full w-8 text-center">
      SP
    </div>
  </header>
</template>
