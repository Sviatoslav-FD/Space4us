import { type Ref, type ComputedRef, ref, computed } from 'vue'
import { type TaskItem } from '@/types/index'
import { useFetch } from '@/composables/use.fetch'

interface UseTodoListReturn {
  tasks: Ref<TaskItem[]>
  formTask: Ref<TaskItem>
  isTaskEdit: Ref<boolean>
  categories: ComputedRef<{ title: string; }[]>
  getTasks: () => Promise<void>
  onAddTaskFormSubmit: () => void
  onClearForm: () => void
  onDeleteItems: () => Promise<void>
  onToggleTask: (task: TaskItem) => Promise<void>
  onListClickHandler: (payload: Event) => void
}

const tasks = ref<TaskItem[]>([])

const isTaskEdit = ref<boolean>(false)

const defaultItem: TaskItem = {
  id: '',
  title: '',
  isDone: false,
  isUrgent: false,
  isImportant: false,
  description: '',
  category: '',
  date: new Date(),
  dependencies: [],
  marks: [],
}

const formTask = ref<TaskItem>({ ...defaultItem })

export function useTodoList(): UseTodoListReturn {
  const { fetchData } = useFetch()

  const categories = computed((): { title: string; }[] => {
    const filteredCategories = tasks.value.filter(item => item.category).map(item => item.category)
    const categoriesSet = [...new Set(filteredCategories)]
    return categoriesSet.map(title => ({ title }))
  })

  const getTasks = async (): Promise<void> => {
    tasks.value = await fetchData('/tasks')
  }

  const onAddTaskFormSubmit = (): void => {
    if (!formTask.value.title.trim().length) {
      return
    }

    if (isTaskEdit.value) {
      onEditTask()
    } else {
      onAddTask()
    }
  }

  const onAddTask = async (): Promise<void> => {
    const task = { ...formTask.value, id: crypto.randomUUID() }
  tasks.value = await fetchData('/tasks/add', 'POST', task)
    onClearForm()
  }

  const onEditTask = async (): Promise<void> => {
    tasks.value = await fetchData(`/tasks/edit`, 'POST', formTask.value)
    onClearForm()
  }

  const onToggleTask = async (task: TaskItem): Promise<void> => {
    tasks.value = await fetchData(`/tasks/edit`, 'POST', task)
    onClearForm()
  }

  const onStartEditTask = (id: string): void => {
    isTaskEdit.value = true
    const editTask = tasks.value.find((item) => item.id === id)
    if (!editTask) return
    formTask.value = { ...editTask }
  }

  const onClearForm = (): void => {
    formTask.value = { ...defaultItem }
    isTaskEdit.value = false
  }

  const onDeleteItems = async (): Promise<void> => {
    tasks.value = await fetchData(`/tasks/delete/clear`, 'DELETE')
    onClearForm()
  }

  const onDeleteItem = async (id: string): Promise<void> => {
    tasks.value = await fetchData(`/tasks/delete/${id}`, 'DELETE')
    onClearForm()
  }

  const onListClickHandler = (event: Event): void => {
    const data = (event.target as HTMLElement)?.closest('button')?.dataset
    if (!data) return
    if (data.delete) onDeleteItem(data.delete)
    if (data.edit) onStartEditTask(data.edit)
  }

  return {
    tasks,
    formTask,
    isTaskEdit,
    categories,
    getTasks,
    onAddTaskFormSubmit,
    onClearForm,
    onDeleteItems,
    onToggleTask,
    onListClickHandler,
  }
}
