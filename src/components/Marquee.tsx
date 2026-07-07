const words = ['Fullstack', 'Performance', 'Design', 'TypeScript', 'Produto']

function Chunk() {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span
          key={i}
          className={`flex items-center gap-14 whitespace-nowrap px-7 font-display text-[clamp(40px,7vw,96px)] font-extrabold uppercase leading-[1.2] tracking-[-0.02em] ${
            i % 2 === 0 ? 'text-transparent [-webkit-text-stroke:1px_#8A8A8A]' : 'text-bright'
          }`}
        >
          {w}
          <span className="text-[0.4em] text-accent [-webkit-text-stroke:0]">◆</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-rule py-5">
      <div className="marquee-track">
        <Chunk />
        <Chunk />
      </div>
    </div>
  )
}
