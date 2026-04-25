import { useEffect, useState } from 'react'

export function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (phrases.length === 0) {
      return
    }

    let phraseIndex = 0
    let characterIndex = 0
    let isDeleting = false
    let timeoutId = 0

    const tick = () => {
      const phrase = phrases[phraseIndex]

      if (!isDeleting) {
        characterIndex += 1
        setText(phrase.slice(0, characterIndex))

        if (characterIndex === phrase.length) {
          isDeleting = true
          timeoutId = window.setTimeout(tick, 2200)
          return
        }

        timeoutId = window.setTimeout(tick, 60)
        return
      }

      characterIndex -= 1
      setText(phrase.slice(0, characterIndex))

      if (characterIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        timeoutId = window.setTimeout(tick, 300)
        return
      }

      timeoutId = window.setTimeout(tick, 32)
    }

    timeoutId = window.setTimeout(tick, 1600)

    return () => window.clearTimeout(timeoutId)
  }, [phrases])

  return text
}
