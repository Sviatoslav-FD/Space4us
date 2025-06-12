export type TaskItem = {
  id: string
  title: string
  category: string
  description: string | undefined
  date: Date | string
  dependencies: string[]
  marks: string[]
  isDone: boolean | undefined
  isUrgent: boolean | undefined
  isImportant: boolean | undefined
}

export type Country = {
  flag: string
  code: string
}

export type Words = {
  fromLanguage: string
  toLanguage: string
  words: Word[]
}

export type Word = {
  fromWord: string
  toWord: string
}
