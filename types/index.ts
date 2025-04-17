export type TaskItem = {
  id: string
  title: string
  isDone: boolean | undefined
  isUrgent: boolean | undefined
  isImportant: boolean | undefined
  description: string | undefined
  category: string
  date: Date
  dependencies: string[]
  marks: string[]
}

export type Country = {
  flag: string
  code: string
}
