<template>
  <div class="flex bg-teal-50 m-2 border border-teal-300 rounded text-teal-700">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="w-full p-2 hover:bg-teal-100 hover:cursor-pointer"
      :class="{ 'bg-teal-100': model === tab }"
      @click="onTabSelected(tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  tabs: any[]
}

withDefaults(defineProps<Props>(), {
  tabs: () => [],
})

function onTabSelected (tab: string): void {
  if (model.value === tab) {
    model.value = ''
  } else {
    model.value = tab
  }
}

const model = defineModel<string>()
</script>
