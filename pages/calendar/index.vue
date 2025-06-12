<template>
  <div class="h-full text-teal-500 flex flex-col">
    <div class="m-2 flex justify-center items-center gap-2">
      <IconLeft
        class="bg-teal-100 rounded-full p-1 cursor-pointer hover:bg-teal-200"
        @click="onPrevMonth"
      />
      <IconLeft
        class="rotate-180 bg-teal-100 rounded-full p-1 cursor-pointer hover:bg-teal-200"
        @click="onNextMonth"
      />
      <h1 class="text-2xl font-semibold select-none">
        {{ months[currentMonth] }} {{ currentYear }}
      </h1>
      <AppButton @click="onTodayClick">
        Today
      </AppButton>
    </div>
    <div class="border-t border-l border-teal-300 grid grid-cols-7 h-full cursor-pointer overflow-hidden">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="border-b border-r border-teal-300 hover:bg-teal-100 p-1 box-border"
        :class="{ 'bg-teal-50': isCurrentDay(day) }"
        @click.stop="openCalendarDialog(day)"
      >
        <div class="md:flex md:justify-between text-center">
          <p>{{ day.toString().split(' ')[0] }}</p>
          <p>{{ day.getDate() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconLeft from '@/components/icons/IconLeft.vue'

import { useCalendar } from '@/composables/use.calendar'

const { selectedDay, isCalendarDialogOpen } = useCalendar()

const calendarDays = ref<Date[]>([])
const currentDate = ref(new Date())
const currentMonth = ref(currentDate.value.getMonth())
const currentYear = ref(currentDate.value.getFullYear())

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const daysInThisMonth = () => {
  const smallerAmountOfSells = 35
  const biggerAmountOfSells = 42
  const firstDay = new Date(currentYear.value, currentMonth.value, 0).getDay()
  const prevDays = firstDay !== 0 ? getDaysArray(0, -firstDay) : []
  const days = getDaysArray(1, 0)
  const prevAndCurrentDays = [...prevDays, ...days]
  const amountOfCells = prevAndCurrentDays.length >= smallerAmountOfSells ? biggerAmountOfSells : smallerAmountOfSells
  const nextDays = getDaysArray(2, 0, amountOfCells - prevAndCurrentDays.length)
  calendarDays.value = [...prevAndCurrentDays, ...nextDays].map(i => new Date(currentYear.value, i.month - 1, i.number + 1))
}

const getDaysArray = (month: number, sliceStart: number, sliceEnd?: number) => {
  const length = new Date(currentYear.value, currentMonth.value + month, 0).getDate()
  return Array.from({ length }, (_, i) => ({ number: i, month: currentMonth.value + month })).slice(sliceStart, sliceEnd)
}

const isCurrentDay = (day: Date) => {
  const today = new Date()
  return day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
}

const onPrevMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  currentMonth.value = currentDate.value.getMonth()
  currentYear.value = currentDate.value.getFullYear()
  daysInThisMonth()
}

const onNextMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  currentMonth.value = currentDate.value.getMonth()
  currentYear.value = currentDate.value.getFullYear()
  daysInThisMonth()
}

const onTodayClick = () => {
  currentDate.value = new Date()
  currentMonth.value = currentDate.value.getMonth()
  currentYear.value = currentDate.value.getFullYear()
  daysInThisMonth()
}

const openCalendarDialog = (day: Date) => {
  isCalendarDialogOpen.value = true
  selectedDay.value = day
}

onMounted(daysInThisMonth)
</script>
