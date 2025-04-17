interface UseFetchReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (url: string, method?: string, body?: unknown | null | undefined) => any
}

const baseUrl = 'https://space4us-node.vercel.app'

export function useFetch(): UseFetchReturn {
  const fetchData = async (url: string, method?: string, body?: unknown | null | undefined) => {
    const headers = {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      Accept: '*/*',
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
      return JSON.parse(json)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
    }
  }

  return {
    fetchData,
  }
}
