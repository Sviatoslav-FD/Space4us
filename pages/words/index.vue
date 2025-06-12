<template>
  <div class="m-2">
    <form
      class="flex justify-center my-2"
      @submit.prevent="onAddWordFormSubmit"
    >
      <AppInput
        v-model="formWord.fromWord"
        :placeholder="words.fromLanguage"
        required
        class="max-w-72"
      />

      <AppInput
        v-model="formWord.toWord"
        :placeholder="words.toLanguage"
        required
        class="max-w-72 mx-2"
      />

      <AppButton type="submit">
        Add
      </AppButton>
    </form>
    <div
      v-for="word in words.words"
      :key="word.fromWord"
      class="inline-grid  m-1 rounded bg-teal-50 border border-teal-300 p-1"
    >
      {{ word.fromWord }} - {{ word.toWord }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Words } from '@/types'

const formWord = ref({
  fromWord: '',
  toWord: '',
})

const words = ref<Words>({
  fromLanguage: 'English',
  toLanguage: 'Ukrainian',
  words: [{
    fromWord: 'settle',
    toWord: 'врегулювати',
  }, {
    fromWord: 'settle down',
    toWord: 'осісти',
  }, {
    fromWord: 'settle in',
    toWord: 'влаштуватися',
  }, {
    fromWord: 'settle up',
    toWord: 'розрахуватися',
  }, {
    fromWord: 'settle for',
    toWord: 'задовольнятися',
  }, {
    fromWord: 'interchangeable',
    toWord: 'взаємозамінний',
  }, {
    fromWord: 'singlehandedly',
    toWord: 'одноосібно',
  }, {
    fromWord: 'tirelessly',
    toWord: 'невпинно',
  }, {
    fromWord: 'sluggish',
    toWord: 'млявий',
  }, {
    fromWord: 'entirety',
    toWord: 'цілком',
  }, {
    fromWord: 'drastically',
    toWord: 'різко',
  }, {
    fromWord: 'crutch',
    toWord: 'милиця',
  }, {
    fromWord: 'inarticulate',
    toWord: 'невиразний',
  }, {
    fromWord: 'jarring',
    toWord: 'різкий',
  }, {
    fromWord: 'crusade',
    toWord: 'хрестовий похід',
  }, {
    fromWord: 'effectively',
    toWord: 'ефективно',
  }, {
    fromWord: 'efficiently',
    toWord: 'дієво',
  }, {
    fromWord: 'obfuscation',
    toWord: 'заплутаність',
  }, {
    fromWord: 'bustling',
    toWord: 'галасливий',
  }, {
    fromWord: 'alias',
    toWord: 'псевдонім',
  }, {
    fromWord: 'union',
    toWord: 'союз',
  }, {
    fromWord: 'intersection',
    toWord: 'перехрестя',
  }, {
    fromWord: 'distractions',
    toWord: 'відволікаючі фактори',
  }, {
    fromWord: 'struggle',
    toWord: 'боротьба',
  }, {
    fromWord: 'mesmerizing',
    toWord: 'заворожливий',
  }, {
    fromWord: 'avalanche',
    toWord: 'лавина',
  }, {
    fromWord: 'nuisance',
    toWord: 'неприємність',
  }, {
    fromWord: 'lightsaber',
    toWord: 'світловий меч',
  }, {
    fromWord: 'grudges',
    toWord: 'образи',
  }, {
    fromWord: 'complainers',
    toWord: 'скаржники',
  }],
})

const onAddWordFormSubmit = () => {
  if (formWord.value.fromWord && formWord.value.toWord) {
    words.value.words.push({
      fromWord: formWord.value.fromWord,
      toWord: formWord.value.toWord,
    })
    formWord.value.fromWord = ''
    formWord.value.toWord = ''
  }
}
</script>
