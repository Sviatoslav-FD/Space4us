<template>
  <div class="relative min-w-[34px]">
    <template v-if="countries">
      <button
        v-if="selectedCountry"
        class="border border-teal-300 rounded px-2 hover:bg-teal-100"
        @click="onSelectionToggle"
      >
        {{ selectedCountry.flag }}
      </button>
      <ul
        v-if="isListOpen"
        class="absolute bg-white border border-teal-300 rounded mt-1 w-max h-97 overflow-y-auto"
      >
        <li
          v-for="country in countries"
          :key="country.code"
          class="hover:bg-teal-100 px-1 flex justify-between"
          @click="onCountrySelect(country)"
        >
          <span>{{ country.code }}</span>
          <span>{{ country.flag }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '@/composables/use.fetch'
import type { Country } from '@/types'

const countries = ref<Country[] | null>(null)
const selectedCountry = ref<Country | null>(null)
const isListOpen = ref(false)

const onGetCountries = async (): Promise<void> => {
  try {
    const countriesStorage = localStorage.getItem('countries')

    if (countriesStorage) {
      countries.value = JSON.parse(countriesStorage)
    }
    else {
      const { fetchData } = useFetch()
      const result = await fetchData('/countries')
      countries.value = JSON.parse(result)
      localStorage.setItem('countries', result)
    }

    if (!countries.value) return
    selectedCountry.value = countries.value[0]
  }
  catch (error) {
    console.error('Error fetching countries:', error)
  }
}

const onSelectionToggle = (): void => {
  isListOpen.value = !isListOpen.value
}

const onCountrySelect = (country: Country): void => {
  selectedCountry.value = country
  isListOpen.value = false
}

onMounted(onGetCountries)
</script>
