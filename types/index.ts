export type TaskItem = {
  id: string
  title: string
  category: string
  description: string | undefined
  date: Date | undefined
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
