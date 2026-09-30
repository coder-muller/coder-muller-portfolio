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
    headline: ['Tecnologia sob medida', 'para o seu negócio.'],
    subtext:
      'Sou Guilherme Müller, desenvolvedor. Crio sistemas, aplicativos e sites que resolvem problemas reais.',
    primary: 'Vamos conversar',
    secondary: 'Ver projetos',
  },
  about: {
    manifesto:
      'Há mais de três anos desenvolvo sistemas para empresas de diferentes tamanhos. Meu trabalho é entender o problema, propor a solução mais adequada e entregar algo que a sua equipe consiga usar desde o primeiro dia.',
    stats: [
      {
        value: 3,
        suffix: '+',
        label: 'anos de experiência',
        detail: 'Criando sistemas, aplicativos e sites.',
      },
      {
        value: 10,
        suffix: '+',
        label: 'projetos entregues',
        detail: 'Em funcionamento e com usuários reais.',
      },
      {
        value: 500,
        suffix: '+',
        label: 'clientes atendidos',
        detail: 'Pessoas e empresas que usam o que desenvolvo.',
      },
      {
        value: 4,
        suffix: '+',
        label: 'produtos próprios',
        detail: 'Entre eles, Moment, Müller Ledger e Light Notch.',
      },
    ],
  },
  projects: {
    title: 'Alguns dos meus produtos.',
    items: [
      {
        id: 'ledger',
        name: 'Müller Ledger',
        href: links.ledger,
        linkLabel: 'Visitar ledger.muller.sh',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'Controle financeiro simples de registrar.',
        description:
          'Basta escrever “mercado 45,90” para registrar um gasto com categoria, carteira e data. Também funciona pelo Telegram e oferece relatórios por categoria e o saldo de cada carteira.',
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
        tagline: 'Agenda e clientes em um só lugar.',
        description:
          'Organiza agendamentos, cadastro de clientes, documentos e histórico de atendimentos. Oferece fila de espera, permissões por equipe e atualização em tempo real para todos os usuários.',
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
        tagline: 'Um player do Spotify no notch do MacBook.',
        description:
          'Aplicativo nativo para macOS que exibe a capa do álbum e um equalizador ao lado do notch. Com um clique, abre o player completo. É leve, de código aberto e consome poucos recursos.',
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
    headline: ['Custom technology', 'for your business.'],
    subtext:
      "I'm Guilherme Müller, a developer. I build systems, apps and websites that solve real problems.",
    primary: "Let's talk",
    secondary: 'See the work',
  },
  about: {
    manifesto:
      'For more than three years I have been building systems for companies of every size. My job is to understand the problem, propose the right solution and deliver something your team can use from day one.',
    stats: [
      {
        value: 3,
        suffix: '+',
        label: 'years of experience',
        detail: 'Building systems, apps and websites.',
      },
      {
        value: 10,
        suffix: '+',
        label: 'projects delivered',
        detail: 'Up and running with real users.',
      },
      {
        value: 500,
        suffix: '+',
        label: 'clients served',
        detail: 'People and companies using what I build.',
      },
      {
        value: 4,
        suffix: '+',
        label: 'products of my own',
        detail: 'Including Moment, Müller Ledger and Light Notch.',
      },
    ],
  },
  projects: {
    title: 'Some of my products.',
    items: [
      {
        id: 'ledger',
        name: 'Müller Ledger',
        href: links.ledger,
        linkLabel: 'Visit ledger.muller.sh',
        status: 'Beta',
        live: false,
        year: '2026',
        tagline: 'Personal finance that is simple to log.',
        description:
          'Just type “groceries 45.90” to log an expense with category, wallet and date. It also works over Telegram and offers reports by category and the balance of each wallet.',
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
        tagline: 'Scheduling and clients in one place.',
        description:
          'It organizes appointments, client records, documents and visit history. It offers a waiting list, team permissions and real-time updates for every user.',
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
        tagline: 'A Spotify player in the MacBook notch.',
        description:
          'A native macOS app that shows the album cover and an equalizer beside the notch. One click opens the full player. It is lightweight, open source and uses very few resources.',
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
