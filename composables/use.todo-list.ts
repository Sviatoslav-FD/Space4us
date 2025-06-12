import { type Ref, type ComputedRef, ref, computed } from 'vue'
import type { TaskItem } from '@/types/index'
import { useFetch } from '@/composables/use.fetch'

interface UseTodoListReturn {
  tasks: Ref<TaskItem[]>
  formTask: Ref<TaskItem>
  isTaskEdit: Ref<boolean>
  isTaskAddDialogOpen: Ref<boolean>
  selectedCategory: Ref<string>
  categories: ComputedRef<string[]>
  dates: ComputedRef<string[]>
  filteredTasks: ComputedRef<TaskItem[]>
  view: Ref<string>
  defaultItem: TaskItem
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

const view = ref<string>('list')

const defaultItem: TaskItem = {
  id: '',
  title: '',
  isDone: false,
  isUrgent: false,
  isImportant: false,
  description: '',
  category: '',
  date: undefined,
  dependencies: [],
  marks: [],
}

const formTask = ref<TaskItem>({ ...defaultItem })

export function useTodoList(): UseTodoListReturn {
  const filteredTasks = computed(() => {
    if (selectedCategory.value) {
      return tasks.value.filter(task => task.category === selectedCategory.value)
    }
    return tasks.value
  })

  const categories = computed((): string[] => {
    return [...new Set(tasks.value?.filter(item => item.category).map(item => item.category))]
  })

  const dates = computed((): string[] => {
    return [...new Set(tasks.value?.map((item) => {
      return item.date ? new Date(item.date).toLocaleDateString() : 'No date'
    }))]
  })

  const onAddTaskFormSubmit = (): void => {
    if (!formTask.value.title.trim().length) {
      return
    }

    if (isTaskEdit.value) {
      onEditTask()
    }
    else {
      onAddTask()
    }
  }

  const getTasks = async (): Promise<void> => {
    const { isLoading, fetchData } = useFetch()
    isLoading.value = true

    try {
      tasks.value = await fetchData('/tasks')
    }
    catch (error) {
      console.error('Error:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const onAddTask = async (): Promise<void> => {
    const { isLoading, fetchData } = useFetch()
    isLoading.value = true
    const category = formTask.value.category || ''
    const task = { ...formTask.value, id: crypto.randomUUID(), category }

    try {
      await fetchData('/tasks/add', 'POST', task)
      await getTasks()
      onClearForm()
    }
    catch (error) {
      console.error('Error:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const onEditTask = async (task?: TaskItem): Promise<void> => {
    const { isLoading, fetchData } = useFetch()
    isLoading.value = true

    try {
      await fetchData(`/tasks/edit`, 'PUT', task || formTask.value)
      await getTasks()
      onClearForm()
    }
    catch (error) {
      console.error('Error:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const onStartEditTask = (id: string): void => {
    isTaskEdit.value = true
    const editTask = tasks.value.find(item => item.id === id)
    if (!editTask) return
    formTask.value = { ...editTask }
    setTimeout(() => isTaskAddDialogOpen.value = true, 0)
  }

  const onClearForm = (): void => {
    formTask.value = { ...defaultItem }
    isTaskEdit.value = false
  }

  const onDeleteItems = async (id: string): Promise<void> => {
    const { isLoading, fetchData } = useFetch()
    isLoading.value = true
    console.log('onDeleteItems', id)
    try {
      await fetchData(`/tasks/delete/${id}`, 'DELETE')
      await getTasks()
      onClearForm()
    }
    catch (error) {
      console.error('Error:', error)
    }
    finally {
      isLoading.value = false
    }
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
    dates,
    filteredTasks,
    view,
    defaultItem,
    getTasks,
    onAddTaskFormSubmit,
    onClearForm,
    onDeleteItems,
    onEditTask,
    onListClickHandler,
  }
}
