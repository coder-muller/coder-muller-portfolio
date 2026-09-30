// Quatro barras que desenham um M e, no hover, tocam como o equalizador do
// hero e do Light Notch.
const BARS = [
  { x: 2, h: 18 },
  { x: 7.75, h: 10.5 },
  { x: 13.5, h: 14.5, accent: true },
  { x: 19.25, h: 18 },
]

export default function LogoMark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {BARS.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={21 - bar.h}
          width="3.5"
          height={bar.h}
          rx="1.75"
          className={`logo-bar ${bar.accent ? 'fill-accent' : 'fill-fg'}`}
          style={{ animationDelay: `${i * -0.17}s`, animationDuration: `${0.5 + i * 0.07}s` }}
        />
      ))}
    </svg>
  )
}
