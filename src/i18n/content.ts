export type Locale = 'pt' | 'en'

export type SectionId = 'top' | 'about' | 'projects' | 'services' | 'stack' | 'contact'

export type ProjectId = 'ledger' | 'moment' | 'lightnotch'

export type Project = {
  id: ProjectId
  name: string
  href: string
  linkLabel: string
  status: string
  live: boolean
  year: string
  tagline: string
  description: string
  stack: string[]
}

export type Service = {
  id: 'saas' | 'custom' | 'web' | 'macos'
  title: string
  body: string
  tags: string[]
}

export type Stat = {
  value: number
  suffix?: string
  label: string
  detail: string
}

export type Dictionary = {
  meta: { title: string; description: string }
  sections: Record<SectionId, string>
  nav: {
    items: { id: SectionId; label: string }[]
    cta: string
    menu: string
    close: string
    openMenu: string
    closeMenu: string
    language: string
    skip: string
    themeLight: string
    themeDark: string
  }
  hero: {
    headline: [string, string]
    subtext: string
    primary: string
    secondary: string
  }
  about: {
    manifesto: string
    stats: Stat[]
  }
  projects: {
    title: string
    items: Project[]
  }
  services: {
    title: string
    items: Service[]
    visuals: { flow: [string, string, string]; url: string }
  }
  stack: {
    title: string
  }
  contact: {
    title: [string, string]
    body: string
    primary: string
    copy: string
    copied: string
    socialLabel: string
  }
  footer: {
    rights: string
    backToTop: string
  }
}

export const EMAIL = 'guilhermecoelhomuller@gmail.com'

export const socials = [
  { label: 'GitHub', handle: 'coder-muller', href: 'https://github.com/coder-muller' },
  {
    label: 'LinkedIn',
    handle: 'guilherme-cmuller',
    href: 'https://www.linkedin.com/in/guilherme-cmuller',
  },
  { label: 'Instagram', handle: '@coder.muller', href: 'https://instagram.com/coder.muller' },
]

export const stackRows: string[][] = [
  ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'shadcn/ui', 'TanStack Query'],
  ['Node.js', 'Bun', 'PostgreSQL', 'Prisma', 'Drizzle', 'Better Auth', 'Stripe', 'Swift'],
]

const links = {
  ledger: 'https://ledger.muller.sh',
  moment: 'https://moment.muller.sh',
  lightnotch: 'https://github.com/coder-muller/light-notch',
}

export const LINKS = links

