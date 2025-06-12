import { type Ref, ref } from 'vue'

interface UseCalendarReturn {
  selectedDay: Ref<Date>
  isCalendarDialogOpen: Ref<boolean>
}

const selectedDay = ref<Date>(new Date())
const isCalendarDialogOpen = ref(false)

export function useCalendar(): UseCalendarReturn {
  return {
    selectedDay,
    isCalendarDialogOpen,
  }
}
