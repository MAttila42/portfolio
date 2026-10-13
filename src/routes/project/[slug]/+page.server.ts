import type { EntryGenerator, PageServerLoad } from './$types'
import { getProject, getProjectSlugs } from '$lib/projects'
import { error } from '@sveltejs/kit'

export const prerender = true

export const entries: EntryGenerator = () => getProjectSlugs().map(slug => ({ slug }))

export const load: PageServerLoad = ({ params }) => {
  const project = getProject(params.slug)

  if (!project)
    error(404)

  return { project }
}
