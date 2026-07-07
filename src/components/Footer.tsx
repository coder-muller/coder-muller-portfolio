export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-6 border-t border-rule bg-bg px-[clamp(24px,5vw,80px)] py-10">
      <span className="font-mono text-xs uppercase text-dim">
        © {new Date().getFullYear()} Guilherme Müller
      </span>
    </footer>
  )
}
