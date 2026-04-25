export type NavItem = {
  href: string
  label: string
}

export type StatItem = {
  value: string
  lines: [string, string]
}

export type StackItem = {
  name: string
  tag: string
  description: string
}

export type ProjectItem = {
  href: string
  meta: string
  name: string
  description: string
  pills: string[]
}

export const navItems: NavItem[] = [
  { href: '#about', label: 'sobre' },
  { href: '#stack', label: 'stack' },
  { href: '#projects', label: 'projetos' },
  { href: '#contact', label: 'contato' },
]

export const typedPhrases = [
  'git add .',
  'bun run dev',
  'docker compose up -d',
  'bun prisma:migrate',
  'git push origin main',
  'bunx --bun shadcn init',
]

export const stats: StatItem[] = [
  { value: '3+', lines: ['anos construindo', 'produtos web'] },
  { value: '12+', lines: ['projetos rodando', 'em produção'] },
  { value: '∞', lines: ['curiosidade por', 'novos desafios'] },
]

export const stackItems: StackItem[] = [
  {
    name: 'Next.js',
    tag: 'frontend',
    description: 'App Router, Server Components, ISR, streaming e edge functions.',
  },
  {
    name: 'TypeScript',
    tag: 'linguagem',
    description: 'Tipagem ponta a ponta entre cliente, servidor e banco de dados.',
  },
  {
    name: 'Prisma + PostgreSQL',
    tag: 'dados',
    description: 'ORM type-safe com design de schema relacional e migrations seguras.',
  },
  {
    name: 'Stripe',
    tag: 'pagamentos',
    description: 'Checkout, assinaturas, webhooks e integrações de pagamento end-to-end.',
  },
  {
    name: 'shadcn/ui + Tailwind',
    tag: 'ui',
    description: 'Primitivos acessíveis compostos em interfaces de produto refinadas.',
  },
  {
    name: 'Better Auth',
    tag: 'auth',
    description: 'Autenticação moderna com sessões, OAuth e controle de acesso por papel.',
  },
  {
    name: 'Bun + Elysia',
    tag: 'runtime / api',
    description: 'Runtime ultrarrápido com framework de API ergonômico e type-safe.',
  },
  {
    name: 'Express',
    tag: 'backend',
    description: 'APIs REST clássicas, middlewares e integrações server-side.',
  },
  {
    name: 'Fastify',
    tag: 'backend',
    description: 'Framework Node.js de alta performance com schema validation nativo.',
  },
  {
    name: 'Vite',
    tag: 'build',
    description: 'Bundler moderno com HMR instantâneo e build de produção otimizado.',
  },
  {
    name: 'Docker',
    tag: 'infra',
    description: 'Containerização de ambientes, compose para dev local e deploy consistente.',
  },
  {
    name: 'React',
    tag: 'ui',
    description: 'Hooks, Context, padrões avançados de componentes e otimização de performance.',
  },
]

export const projects: ProjectItem[] = [
  {
    href: 'https://veltro.vercel.app',
    meta: 'SaaS · Alfa · 2025',
    name: 'Veltro',
    description:
      'Plataforma de consolidação de carteiras de investimento para o mercado brasileiro — renda fixa e variável em um único painel. Agrega ativos de diferentes corretoras, calcula rentabilidade real descontando inflação e IR, e apresenta a distribuição do portfólio de forma clara. Atualmente em fase alfa.',
    pills: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Renda Fixa', 'B3'],
  },
  {
    href: 'https://kiaro.xyz',
    meta: 'SaaS · Produção · 2026',
    name: 'Kiaro',
    description:
      'App de gestão para empresas que cobram mensalidades de clientes — centraliza contratos, clientes, cobranças recorrentes e um módulo de controle financeiro simplificado. Elimina planilhas, automatiza o acompanhamento de inadimplência e dá visibilidade real sobre a receita da empresa.',
    pills: ['Next.js', 'shadcn/ui', 'Stripe', 'Prisma', 'PostgreSQL', 'Better Auth'],
  },
  {
    href: 'https://github.com/coder-muller',
    meta: 'Open source · contínuo',
    name: 'Mais no GitHub',
    description:
      'Experimentos, utilitários e ferramentas construídos para resolver problemas reais — publicados abertamente e compartilhados com a comunidade.',
    pills: ['Vários', 'Open Source'],
  },
]
