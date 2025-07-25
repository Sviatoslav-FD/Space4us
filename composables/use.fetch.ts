interface UseFetchReturn {
  isLoading: Ref<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (url: string, method?: string, body?: unknown | null | undefined) => any
}

const baseUrl = 'http://localhost:7777'

const isLoading = ref(false)

export function useFetch(): UseFetchReturn {
  const fetchData = async (url: string, method?: string, body?: unknown | null | undefined) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Accept': '*/*',
    }

    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method,
        headers,
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const json = await response.json()
      return json
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      else {
        console.error('An unknown error occurred')
      }
    }
  }

  return {
    isLoading,
    fetchData,
  }
}
