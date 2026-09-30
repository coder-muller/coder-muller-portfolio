// Mesmas curvas de --ease-* no index.css, para o Motion.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

export const SPRING_SOFT = { type: 'spring', duration: 0.6, bounce: 0.15 } as const
export const SPRING_SNAPPY = { type: 'spring', duration: 0.45, bounce: 0.2 } as const
