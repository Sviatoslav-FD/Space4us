export const clickOutside = (elements: (HTMLElement | null)[], callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    if (elements.every((e) => !e?.contains(event.target as Node))) {
      callback()
    }
  }

  document.addEventListener('click', handleClick)

  return () => {
    document.removeEventListener('click', handleClick)
  }
}
