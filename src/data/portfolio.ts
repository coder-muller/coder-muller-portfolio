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

export const projects: ProjectItem[] = [
  {
    href: 'https://veltro.vercel.app',
    meta: 'Alfa · 2025',
    name: 'Veltro',
    description:
      'Plataforma de consolidação de carteiras de investimento para o mercado brasileiro. Renda fixa e variável em um único painel. Agrega ativos de diferentes corretoras, calcula rentabilidade real e apresenta a distribuição do portfólio de forma clara. Atualmente em fase alfa.',
    pills: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
  {
    href: 'https://kiaro.xyz',
    meta: 'Produção · 2026',
    name: 'Kiaro',
    description:
      'App de gestão para empresas que cobram mensalidades de clientes, centralizando contratos, clientes, cobranças recorrentes e um módulo de controle financeiro simplificado. Elimina planilhas, automatiza o acompanhamento de inadimplência e dá visibilidade real sobre a receita da empresa.',
    pills: ['Next.js', 'shadcn/ui', 'Prisma', 'Better Auth'],
  },
  {
    href: 'https://github.com/coder-muller',
    meta: 'Open source · contínuo',
    name: 'Mais no GitHub',
    description:
      'Experimentos, utilitários e ferramentas construídos para resolver problemas reais, publicados abertamente e compartilhados com a comunidade.',
    pills: ['Vários', 'Open Source'],
  },
]