const pt: Dictionary = {
  meta: {
    title: 'Guilherme Müller, engenheiro de software full-stack',
    description:
      'Engenheiro full-stack que constrói produtos web rápidos, bonitos e prontos para crescer. Criador do Moment, Müller Ledger e Light Notch.',
  },
  sections: {
    top: 'Início',
    about: 'Sobre',
    projects: 'Projetos',
    services: 'Serviços',
    stack: 'Stack',
    contact: 'Contato',
  },
  nav: {
    items: [
      { id: 'about', label: 'Sobre' },
      { id: 'projects', label: 'Projetos' },
      { id: 'services', label: 'Serviços' },
      { id: 'contact', label: 'Contato' },
    ],
    cta: 'Vamos conversar',
    menu: 'Menu',
    close: 'Fechar',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    skip: 'Pular para o conteúdo',
    themeLight: 'Ativar modo claro',
    themeDark: 'Ativar modo escuro',
  },
  hero: {
    headline: ['Sistemas e sites', 'que dão gosto de usar.'],
    subtext:
      'Sou o Guilherme, desenvolvedor. Você traz a ideia, eu tiro do papel e explico cada passo sem tecniquês.',
    primary: 'Vamos conversar',
    secondary: 'Ver projetos',
  },
  about: {
    manifesto:
      'Há mais de três anos eu transformo problemas de negócio em software. Cuido do produto inteiro, dos dados à interface, do primeiro commit ao deploy. O resultado são sistemas rápidos, claros e fáceis de manter, que continuam funcionando muito depois da entrega.',
    stats: [
      { value: 3, suffix: '+', label: 'anos de estrada', detail: 'Construindo produtos de ponta a ponta.' },
      { value: 10, suffix: '+', label: 'projetos entregues', detail: 'Rodando em produção, com usuários reais.' },
      { value: 200, suffix: '+', label: 'clientes atendidos', detail: 'Usando o que eu construo e mantenho.' },
      { value: 3, label: 'produtos próprios', detail: 'Moment, Müller Ledger e Light Notch.' },
    ],
  },
  projects: {
    title: 'Produtos que eu criei e mantenho.',
    items: [
      {
        id: 'ledger',
        name: 'Müller Ledger',
        href: links.ledger,
        linkLabel: 'Visitar ledger.muller.sh',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'Controle de gastos que entende o que você escreve.',
        description:
          'Escreva “mercado 45,90” e ele vira um lançamento com categoria, carteira e data. Funciona também pelo Telegram, com relatórios por categoria e o saldo de cada carteira.',
        stack: ['React', 'Elysia', 'Drizzle', 'Better Auth'],
      },
      {
        id: 'moment',
        name: 'Moment',
        href: links.moment,
        linkLabel: 'Visitar moment.muller.sh',
        status: 'Em produção',
        live: true,
        year: '2026',
        tagline: 'Uma agenda calma para pequenos negócios.',
        description:
          'Agenda, clientes, documentos e histórico de atendimentos em uma interface minimalista. Tem fila de espera, papéis por equipe e atualizações em tempo real em todas as abas abertas.',
        stack: ['Next.js 16', 'Drizzle', 'Better Auth', 'Cloudflare R2'],
      },
      {
        id: 'lightnotch',
        name: 'Light Notch',
        href: links.lightnotch,
        linkLabel: 'Ver no GitHub',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'O notch do MacBook virou um player do Spotify.',
        description:
          'App nativo para macOS. Mostra a capa do álbum e um equalizador que acompanha a música; um clique abre o player completo. AppKit puro, sem dependências e quase sem gastar CPU.',
        stack: ['Swift', 'AppKit', 'Core Animation', 'Open source'],
      },
    ],
  },
  services: {
    title: 'O que eu posso construir para você.',
    items: [
      {
        id: 'saas',
        title: 'Produtos SaaS',
        body: 'Do MVP ao produto maduro: login, planos e cobrança recorrente, várias empresas na mesma conta e painéis que acompanham o crescimento.',
        tags: ['Next.js', 'Stripe', 'Better Auth'],
      },
      {
        id: 'custom',
        title: 'Sistemas sob medida',
        body: 'Ferramentas internas que substituem planilhas e processos manuais, com cadastros, fluxos, relatórios e integrações.',
        tags: ['PostgreSQL', 'APIs', 'Automação'],
      },
      {
        id: 'web',
        title: 'Sites e landing pages',
        body: 'Páginas rápidas e bem acabadas, pensadas para converter, com animação e SEO feitos com cuidado.',
        tags: ['React', 'Motion', 'SEO'],
      },
      {
        id: 'macos',
        title: 'Apps para macOS',
        body: 'Utilitários nativos em Swift que vivem na barra de menus ou no notch, leves e integrados ao sistema.',
        tags: ['Swift', 'AppKit'],
      },
    ],
    visuals: { flow: ['Pedido', 'Aprovação', 'Relatório'], url: 'suaempresa.com.br' },
  },
  stack: {
    title: 'Ferramentas que eu uso todo dia',
  },
  contact: {
    title: ['Tem um projeto', 'em mente?'],
    body: 'Me conta a ideia, o prazo e onde você quer chegar. Eu respondo rápido.',
    primary: 'Vamos conversar',
    copy: 'Copiar email',
    copied: 'Email copiado',
    socialLabel: 'Também estou em',
  },
  footer: {
    rights: 'Guilherme Müller',
    backToTop: 'Voltar ao topo',
  },
}

