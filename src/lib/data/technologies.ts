export interface Technology {
  id: string
  name: string
  icon: string
  aliases: string[]
  showInBrief: boolean
}

const technologies: Technology[] = [
  {
    id: 'svelte',
    name: 'Svelte',
    icon: 'i-material-icon-theme:svelte',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: 'i-material-icon-theme:vue',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'astro',
    name: 'Astro',
    icon: 'i-material-icon-theme:astro',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'react',
    name: 'React',
    icon: 'i-material-icon-theme:react',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: 'i-material-icon-theme:vite',
    aliases: [],
    showInBrief: false,
  },
  {
    id: 'vitest',
    name: 'Vitest',
    icon: 'i-material-icon-theme:vitest',
    aliases: [],
    showInBrief: false,
  },
  {
    id: 'elysia',
    name: 'Elysia',
    icon: 'i-icons:elysia',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'i-material-icon-theme:typescript',
    aliases: ['javascript'],
    showInBrief: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'i-material-icon-theme:javascript',
    aliases: ['typescript'],
    showInBrief: true,
  },
  {
    id: 'bun',
    name: 'Bun',
    icon: 'i-material-icon-theme:bun',
    aliases: ['nodejs'],
    showInBrief: false,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'i-material-icon-theme:nodejs',
    aliases: ['bun'],
    showInBrief: false,
  },
  {
    id: 'unocss',
    name: 'UnoCSS',
    icon: 'i-material-icon-theme:unocss',
    aliases: ['tailwind'],
    showInBrief: false,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: 'i-material-icon-theme:tailwindcss',
    aliases: ['unocss'],
    showInBrief: false,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'i-material-icon-theme:docker',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: 'i-material-icon-theme:csharp',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'i-devicon:github',
    aliases: ['gitlab'],
    showInBrief: false,
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'i-devicon:gitlab',
    aliases: ['github'],
    showInBrief: false,
  },
  {
    id: 'drizzle',
    name: 'Drizzle ORM',
    icon: 'i-material-icon-theme:drizzle',
    aliases: [],
    showInBrief: false,
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    icon: 'i-devicon:sqlite',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: 'i-devicon:mongodb',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    icon: 'i-devicon:digitalocean',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    icon: 'i-devicon:cloudflare',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'netlify',
    name: 'Netlify',
    icon: 'i-devicon:netlify',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'coolify',
    name: 'Coolify',
    icon: 'i-selfhst:coolify',
    aliases: [],
    showInBrief: true,
  },
  {
    id: 'android',
    name: 'Android',
    icon: 'i-material-icon-theme:android',
    aliases: ['tauri', 'capacitor'],
    showInBrief: false,
  },
  {
    id: 'tauri',
    name: 'Tauri',
    icon: 'i-material-icon-theme:tauri',
    aliases: ['android'],
    showInBrief: true,
  },
  {
    id: 'capacitor',
    name: 'Capacitor',
    icon: 'i-material-icon-theme:capacitor',
    aliases: ['android'],
    showInBrief: true,
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'i-devicon:linux',
    aliases: [],
    showInBrief: false,
  },
]

const technologyMap = new Map(technologies.map(t => [t.id, t]))

function getTechnology(id: string): Technology | undefined {
  return technologyMap.get(id)
}

export function resolveTechnologies(ids: string[]): Technology[] {
  return ids.map(id => getTechnology(id)).filter((t): t is Technology => t !== undefined)
}

export function getEquivalentTechIds(id: string): Set<string> {
  const result = new Set<string>([id])
  const tech = getTechnology(id)
  if (tech) {
    for (const alias of tech.aliases)
      result.add(alias)
  }
  for (const t of technologies) {
    if (t.aliases.includes(id))
      result.add(t.id)
  }
  return result
}

export default technologies
