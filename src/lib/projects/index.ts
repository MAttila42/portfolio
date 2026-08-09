import type { Technology } from '$lib/data/technologies'
import { resolveTechnologies } from '$lib/data/technologies'
import { sanitize } from 'isomorphic-dompurify'
import { load } from 'js-yaml'
import { marked, Renderer } from 'marked'

export interface ProjectData {
  slug: string
  title: string
  image: string
  content: string
  metadata?: ProjectMetadata
}

export interface ProjectMetadata {
  type: 'professional' | 'personal' | 'study'
  order: number
  description?: string
  visit?: string
  source?: string
  technologies?: Technology[]
}

interface RawProjectMetadata {
  type?: 'professional' | 'personal' | 'study'
  order?: number
  description?: string
  visit?: string
  source?: string
  technologies?: string[]
}

const contentFiles = import.meta.glob('./*/content.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const imageFiles = import.meta.glob('./*/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const projects: ProjectData[] = Object.entries(contentFiles).map(([contentPath, rawContent]) => {
  const match = contentPath.match(/^\.\/([^/]+)\/content\.md$/)
  if (!match)
    throw new Error(`Invalid project content path: ${contentPath}`)

  const slug = match[1]
  const { title, content, metadata } = parseProjectContent(rawContent, slug)
  const image = imageFiles[`./${slug}/index.webp`]

  return { slug, title, image, content, metadata }
}).sort((a, b) => {
  const orderA = a.metadata?.order ?? 0
  const orderB = b.metadata?.order ?? 0
  return orderB - orderA
})

function resolveImageSrc(slug: string, href: string) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href) || href.startsWith('/'))
    return href

  return imageFiles[`./${slug}/${href}`] ?? href
}

function parseProjectContent(rawContent: string, slug: string) {
  const lines = rawContent
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .split('\n')

  let metadata: ProjectMetadata | undefined
  let contentLines = lines

  if (lines[0] === '---') {
    const closingIndex = lines.findIndex((line, index) => index > 0 && line === '---')
    if (closingIndex !== -1) {
      const raw = load(lines.slice(1, closingIndex).join('\n')) as RawProjectMetadata
      if (raw.technologies) {
        metadata = {
          type: raw.type ?? 'personal',
          order: raw.order ?? 0,
          description: raw.description,
          visit: raw.visit,
          source: raw.source,
          technologies: resolveTechnologies(raw.technologies),
        }
      }

      contentLines = lines.slice(closingIndex + 1)
    }
  }

  while (contentLines[0]?.trim() === '')
    contentLines.shift()

  const mdContent = contentLines.join('\n').trimEnd()
  const titleMatch = mdContent.match(/^#\s+(.+)/)
  const title = titleMatch?.[1] ?? ''

  const renderer = new Renderer()
  renderer.image = ({ href, title: imageTitle, text }) => {
    const src = resolveImageSrc(slug, href)
    const titleAttr = imageTitle ? ` title="${imageTitle}"` : ''
    return `<img src="${src}" alt="${text}"${titleAttr}>`
  }

  const content = sanitize(
    marked.parse(mdContent, {
      async: false,
      gfm: true,
      renderer,
    }) as string,
  )

  return { title, content, metadata }
}

export function getProjectSlugs() {
  return projects.map(p => p.slug)
}

export function getProject(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug)
}

export default projects
