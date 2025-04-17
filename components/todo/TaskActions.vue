<template>
  <div
    class="absolute flex transition-all duration-300 ml-2 h-full"
    :class="[hoveredItemId === task.id ? 'right-0' : '-right-[100%]']"
  >
    <AppButton variant="icon" :data-edit="task.id">
      <IconEdit />
    </AppButton>

    <AppButton variant="danger" :data-delete="task.id">
      <IconDelete />
    </AppButton>

    <IconDrag class="cursor-move" />
  </div>
</template>

<script setup lang="ts">
import { type TaskItem } from '@/types/index'
import AppButton from '@/components/shared/AppButton.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconDrag from '@/components/icons/IconDrag.vue'

interface Props {
  task: TaskItem
  hoveredItemId: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  hoveredItemId: '',
})
</script>
