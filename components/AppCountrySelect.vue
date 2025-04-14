<template>
  <div v-if="countries" class="relative">
    <button v-if="selectedCountry" class="border border-teal-300 rounded px-2 hover:bg-teal-100" @click="onSelectionToggle">{{ selectedCountry.flag }}</button>
    <ul v-if="isListOpen" class="absolute bg-white border border-teal-300 rounded mt-1 w-max h-97 overflow-y-auto">
      <li v-for="country in countries" :key="country.code" class="hover:bg-teal-100 px-1 flex justify-between" @click="onCountrySelect(country)">
        <span>{{ country.code }}</span>
        <span>{{ country.flag }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useFetch } from '@/composables/use.fetch'
import { type Country } from '@/types'

const countries = ref<Country[] | null>(null)
const selectedCountry = ref<Country | null>(null)
const isListOpen = ref(false)

const onGetCountries = async (): Promise<void> => {
  const { fetchData } = useFetch()
  countries.value = await fetchData('/countries')
  if (!countries.value) return
  selectedCountry.value = countries.value[0]
}

const onSelectionToggle = (): void => {
  isListOpen.value = !isListOpen.value
}

const onCountrySelect = (country: any): void => {
  selectedCountry.value = country
  isListOpen.value = false
}

onBeforeMount(() => onGetCountries())
</script>