const en: Dictionary = {
  meta: {
    title: 'Guilherme Müller, full-stack software engineer',
    description:
      'Full-stack engineer building fast, polished web products that are ready to grow. Maker of Moment, Müller Ledger and Light Notch.',
  },
  sections: {
    top: 'Home',
    about: 'About',
    projects: 'Work',
    services: 'Services',
    stack: 'Stack',
    contact: 'Contact',
  },
  nav: {
    items: [
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Work' },
      { id: 'services', label: 'Services' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: "Let's talk",
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skip: 'Skip to content',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
  hero: {
    headline: ['Software and websites', 'that feel good to use.'],
    subtext:
      "I'm Guilherme, a developer. You bring the idea, I make it real and walk you through every step in plain words.",
    primary: "Let's talk",
    secondary: 'See the work',
  },
  about: {
    manifesto:
      'For over three years I have been turning business problems into software. I own the whole product, from data to interface, from the first commit to deploy. The result is fast, clear, maintainable systems that keep working long after handoff.',
    stats: [
      { value: 3, suffix: '+', label: 'years building', detail: 'Shipping products end to end.' },
      { value: 10, suffix: '+', label: 'projects shipped', detail: 'Running in production with real users.' },
      { value: 200, suffix: '+', label: 'clients served', detail: 'Using what I build and maintain.' },
      { value: 3, label: 'products of my own', detail: 'Moment, Müller Ledger and Light Notch.' },
    ],
  },
  projects: {
    title: 'Products I built and run.',
    items: [
      {
        id: 'ledger',
        name: 'Müller Ledger',
        href: links.ledger,
        linkLabel: 'Visit ledger.muller.sh',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'Expense tracking that understands what you type.',
        description:
          'Type “groceries 45.90” and it becomes an entry with category, wallet and date. It also works over Telegram, with category reports and a balance for every wallet.',
        stack: ['React', 'Elysia', 'Drizzle', 'Better Auth'],
      },
      {
        id: 'moment',
        name: 'Moment',
        href: links.moment,
        linkLabel: 'Visit moment.muller.sh',
        status: 'Live',
        live: true,
        year: '2026',
        tagline: 'A calm calendar for small businesses.',
        description:
          'Scheduling, customers, documents and visit history in one minimal interface. It has a waiting queue, team roles and real-time updates across every open tab.',
        stack: ['Next.js 16', 'Drizzle', 'Better Auth', 'Cloudflare R2'],
      },
      {
        id: 'lightnotch',
        name: 'Light Notch',
        href: links.lightnotch,
        linkLabel: 'View on GitHub',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'The MacBook notch, turned into a Spotify player.',
        description:
          'A native macOS app. It shows the album cover and an equalizer that follows the music; one click opens the full player. Plain AppKit, no dependencies, close to idle on CPU.',
        stack: ['Swift', 'AppKit', 'Core Animation', 'Open source'],
      },
    ],
  },
  services: {
    title: 'What I can build for you.',
    items: [
      {
        id: 'saas',
        title: 'SaaS products',
        body: 'From MVP to mature product: sign-in, plans and recurring billing, multiple companies per account and dashboards that grow with you.',
        tags: ['Next.js', 'Stripe', 'Better Auth'],
      },
      {
        id: 'custom',
        title: 'Custom systems',
        body: 'Internal tools that replace spreadsheets and manual work, with records, workflows, reports and integrations.',
        tags: ['PostgreSQL', 'APIs', 'Automation'],
      },
      {
        id: 'web',
        title: 'Websites and landing pages',
        body: 'Fast, well-crafted pages built to convert, with motion and SEO done right.',
        tags: ['React', 'Motion', 'SEO'],
      },
      {
        id: 'macos',
        title: 'macOS apps',
        body: 'Native Swift utilities that live in the menu bar or the notch, light and at home in the system.',
        tags: ['Swift', 'AppKit'],
      },
    ],
    visuals: { flow: ['Request', 'Approval', 'Report'], url: 'yourcompany.com' },
  },
  stack: {
    title: 'Tools I use every day',
  },
  contact: {
    title: ['Got a project', 'in mind?'],
    body: 'Tell me the idea, the timeline and where you want to get. I reply fast.',
    primary: "Let's talk",
    copy: 'Copy email',
    copied: 'Email copied',
    socialLabel: 'Also on',
  },
  footer: {
    rights: 'Guilherme Müller',
    backToTop: 'Back to top',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { pt, en }
