import { useEffect } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const dot = document.createElement('div')
    const cross = document.createElement('div')

    dot.className = 'c-dot'
    cross.className = 'c-cross'
    document.body.append(dot, cross)

    let mouseX = -100
    let mouseY = -100
    let crossX = -100
    let crossY = -100
    let frameId = 0

    const setHover = (active: boolean) => {
      dot.classList.toggle('hover', active)
      cross.classList.toggle('hover', active)
    }

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const handlePointerEnter = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      if (target.closest('a, button, .stack-card, .project')) {
        setHover(true)
      }
    }

    const handlePointerLeave = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const currentInteractive = target.closest('a, button, .stack-card, .project')

      if (!currentInteractive) {
        return
      }

      if (
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest('a, button, .stack-card, .project') === currentInteractive
      ) {
        return
      }

      setHover(false)
    }

    const tick = () => {
      crossX += (mouseX - crossX) * 0.14
      crossY += (mouseY - crossY) * 0.14
      cross.style.left = `${crossX}px`
      cross.style.top = `${crossY}px`
      frameId = window.requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handlePointerEnter)
    document.addEventListener('mouseout', handlePointerLeave)
    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handlePointerEnter)
      document.removeEventListener('mouseout', handlePointerLeave)
      dot.remove()
      cross.remove()
    }
  }, [])
}
