export type NavItem = {
  href: string
  label: string
}

export type ProjectStatus = 'production' | 'alpha'

export type ProjectItem = {
  href: string
  name: string
  meta: string
  status: ProjectStatus
  description: string
  pills: string[]
}

export type StackGroup = {
  group: string
  items: string[]
}

export type StatItem = {
  target: number
  suffix?: string
  pad?: number
  label: string
  desc: string
}

export const navItems: NavItem[] = [
  { href: '#about', label: 'Sobre' },
  { href: '#projects', label: 'Projetos' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contato' },
]

export const projects: ProjectItem[] = [
  {
    href: 'https://kiaro.xyz',
    name: 'Kiaro',
    meta: 'Em produção · 2026',
    status: 'production',
    description:
      'Gestão para empresas que vivem de mensalidades: contratos, clientes, cobranças recorrentes e um financeiro enxuto em um só lugar. Elimina planilhas, acompanha a inadimplência sozinho e mostra a receita real da empresa.',
    pills: ['Next.js', 'shadcn/ui', 'Prisma', 'Better Auth'],
  },
  {
    href: 'https://veltro.vercel.app',
    name: 'Veltro',
    meta: 'Alfa · 2025',
    status: 'alpha',
    description:
      'Consolidação de carteiras de investimento para o mercado brasileiro: renda fixa e variável, de várias corretoras, em um único painel — com rentabilidade real e distribuição clara do portfólio.',
    pills: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
]

export const stacks: StackGroup[] = [
  { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Motion'] },
  { group: 'Backend', items: ['Node.js', 'Bun', 'Elysia', 'Express', 'tRPC'] },
  { group: 'Database', items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Neon'] },
  { group: 'Ecosystem', items: ['Stripe', 'Better Auth', 'Resend', 'Vercel', 'Figma'] },
]

export const stats: StatItem[] = [
  {
    target: 3,
    suffix: '+',
    label: 'Anos de estrada',
    desc: 'Construindo produtos digitais de ponta a ponta.',
  },
  {
    target: 10,
    suffix: '+',
    label: 'Projetos entregues',
    desc: 'Rodando em produção, com usuários reais.',
  },
  {
    target: 200,
    suffix: '+',
    label: 'Clientes reais',
    desc: 'Usando o que eu construo e mantenho.',
  },
  {
    target: 2,
    pad: 2,
    label: 'Produtos próprios',
    desc: 'Kiaro e Veltro — um em produção, outro em alfa.',
  },
]

export const contactLinks = [
  {
    label: 'Email',
    value: 'guilhermemullerxx@gmail.com',
    href: 'mailto:guilhermemullerxx@gmail.com',
  },
  { label: 'GitHub', value: 'coder-muller', href: 'https://github.com/coder-muller' },
  {
    label: 'LinkedIn',
    value: 'guilherme-cmuller',
    href: 'https://www.linkedin.com/in/guilherme-cmuller',
  },
  { label: 'Instagram', value: '@coder.muller', href: 'https://instagram.com/coder.muller' },
]
