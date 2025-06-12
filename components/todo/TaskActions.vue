<template>
  <div
    class="absolute flex transition-all duration-300 ml-2 h-full"
    :class="[hoveredItemId === id ? 'right-0' : '-right-[100%]']"
  >
    <AppButton
      v-if="isEdit"
      variant="icon"
      :data-edit="id"
    >
      <IconEdit />
    </AppButton>

    <AppButton
      v-if="isDelete"
      variant="danger"
      :data-delete="id"
    >
      <IconDelete />
    </AppButton>

    <IconDrag
      v-if="isDrag"
      class="cursor-move"
    />
  </div>
</template>

<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconDrag from '@/components/icons/IconDrag.vue'

interface Props {
  id: string
  hoveredItemId: string
  isEdit?: boolean
  isDelete?: boolean
  isDrag?: boolean
}

withDefaults(defineProps<Props>(), {
  isEdit: true,
  isDelete: true,
  isDrag: true,
})
</script>
