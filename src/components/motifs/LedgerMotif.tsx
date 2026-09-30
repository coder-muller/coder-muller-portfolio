import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowElbowDownLeftIcon,
  CarIcon,
  CurrencyCircleDollarIcon,
  FirstAidKitIcon,
  ForkKnifeIcon,
  ShoppingCartIcon,
  SparkleIcon,
  type Icon,
} from '@phosphor-icons/react'
import { useLocale } from '../../i18n/locale'
import type { Locale } from '../../i18n/content'
import { EASE_OUT } from '../../lib/motion'
import { useLoopTick } from './useLoopTick'

type Entry = {
  text: string
  title: string
  category: string
  wallet: string
  amount: number
  Icon: Icon
}

// Mesmos exemplos que o assistente do Ledger usa para ensinar o formato.
const ENTRIES: Record<Locale, Entry[]> = {
  pt: [
    { text: 'mercado 45,90', title: 'Mercado', category: 'Alimentação', wallet: 'Nubank', amount: -45.9, Icon: ShoppingCartIcon },
    { text: 'uber ontem 23,50', title: 'Uber', category: 'Transporte', wallet: 'Nubank', amount: -23.5, Icon: CarIcon },
    { text: 'recebi 3500 de salário', title: 'Salário', category: 'Receita', wallet: 'Itaú', amount: 3500, Icon: CurrencyCircleDollarIcon },
    { text: 'farmácia 38,40 anteontem', title: 'Farmácia', category: 'Saúde', wallet: 'Nubank', amount: -38.4, Icon: FirstAidKitIcon },
    { text: 'almoço com a equipe 62', title: 'Almoço com a equipe', category: 'Alimentação', wallet: 'Itaú', amount: -62, Icon: ForkKnifeIcon },
  ],
  en: [
    { text: 'groceries 45.90', title: 'Groceries', category: 'Food', wallet: 'Checking', amount: -45.9, Icon: ShoppingCartIcon },
    { text: 'uber yesterday 23.50', title: 'Uber', category: 'Transport', wallet: 'Credit card', amount: -23.5, Icon: CarIcon },
    { text: 'got paid 3500 salary', title: 'Salary', category: 'Income', wallet: 'Checking', amount: 3500, Icon: CurrencyCircleDollarIcon },
    { text: 'pharmacy 38.40', title: 'Pharmacy', category: 'Health', wallet: 'Credit card', amount: -38.4, Icon: FirstAidKitIcon },
    { text: 'team lunch 62', title: 'Team lunch', category: 'Food', wallet: 'Checking', amount: -62, Icon: ForkKnifeIcon },
  ],
}

const TICK = 110
const ROUND = 38
const HOLD = 6
const ROWS = 3

// Uma frase solta vira lançamento: digita, confirma e entra no topo da lista.
export default function LedgerMotif({ active, still }: { active: boolean; still: boolean }) {
  const { locale } = useLocale()
  const tick = useLoopTick(active && !still, TICK)
  const entries = ENTRIES[locale]
  const n = entries.length
  const at = (r: number) => entries[((r % n) + n) % n]

  const round = Math.floor(tick / ROUND)
  const within = tick % ROUND
  const current = at(round)
  const committed = still || within >= current.text.length + HOLD
  const typed = committed ? '' : current.text.slice(0, Math.min(within, current.text.length))
  const latest = committed ? round : round - 1
  const rows = Array.from({ length: ROWS }, (_, i) => ({ key: latest - i, entry: at(latest - i) }))

  const money = new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: locale === 'pt' ? 'BRL' : 'USD',
    signDisplay: 'always',
  })
  const placeholder = locale === 'pt' ? 'Escreva um gasto…' : 'Type an expense…'

  return (
    <div className="flex w-[min(88%,380px)] flex-col gap-3">
      <div className="flex h-12 items-center gap-2.5 rounded-2xl bg-surface px-3.5 shadow-[0_12px_32px_-16px_var(--shadow)] ring-1 ring-line">
        <SparkleIcon weight="fill" className="size-4 shrink-0 text-accent" />
        <span className="flex min-w-0 flex-1 items-center font-mono text-[13px]">
          {typed ? (
            <span className="truncate text-fg">{typed}</span>
          ) : (
            <span className="truncate text-subtle">{placeholder}</span>
          )}
          {!still && <span className="caret ml-px h-4 w-px shrink-0 bg-accent" />}
        </span>
        <span
          className={`grid size-7 shrink-0 place-items-center rounded-lg ring-1 transition-colors duration-200 ${
            typed.length === current.text.length && !committed
              ? 'bg-accent text-accent-fg ring-transparent'
              : 'text-subtle ring-line'
          }`}
        >
          <ArrowElbowDownLeftIcon weight="bold" className="size-3.5" />
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map(({ key, entry }, i) => (
            <motion.li
              key={key}
              layout
              initial={{ opacity: 0, transform: 'translateY(-10px) scale(0.97)', filter: 'blur(4px)' }}
              animate={{
                opacity: 1 - i * 0.22,
                transform: 'translateY(0px) scale(1)',
                filter: 'blur(0px)',
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="flex items-center gap-3 rounded-xl bg-fg/[0.03] px-3 py-2.5 ring-1 ring-line"
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                  entry.amount > 0 ? 'bg-accent-soft text-accent' : 'bg-fg/[0.06] text-fg'
                }`}
              >
                <entry.Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-fg">{entry.title}</span>
                <span className="block truncate text-[11px] text-muted">
                  {entry.category} · {entry.wallet}
                </span>
              </span>
              <span
                className={`shrink-0 font-mono text-[12.5px] tabular-nums ${
                  entry.amount > 0 ? 'text-accent' : 'text-fg'
                }`}
              >
                {money.format(entry.amount)}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
