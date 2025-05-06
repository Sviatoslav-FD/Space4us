export const clickOutside = (elements: (HTMLElement | null)[], callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    // Check if the click was outside of all elements
    const isOutside = elements.every((element) => !element?.contains(event.target as Node))

    if (isOutside) {
      callback()
    }
  }

  document.addEventListener('click', handleClick)

  return () => {
    document.removeEventListener('click', handleClick)
  }
}
