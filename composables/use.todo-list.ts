import { type Ref, type ComputedRef, ref, computed } from 'vue'
import { type TaskItem } from '@/types/index'
import { useFetch } from '@/composables/use.fetch'

interface UseTodoListReturn {
  tasks: Ref<TaskItem[]>
  formTask: Ref<TaskItem>
  isTaskEdit: Ref<boolean>
  isTaskAddDialogOpen: Ref<boolean>
  selectedCategory: Ref<string>
  categories: ComputedRef<string[]>
  filteredTasks: ComputedRef<TaskItem[]>
  getTasks: () => Promise<void>
  onAddTaskFormSubmit: () => void
  onClearForm: () => void
  onDeleteItems: (id: string) => void
  onEditTask: (task?: TaskItem) => void
  onListClickHandler: (payload: Event) => void
}

const tasks = ref<TaskItem[]>([])

const isTaskEdit = ref<boolean>(false)

const isTaskAddDialogOpen = ref<boolean>(false)

const selectedCategory = ref<string>('')

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

  const filteredTasks = computed(() => {
    if (selectedCategory.value) {
      return tasks.value.filter((task) => task.category === selectedCategory.value)
    }
    return tasks.value
  })

  const categories = computed((): string[] => {
    return [...new Set(tasks.value?.filter(item => item.category).map(item => item.category))]
  })

  const asyncRequest = (fn: Function): any => {
    try {
      return fn()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const onAddTaskFormSubmit = (): void => {
    if (!formTask.value.title.trim().length) {
      return
    }

    isTaskEdit.value ? onEditTask() : onAddTask()
  }

  const getTasks = async (): Promise<void> => {
    tasks.value = await asyncRequest(() => fetchData('/tasks'))
  }

  const onAddTask = (): void => {
    const category = formTask.value.category || 'General'
    const task = { ...formTask.value, id: crypto.randomUUID(), category }

    asyncRequest(async () => {
      await fetchData('/tasks/add', 'POST', task)
      await getTasks()
      onClearForm()
    })
  }

  const onEditTask = (task?: TaskItem): void => {
    asyncRequest(async () => {
      await fetchData(`/tasks/edit`, 'PUT', task || formTask.value)
      await getTasks()
      onClearForm()
    })
  }

  const onStartEditTask = (id: string): void => {
    isTaskEdit.value = true
    const editTask = tasks.value.find((item) => item.id === id)
    if (!editTask) return
    formTask.value = { ...editTask }
    setTimeout(() => isTaskAddDialogOpen.value = true, 0)
  }

  const onClearForm = (): void => {
    formTask.value = { ...defaultItem }
    isTaskEdit.value = false
  }

  const onDeleteItems = (id: string): void => {
    asyncRequest(async () => {
      await fetchData(`/tasks/delete/${id}`, 'DELETE')
      await getTasks()
      onClearForm()
    })
  }

  const onListClickHandler = (event: Event): void => {
    const data = (event.target as HTMLElement)?.closest('button')?.dataset
    if (!data) return
    if (data.delete) onDeleteItems(data.delete)
    if (data.edit) onStartEditTask(data.edit)
  }

  return {
    tasks,
    formTask,
    isTaskEdit,
    isTaskAddDialogOpen,
    selectedCategory,
    categories,
    filteredTasks,
    getTasks,
    onAddTaskFormSubmit,
    onClearForm,
    onDeleteItems,
    onEditTask,
    onListClickHandler,
  }
}
